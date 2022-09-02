import {
  type ActionReducerMapBuilder,
  createAsyncThunk,
  type AsyncThunkPayloadCreator,
  type ThunkAction,
  type AnyAction,
} from '@reduxjs/toolkit';
import type { PrivateMessage, UserNotice } from '@twurple/chat';
import type { MessageTypes } from 'ircv3';
import type { AppThunk, RootState } from 'app/store';
import playSound from 'utils/playSound';
import api, {
  parseBlockedUsers,
  parseBttvChannelEmotes,
  parseBttvGlobalBadges,
  parseBttvGlobalEmotes,
  parseChatterinoBadges,
  parseFfzApGlobalBadges,
  parseFfzChannelEmotes,
  parseFfzEmoji,
  parseFfzGlobalBadges,
  parseFfzGlobalEmotes,
  parseStvCosmetics,
  parseStvEmotes,
  parseTwitchBadges,
  parseTwitchEmotes,
} from 'features/api';
import {
  createHistoryMessages,
  createPrivateMessage,
  createUserNotice,
  createNotice,
  createOwnMessage,
} from 'features/messages/utils/createMessages';
import { writeEmotesUsageStatistic } from 'features/emotes';
import { messageReceived } from './chatSlice';
import type { ChatState, FetchResult } from './chatTypes';

const builderFns: ((builder: ActionReducerMapBuilder<ChatState>) => void)[] =
  [];

export const registerChatThunks = (
  builder: ActionReducerMapBuilder<ChatState>,
) => builderFns.forEach((fn) => fn(builder));

type CreateGlobalChatThunkArgs<T> = {
  name: string;
  path: (state: ChatState) => FetchResult<T>;
  payloadCreator: AsyncThunkPayloadCreator<T, void>;
};

const createGlobalChatThunk = <T>({
  name,
  path,
  payloadCreator,
}: CreateGlobalChatThunkArgs<T>) => {
  const thunk = createAsyncThunk(`chat/${name}`, payloadCreator);

  builderFns.push((builder: ActionReducerMapBuilder<ChatState>) => {
    builder.addCase(thunk.pending, (state) => {
      path(state).status = 'pending';
    });
    builder.addCase(thunk.rejected, (state) => {
      path(state).status = 'rejected';
    });
    builder.addCase(thunk.fulfilled, (state, { payload }) => {
      path(state).status = 'fulfilled';
      path(state).data = payload;
    });
  });

  return thunk;
};

type CreateChannelChatThunkArgs<T, U> = {
  name: string;
  path: (state: ChatState, arg: U) => FetchResult<T>;
  payloadCreator: AsyncThunkPayloadCreator<{ data: T; channelName: string }, U>;
};

const createChannelChatThunk = <T, U>({
  name,
  path,
  payloadCreator,
}: CreateChannelChatThunkArgs<T, U>) => {
  const thunk = createAsyncThunk(`chat/${name}`, payloadCreator);

  builderFns.push((builder: ActionReducerMapBuilder<ChatState>) => {
    builder.addCase(thunk.pending, (state, { meta: { arg } }) => {
      if (!state.channels.entities[(arg as any).channelName]) return;
      path(state, arg).status = 'pending';
    });
    builder.addCase(thunk.rejected, (state, { meta: { arg } }) => {
      if (!state.channels.entities[(arg as any).channelName]) return;
      path(state, arg).status = 'rejected';
    });
    builder.addCase(thunk.fulfilled, (state, { payload, meta: { arg } }) => {
      if (!state.channels.entities[(arg as any).channelName]) return;
      path(state, arg).status = 'fulfilled';
      path(state, arg).data = payload.data;
    });
  });

  return thunk;
};

// blocked users
export const fetchBlockedUsers = (() => {
  const thunk = createAsyncThunk(
    'chat/fetchBlockedUsers',
    async (_, { getState }) => {
      const state = getState() as RootState;
      const { id, accessToken } = state.chat.me;
      return api.twitch.users
        .getUserBlockList(id!, accessToken!)
        .then(parseBlockedUsers);
    },
  );

  builderFns.push((builder: ActionReducerMapBuilder<ChatState>) => {
    builder.addCase(thunk.pending, (state) => {
      state.me.blockedUsers.status = 'pending';
    });
    builder.addCase(thunk.rejected, (state) => {
      state.me.blockedUsers.status = 'rejected';
    });
    builder.addCase(thunk.fulfilled, (state, { payload }) => {
      state.me.blockedUsers.status = 'fulfilled';
      state.me.blockedUsers.data = payload;
    });
  });

  return thunk;
})();

// recent messages
export const fetchRecentMessages = (() => {
  const thunk = createAsyncThunk(
    'chat/fetchRecentMessages',
    (channelName: string) => api.recentMessages.get(channelName),
  );

  builderFns.push((builder: ActionReducerMapBuilder<ChatState>) => {
    builder.addCase(thunk.pending, (state, { meta: { arg } }) => {
      state.channels.entities[arg!]!.recentMessages.status = 'pending';
    });
    builder.addCase(thunk.rejected, (state, { meta: { arg } }) => {
      state.channels.entities[arg!]!.recentMessages.status = 'rejected';
    });
    builder.addCase(thunk.fulfilled, (state, { payload, meta: { arg } }) => {
      const channel = state.channels.entities[arg]!;
      channel.recentMessages.status = 'fulfilled';

      let rawMessages = payload.messages;
      const { messagesLimit } = state.options.ui;
      const messagesLength = channel.messages.length;
      const exceededMessages =
        rawMessages.length - messagesLimit + messagesLength;

      if (exceededMessages > 0) {
        rawMessages = payload.messages.slice(exceededMessages);
      }

      const messages = createHistoryMessages(rawMessages, {
        chat: state,
      } as RootState);
      channel.messages = [...messages, ...channel.messages];
      channel.isFirstMessageAltBg =
        messages.length % 2 === 0
          ? channel.isFirstMessageAltBg
          : !channel.isFirstMessageAltBg;
    });
  });

  return thunk;
})();

// global emotes
export const fetchAndMergeTwitchEmotes = (() => {
  const thunk = createAsyncThunk(
    'chat/fetchAndMergeTwitchEmotes',
    async (_, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.chat.me.accessToken!;
      const channel = state.chat.currentChannel!;
      const fetchedIds = state.chat.emotes.twitch.setIds || [];
      const globalIds = state.chat.me.globalUserState?.emoteSets || [];
      const channelIds =
        state.chat.channels.entities[channel]?.userState?.emoteSets || [];
      const allIds = Array.from(new Set([...globalIds, ...channelIds]));
      const diffIds = allIds.filter((id) => !fetchedIds.includes(id));
      if (diffIds.length === 0) return null;
      const response = await api.twitch.chat.getEmoteSets(diffIds, accessToken);
      return {
        data: parseTwitchEmotes(response),
        setIds: [...fetchedIds, ...diffIds],
        template: response.template,
      };
    },
  );

  builderFns.push((builder: ActionReducerMapBuilder<ChatState>) => {
    builder.addCase(thunk.pending, (state) => {
      state.emotes.twitch.status = 'pending';
    });
    builder.addCase(thunk.rejected, (state) => {
      state.emotes.twitch.status = 'rejected';
    });
    builder.addCase(thunk.fulfilled, (state, { payload }) => {
      const { twitch } = state.emotes;
      twitch.status = 'fulfilled';
      if (!payload) return;
      if (twitch.data) {
        twitch.data.entries = {
          ...twitch.data.entries,
          ...payload.data.entries,
        };
        twitch.data.names = {
          ...twitch.data.names,
          ...payload.data.names,
        };
      } else {
        twitch.data = payload.data;
      }
      twitch.setIds = payload.setIds;
      twitch.template = payload.template;
    });
  });

  return thunk;
})();
// TODO: add errors: Failed to fetch FrankerFaceZ channel emotes. (unknown error)
export const fetchBttvGlobalEmotes = createGlobalChatThunk({
  name: 'fetchBttvGlobalEmotes',
  path: (state) => state.emotes.bttv,
  payloadCreator: () => api.bttv.globalEmotes().then(parseBttvGlobalEmotes),
});
export const fetchFfzGlobalEmotes = createGlobalChatThunk({
  name: 'fetchFfzGlobalEmotes',
  path: (state) => state.emotes.ffz,
  payloadCreator: () => api.ffz.globalEmotes().then(parseFfzGlobalEmotes),
});
export const fetchStvGlobalEmotes = createGlobalChatThunk({
  name: 'fetchStvGlobalEmotes',
  path: (state) => state.emotes.stv,
  payloadCreator: () => api.stv.globalEmotes().then(parseStvEmotes),
});
export const fetchFfzEmoji = createGlobalChatThunk({
  name: 'fetchFfzEmoji',
  path: (state) => state.emotes.emoji,
  payloadCreator: () => api.ffz.emoji().then(parseFfzEmoji),
});

// global badges
export const fetchTwitchGlobalBadges = createGlobalChatThunk({
  name: 'fetchTwitchGlobalBadges',
  path: (state) => state.badges.twitch,
  payloadCreator: () =>
    api.twitch.badges.getGlobalBadges().then(parseTwitchBadges),
});
export const fetchBttvGlobalBadges = createGlobalChatThunk({
  name: 'fetchBttvGlobalBadges',
  path: (state) => state.badges.bttv,
  payloadCreator: () => api.bttv.globalBadges().then(parseBttvGlobalBadges),
});
export const fetchFfzGlobalBadges = createGlobalChatThunk({
  name: 'fetchFfzGlobalBadges',
  path: (state) => state.badges.ffz,
  payloadCreator: () => api.ffz.globalBadges().then(parseFfzGlobalBadges),
});
export const fetchFfzApGlobalBadges = createGlobalChatThunk({
  name: 'fetchFfzApGlobalBadges',
  path: (state) => state.badges.ffzAp,
  payloadCreator: () => api.ffz.apGlobalBadges().then(parseFfzApGlobalBadges),
});
export const fetchStvGlobalBadges = createGlobalChatThunk({
  name: 'fetchStvGlobalBadges',
  path: (state) => state.badges.stv,
  payloadCreator: () =>
    api.stv.cosmetics().then((r) => parseStvCosmetics(r).badges),
});
export const fetchChatterinoGlobalBadges = createGlobalChatThunk({
  name: 'fetchChatterinoGlobalBadges',
  path: (state) => state.badges.chatterino,
  payloadCreator: () =>
    api.chatterino.globalBadges().then(parseChatterinoBadges),
});

// channel emotes
type FetchChannelEmotesArg = {
  channelId: string;
  channelName: string;
};
export const fetchBttvChannelEmotes = createChannelChatThunk({
  name: 'fetchBttvChannelEmotes',
  path: (state, arg) => state.channels.entities[arg.channelName]!.emotes.bttv!,
  payloadCreator: ({ channelId, channelName }: FetchChannelEmotesArg) =>
    api.bttv
      .channelEmotes(channelId)
      .then((data) => ({ data: parseBttvChannelEmotes(data), channelName })),
});
export const fetchFfzChannelEmotes = createChannelChatThunk({
  name: 'fetchFfzChannelEmotes',
  path: (state, arg) => state.channels.entities[arg.channelName]!.emotes.ffz!,
  payloadCreator: ({ channelId, channelName }: FetchChannelEmotesArg) =>
    api.ffz
      .channelEmotes(channelId)
      .then((data) => ({ data: parseFfzChannelEmotes(data), channelName })),
});
export const fetchStvChannelEmotes = createChannelChatThunk({
  name: 'fetchStvChannelEmotes',
  path: (state, arg) => state.channels.entities[arg.channelName]!.emotes.stv!,
  payloadCreator: ({ channelId, channelName }: FetchChannelEmotesArg) =>
    api.stv
      .channelEmotes(channelId)
      .then((data) => ({ data: parseStvEmotes(data), channelName })),
});

// channel badges
export const fetchTwitchChannelBadges = createChannelChatThunk({
  name: 'fetchTwitchChannelBadges',
  path: (state, arg) =>
    state.channels.entities[arg.channelName]!.badges.twitch!,
  payloadCreator: ({ channelId, channelName }: FetchChannelEmotesArg) =>
    api.twitch.badges
      .getChannelBadges(channelId)
      .then((data) => ({ data: parseTwitchBadges(data), channelName })),
});

// messages
export const privateMessageReceived =
  (msg: PrivateMessage): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    // sound on mention
    const message = createPrivateMessage(state)(msg);
    if (!message) return;
    if (message.isHighlighted) playSound('tink');
    dispatch(messageReceived(message));
  };
export const userNoticeReceived =
  (msg: UserNotice): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    dispatch(messageReceived(createUserNotice(msg, state)));
  };
export const noticeReceived =
  (msg: MessageTypes.Commands.Notice): AppThunk =>
  (dispatch) => {
    dispatch(messageReceived(createNotice(msg)));
  };
export const messageSended =
  ({
    channelName,
    message,
  }: {
    channelName: string;
    message: string;
  }): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const m = createOwnMessage(channelName, message, state);
    writeEmotesUsageStatistic(m.parts);
    dispatch(messageReceived(m));
  };

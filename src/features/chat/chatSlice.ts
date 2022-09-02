import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { LS } from 'utils/constants';
import { lsRead, lsWrite } from 'utils/ls';
import {
  MessageType,
  MessageTypeNotice,
  MessageTypePrivate,
  MessageTypeUserNotice,
} from 'features/messages';
import {
  createCreateBadges,
  createCreateCard,
  createCreateParts,
} from 'features/messages/utils/createMessages';
import { type Options, getInitialOptions } from 'features/options';
import {
  CHANNEL_INITIAL_STATE,
  CHANNEL_RECENT_INPUTS_LIMIT,
  CHANNEL_USERS_LIMIT,
} from './chatConstants';
import { registerChatThunks } from './chatThunks';
import type {
  Channel,
  ChatState,
  GlobalUserStateTags,
  RoomStateTags,
  LsChannels,
  UserStateTags,
} from './chatTypes';

const channelsAdapter = createEntityAdapter<Channel>({
  selectId: (channel) => channel.name,
});

const initialState: ChatState = {
  isConnected: false,
  isRegistered: false,
  me: {
    authStatus: 'uninitialized',
    blockedUsers: { status: 'idle' },
  },
  channels: channelsAdapter.getInitialState(),
  emotes: {
    twitch: { status: 'idle' },
    bttv: { status: 'idle' },
    ffz: { status: 'idle' },
    stv: { status: 'idle' },
    emoji: { status: 'idle' },
  },
  badges: {
    twitch: { status: 'idle' },
    bttv: { status: 'idle' },
    ffz: { status: 'idle' },
    ffzAp: { status: 'idle' },
    stv: { status: 'idle' },
    chatterino: { status: 'idle' },
  },
  options: getInitialOptions(),
};

type AuthStatusChangedPayload =
  | ({
      authStatus: 'success';
    } & Pick<
      ChatState['me'],
      'id' | 'login' | 'displayName' | 'picture' | 'accessToken'
    >)
  | { authStatus: 'error' };

type OptionChangedPayload = {
  section: keyof ChatState['options'];
  name: string;
  value: any;
};

const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // auth
    authStatusChanged: (
      state,
      { payload }: PayloadAction<AuthStatusChangedPayload>,
    ) => {
      if (payload.authStatus === 'success') {
        state.me.authStatus = payload.authStatus;
        state.me.id = payload.id;
        state.me.login = payload.login;
        state.me.displayName = payload.displayName;
        state.me.picture = payload.picture;
        state.me.accessToken = payload.accessToken;
      }

      if (payload.authStatus === 'error') {
        state.me.authStatus = payload.authStatus;
        state.me.id = undefined;
        state.me.login = undefined;
        state.me.displayName = undefined;
        state.me.picture = undefined;
        state.me.accessToken = undefined;
      }
    },

    // connection
    chatConnected: (state) => {
      state.isConnected = true;
    },
    chatDisconnected: (state) => {
      state.isConnected = false;
      state.isRegistered = false;
    },
    chatRegistered: (state) => {
      state.isRegistered = true;
    },

    // channels
    channelsInitialized: (state, { payload }: PayloadAction<LsChannels>) => {
      channelsAdapter.addMany(
        state.channels,
        payload.map(([name, id]) => ({
          ...CHANNEL_INITIAL_STATE,
          id,
          name,
        })),
      );
    },
    channelAdded: (state, { payload }: PayloadAction<string>) => {
      if (!state.currentChannel) state.currentChannel = payload;
      channelsAdapter.addOne(state.channels, {
        name: payload,
        ...CHANNEL_INITIAL_STATE,
      });
    },
    channelRemoved: (state, { payload }: PayloadAction<string>) => {
      channelsAdapter.removeOne(state.channels, payload);
      if (state.currentChannel === payload) {
        state.currentChannel = state.channels.ids[0] as string;
      }
    },
    currentChannelChanged: (state, { payload }: PayloadAction<string>) => {
      state.currentChannel = payload;
    },
    channelResourcesLoaded: (state) => {
      const channel = state.channels.entities[state.currentChannel!];
      if (!channel) return;
      channel.ready = true;

      // parse parts/badges/card for all messages
      const fakeState = { chat: state } as RootState;
      const createBadges = createCreateBadges(fakeState);
      const createParts = createCreateParts(fakeState);
      const createCard = createCreateCard(fakeState);

      const blockedUsers = state.me.blockedUsers.data;
      const filteredMessages = channel.messages.filter(
        (m) =>
          !(
            m.type === MessageType.PRIVATE_MESSAGE &&
            blockedUsers?.includes(m.user.login)
          ),
      );
      // if parity of the messages length changed, invert altBg
      if (channel.messages.length % 2 !== filteredMessages.length % 2) {
        channel.isFirstMessageAltBg = !channel.isFirstMessageAltBg;
      }
      // change messages link only if we filtered at least one message
      if (channel.messages.length !== filteredMessages.length) {
        channel.messages = filteredMessages;
      }

      for (const message of channel.messages) {
        if (
          message.type !== MessageType.PRIVATE_MESSAGE &&
          message.type !== MessageType.USER_NOTICE
        ) {
          continue;
        }

        message.parts = createParts(message.body, message._tags.emotes);
        message.badges = createBadges(message.user.id, message._tags.badges);

        if (message.type === MessageType.PRIVATE_MESSAGE) {
          message.card = createCard(message.parts);
        }
      }
    },

    // chat state
    globalUserStateReceived: (
      state,
      { payload }: PayloadAction<GlobalUserStateTags>,
    ) => {
      state.me.globalUserState = payload;
    },
    userStateReceived: (
      state,
      {
        payload,
      }: PayloadAction<{ channelName: string; userState: UserStateTags }>,
    ) => {
      const channel = state.channels.entities[payload.channelName];
      if (!channel) return;
      channel.userState = payload.userState;
    },
    roomStateReceived: (
      state,
      {
        payload,
      }: PayloadAction<{ channelName: string; roomState: RoomStateTags }>,
    ) => {
      const channel = state.channels.entities[payload.channelName];
      if (!channel) return;
      channel.roomState = payload.roomState;
      channel.id = payload.roomState.roomId;
    },

    // chat messages
    messageReceived: (
      state,
      {
        payload: m,
      }: PayloadAction<
        MessageTypePrivate | MessageTypeUserNotice | MessageTypeNotice
      >,
    ) => {
      const channel = state.channels.entities[m.channelName];
      if (!channel) return;

      channel.messages.push(m);
      const { messagesLimit } = state.options.ui;
      if (channel.messages.length > messagesLimit) {
        channel.isFirstMessageAltBg = !channel.isFirstMessageAltBg;
        channel.messages.shift();
      }

      // users
      if (
        m.type === MessageType.PRIVATE_MESSAGE &&
        !channel.users.includes(m.user.login)
      ) {
        channel.users.push(m.user.login);
        if (channel.users.length > CHANNEL_USERS_LIMIT) {
          channel.users.shift();
        }
      }

      // recentInputs
      if (m.type === MessageType.PRIVATE_MESSAGE && m.isSelf) {
        // prevent adding the same message
        if (channel.recentInputs[channel.recentInputs.length - 1] !== m.body) {
          channel.recentInputs.push(m.body);
          if (channel.recentInputs.length > CHANNEL_RECENT_INPUTS_LIMIT) {
            channel.recentInputs.shift();
          }
        }
      }
    },
    clearChatReceived: (state, { payload }) => {},

    // options
    optionChanged: {
      reducer: (
        state,
        {
          payload: { section, name, value },
        }: PayloadAction<OptionChangedPayload>,
      ) => {
        if (section === 'ui' && name === 'messagesLimit') {
          for (const channel of Object.values(state.channels.entities)) {
            if (!channel) continue;
            const exceededMessages = channel.messages.length - value;
            if (exceededMessages > 0) {
              channel.messages = channel.messages.slice(exceededMessages);
            }
          }
        }

        // @ts-expect-error
        state.options[section][name] = value;
      },
      prepare: (payload: OptionChangedPayload) => {
        if (payload.section === 'ui' && payload.name === 'messagesLimit') {
          payload.value = Number.parseInt(payload.value, 10);
        }

        const options = lsRead(LS.Options) || ({} as Options);
        if (!options[payload.section]) options[payload.section] = {} as any;
        (options[payload.section] as any)[payload.name] = payload.value;
        lsWrite(LS.Options, options);

        return { payload };
      },
    },
  },
  extraReducers: registerChatThunks,
});

export const {
  authStatusChanged,

  chatConnected,
  chatDisconnected,
  chatRegistered,

  channelsInitialized,
  channelAdded,
  channelRemoved,
  currentChannelChanged,
  channelResourcesLoaded,

  globalUserStateReceived,
  userStateReceived,
  roomStateReceived,

  messageReceived,
  clearChatReceived,

  optionChanged,
} = chat.actions;

export default chat.reducer;

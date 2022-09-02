import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { MessageTypes } from 'ircv3';
import { AuthProvider, StaticAuthProvider } from '@twurple/auth';
import {
  ChatClient,
  GlobalUserState,
  PrivateMessage,
  RoomState,
  UserNotice,
  UserState,
} from '@twurple/chat';
import getIrcChannelName from 'utils/getChannelName';
import { createCustomNotice } from 'features/messages';
import { CLIENT_ID } from 'utils/constants';
import {
  accessTokenSelector,
  authStatusSelector,
  channelNamesSelector,
} from '../chatSelectors';
import {
  chatConnected,
  chatDisconnected,
  chatRegistered,
  globalUserStateReceived,
  roomStateReceived,
  userStateReceived,
  messageReceived,
} from '../chatSlice';
import {
  parseGlobalUserState,
  parseRoomState,
  parseUserState,
} from '../utils/parseIrc';
import {
  noticeReceived,
  privateMessageReceived,
  userNoticeReceived,
} from '../chatThunks';

// TODO: try to read access token directly from the localStorage for the first time
const useTwitchClient = () => {
  // TODO: fix dispatch types
  const dispatch = useAppDispatch() as any;
  const authStatus = useAppSelector(authStatusSelector);
  const accessToken = useAppSelector(accessTokenSelector);
  const channelNames = useAppSelector(channelNamesSelector);

  const chatRef = useRef<ChatClient | null>(null);
  const channelNamesRef = useRef<string[]>([]);

  channelNamesRef.current = channelNames;

  useEffect(() => {
    if (authStatus === 'uninitialized' || chatRef.current) return;

    let authProvider: AuthProvider | undefined;

    if (authStatus === 'success' && accessToken) {
      authProvider = new StaticAuthProvider(CLIENT_ID, accessToken);
    }

    const chat = new ChatClient({ authProvider });

    chatRef.current = chat;

    chat.onConnect(() => {
      dispatch(chatConnected());
    });
    chat.onDisconnect((manually, reason) => {
      dispatch(chatDisconnected());
      console.warn(`Disconnected. ${reason}`);
    });
    chat.onRegister(() => {
      channelNamesRef.current.forEach((channel) =>
        chat
          .join(channel)
          .catch((e) =>
            dispatch(messageReceived(createCustomNotice(channel, e.message))),
          ),
      );
      dispatch(chatRegistered());
    });
    chat.onAuthenticationFailure((message, retryCount) => {
      console.warn(message, retryCount);
    });

    chat.onTypedMessage(GlobalUserState, (msg) => {
      dispatch(globalUserStateReceived(parseGlobalUserState(msg)));
    });
    chat.onTypedMessage(UserState, (msg) => {
      const userState = parseUserState(msg);
      const channelName = getIrcChannelName(msg);
      dispatch(userStateReceived({ channelName, userState }));
    });
    chat.onTypedMessage(RoomState, (msg) => {
      const roomState = parseRoomState(msg);
      const channelName = getIrcChannelName(msg);
      dispatch(roomStateReceived({ channelName, roomState }));
    });

    // ClearChat
    // chat.onBan((channel, user, msg) => {});
    // chat.onTimeout((channel, user, duration, msg) => {});
    // chat.onChatClear((channel, msg) => {});

    // ClearMsg
    // chat.onMessageRemove((channel, messageId, msg) => {});

    // HostTarget
    // chat.onHost((channel, target, viewers) => {});
    // chat.onUnhost((channel) => {});

    // chat.onJoin(() => {});
    // chat.onJoinFailure(() => {});
    // chat.onPart(() => {});

    chat.onTypedMessage(PrivateMessage, (msg) => {
      dispatch(privateMessageReceived(msg));
    });

    chat.onTypedMessage(UserNotice, (msg) => {
      dispatch(userNoticeReceived(msg));
    });

    chat.onTypedMessage(MessageTypes.Commands.Notice, (msg) => {
      dispatch(noticeReceived(msg));
    });

    // Privmsg
    // chat.onHosted((channel, byChannel, auto, viewers) => {});
    // chat.onMessage((channel, user, message, msg) => {});
    // chat.onAction((channel, user, message, msg) => {});

    // RoomState
    // this.onSlow
    // this.onFollowersOnly

    // UserNotice
    // this.onSub
    // this.onResub
    // this.onSubGift
    // this.onCommunitySub
    // this.onPrimePaidUpgrade
    // this.onGiftPaidUpgrade
    // this.onStandardPayForward
    // this.onCommunityPayForward
    // this.onPrimeCommunityGift
    // this.onRaid
    // this.onRaidCancel
    // this.onRitual
    // this.onBitsBadgeUpgrade
    // this.onSubExtend
    // this.onRewardGift
    // this.onAnnouncement

    // Whisper
    // this.onWhisper

    // Notice
    // this.onEmoteOnly
    // this.onHostsRemaining
    // this.onR9k
    // this.onSubsOnly
    // this.onNoPermission
    // this.onMessageRatelimit
    // this.onMessageFailed

    chat.connect();
  }, [authStatus, accessToken]);

  return chatRef;
};

export default useTwitchClient;

import { useEffect, useRef, useCallback } from 'react';
import {
  Chat,
  ChatEvents,
  Commands,
  Events,
  GlobalUserStateMessage,
} from 'twitch-js';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  accessTokenSelector,
  invalidateAuth,
  isAuthSelector,
  meLoginSelector,
} from 'features/auth';
import {
  channelsAdded,
  channelRemoved,
  clearChatReceived,
  connected,
  currentChannelChanged,
  disconnected,
  globalUserStateReceived,
  messageSended,
  noticeReceived,
  privateMessageReceived,
  reconnecting,
  roomStateReceived,
  userNoticeReceived,
  userStateReceived,
} from '../chatSlice';

const useTwitchClient = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(isAuthSelector);
  const token = useAppSelector(accessTokenSelector);
  const username = useAppSelector(meLoginSelector);

  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    if (!isAuth) return;

    const options = token && username ? { token, username } : {};
    const chat = new Chat({
      ...options,
      log: { level: 'silent' },
    });

    chat.on(Commands.WELCOME, () => dispatch(connected()));
    chat.on(Commands.GLOBALUSERSTATE, (m) =>
      dispatch(globalUserStateReceived((m as GlobalUserStateMessage).tags)),
    );
    chat.on(Commands.USER_STATE, (m) =>
      dispatch(userStateReceived({ channel: m.channel, tags: m.tags })),
    );
    chat.on(Commands.ROOM_STATE, (m) =>
      dispatch(roomStateReceived({ channel: m.channel, tags: m.tags })),
    );

    // socket closed
    chat.on(ChatEvents.DISCONNECTED, () => dispatch(disconnected()));
    // ping failed
    chat.on(ChatEvents.RECONNECT, () => dispatch(reconnecting()));

    chat.on(Events.AUTHENTICATION_FAILED, () => dispatch(invalidateAuth()));

    chat.on(Events.PRIVATE_MESSAGE, (m) => dispatch(privateMessageReceived(m)));
    chat.on(Events.NOTICE, (m) => dispatch(noticeReceived(m)));
    chat.on(Events.USER_NOTICE, (m) => dispatch(userNoticeReceived(m)));
    chat.on(Events.CLEAR_CHAT, (m) => dispatch(clearChatReceived(m)));

    chatRef.current = chat;

    chat.connect().then(async () => {
      const lsChannelsRaw = localStorage.getItem('channels');
      const lsChannels = lsChannelsRaw?.split(',') || [];

      dispatch(channelsAdded(lsChannels));
      dispatch(currentChannelChanged(lsChannels[0]));

      // const channel = 'cohhcarnage';
      // const channel = 'dmitryscaletta';
      // const channel = 'melharucos';
    });
  }, [isAuth, token, username]);

  const joinChannel = useCallback((channel: string) => {
    const chat = chatRef.current;

    if (!chat) return;

    dispatch(channelsAdded([channel]));

    chat.join(channel);
  }, []);

  const partChannel = useCallback((channel: string) => {
    const chat = chatRef.current;

    if (!chat) return;

    chat.part(channel);

    dispatch(channelRemoved(channel));
  }, []);

  const sendMessage = useCallback(async (channel: string, message: string) => {
    const chat = chatRef.current;

    if (!chat) return;

    // TODO: replace emojis like :haha:
    await chat.say(channel, message);

    dispatch(messageSended({ channel, message }));
  }, []);

  return {
    joinChannel,
    partChannel,
    sendMessage,
  };
};

export default useTwitchClient;

import React, { useState, useEffect } from 'react';
import { Client as TwitchClient } from 'tmi.js';
import tmiParser from 'tmi.js/lib/parser';

import Chat from './Components/Chat';
import GlobalStyles from './styles';
import {
  // TWITCH_CLIENT_ID,
  // TWITCH_REDIRECT_URI,
  MAIN_CHANNEL_NAME,
} from './utils/constants';

// const params = {
//   client_id: TWITCH_CLIENT_ID,
//   redirect_uri: TWITCH_REDIRECT_URI,
//   response_type: 'token+id_token',
//   scope: ['openid', 'chat:edit', 'chat:read'].join('+'),
//   claims: JSON.stringify({ id_token: { email_verified: null } }),
//   // state: uid(),
// };
// const paramsString = Object.entries(params)
//   .map(([key, value]) => `${key}=${value}`)
//   .join('&');

// const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?${paramsString}`;

const options = {
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [MAIN_CHANNEL_NAME],
};

const parseEmotes = (emotes) => {
  if (typeof emotes !== 'string') return emotes;

  return emotes.split('/').reduce((acc, emote) => {
    const [emoteId, emoteIndexes] = emote.split(':');

    return {
      ...acc,
      [emoteId]: emoteIndexes.split(','),
    };
  }, {});
};

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const recentMessagesResponse = await fetch(
        `https://recent-messages.robotty.de/api/v2/recent-messages/${MAIN_CHANNEL_NAME}?clearchatToNotice=true`,
      );
      const recentMessages = await recentMessagesResponse.json();
      const normalizedRecentMessages = recentMessages.messages
        .map((rawMessage) => tmiParser.msg(rawMessage))
        .filter(({ command }) => command === 'PRIVMSG')
        .map(
          ({
            params: [, text],
            tags: { 'display-name': name, color, emotes },
          }) => ({
            name,
            color,
            text,
            emotes: parseEmotes(emotes),
            isHistory: true,
          }),
        );

      setMessages(normalizedRecentMessages);
    };

    fetchData();

    const client = new TwitchClient(options);

    client.connect();
    client.on(
      'message',
      (channel, { color, 'display-name': name, emotes }, text) => {
        const message = {
          name,
          color,
          emotes: parseEmotes(emotes),
          text,
        };
        setMessages((m) => [...m, message]);
      },
    );
  }, []);

  return (
    <>
      <Chat messages={messages} />
      <GlobalStyles />
    </>
  );
};

export default App;

import type { RootState } from 'app/rootReducer';
import assertNever from 'utils/assertNever';
import type { MessageCardInfo } from 'features/messages/messagesSlice';

// eslint-disable-next-line import/prefer-default-export
export const messageCardSelector = (
  card: Omit<MessageCardInfo, 'url'> | null,
) => (state: RootState) => {
  if (!card) return null;

  if (card.type === 'twitch-clip') {
    return state.messageCards.twitchClips[card.id];
  }

  if (card.type === 'twitch-video') {
    return state.messageCards.twitchVideos[card.id];
  }

  if (card.type === 'youtube-video') {
    return state.messageCards.youtubeVideos[card.id];
  }

  return assertNever(card.type);
};

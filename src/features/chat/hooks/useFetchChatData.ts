import { useEffect } from 'react';
import { useAppSelector } from 'app/hooks';
import { isAuthSelector, meIdSelector } from 'features/auth';
import { optionsSelector } from 'features/options';
import {
  useLazyBlockedUsersQuery,
  useLazyBttvChannelEmotesQuery,
  useLazyBttvGlobalBadgesQuery,
  useLazyBttvGlobalEmotesQuery,
  useLazyChatterinoBadgesQuery,
  useLazyFfzApGlobalBadgesQuery,
  useLazyFfzChannelEmotesQuery,
  useLazyFfzGlobalBadgesQuery,
  useLazyFfzGlobalEmotesQuery,
  useLazyRecentMessagesQuery,
  useLazyStvChannelEmotesQuery,
  useLazyStvCosmeticsQuery,
  useLazyStvGlobalEmotesQuery,
  useLazyTwitchChannelBadgesQuery,
  useLazyTwitchEmotesQuery,
  useLazyTwitchGlobalBadgesQuery,
} from 'features/api';
import {
  currentChannelIdSelector,
  currentChannelNameSelector,
} from '../chatSelectors';

const useFetchChatData = () => {
  const isAuth = useAppSelector(isAuthSelector);
  const meId = useAppSelector(meIdSelector);
  const currentChannelName = useAppSelector(currentChannelNameSelector);
  const currentChannelId = useAppSelector(currentChannelIdSelector);
  const options = useAppSelector(optionsSelector);

  const [fetchTwitchEmotes] = useLazyTwitchEmotesQuery();
  const [fetchTwitchGlobalBadges] = useLazyTwitchGlobalBadgesQuery();
  const [fetchTwitchChannelBadges] = useLazyTwitchChannelBadgesQuery();
  const [fetchBlockedUsers] = useLazyBlockedUsersQuery();

  const [fetchBttvGlobalEmotes] = useLazyBttvGlobalEmotesQuery();
  const [fetchBttvChannelEmotes] = useLazyBttvChannelEmotesQuery();
  const [fetchBttvGlobalBadges] = useLazyBttvGlobalBadgesQuery();

  const [fetchFfzGlobalEmotes] = useLazyFfzGlobalEmotesQuery();
  const [fetchFfzChannelEmotes] = useLazyFfzChannelEmotesQuery();
  const [fetchFfzGlobalBadges] = useLazyFfzGlobalBadgesQuery();
  const [fetchFfzApGlobalBadges] = useLazyFfzApGlobalBadgesQuery();

  const [fetchStvGlobalEmotes] = useLazyStvGlobalEmotesQuery();
  const [fetchStvChannelEmotes] = useLazyStvChannelEmotesQuery();
  const [fetchStvCosmetics] = useLazyStvCosmeticsQuery();

  const [fetchChatterinoBadges] = useLazyChatterinoBadgesQuery();

  const [fetchRecentMessages] = useLazyRecentMessagesQuery();

  useEffect(() => {
    if (!isAuth || !meId) return;

    fetchBlockedUsers(meId, true);
  }, [isAuth, meId]);

  // refetch twitch emote sets when channel changes
  useEffect(() => {
    if (!isAuth || !currentChannelName) return;

    fetchTwitchEmotes(undefined, true);
  }, [isAuth, currentChannelName]);

  useEffect(() => {
    fetchTwitchGlobalBadges(undefined, true);

    if (options.bttv.emotes) fetchBttvGlobalEmotes(undefined, true);
    if (options.bttv.badges) fetchBttvGlobalBadges(undefined, true);

    if (options.ffz.emotes) fetchFfzGlobalEmotes(undefined, true);
    if (options.ffz.badges) {
      fetchFfzGlobalBadges(undefined, true);
      fetchFfzApGlobalBadges(undefined, true);
    }

    if (options.stv.emotes) fetchStvGlobalEmotes(undefined, true);
    if (options.stv.badges || options.stv.paints) {
      fetchStvCosmetics(undefined, true);
    }

    if (options.chatterino.badges) fetchChatterinoBadges(undefined, true);
  }, [
    options.bttv.emotes,
    options.bttv.badges,
    options.ffz.emotes,
    options.ffz.badges,
    options.stv.emotes,
    options.stv.badges,
    options.stv.paints,
    options.chatterino.badges,
  ]);

  useEffect(() => {
    if (!currentChannelId) return;

    fetchTwitchChannelBadges(currentChannelId, true);

    if (options.bttv.emotes) fetchBttvChannelEmotes(currentChannelId, true);
    if (options.ffz.emotes) fetchFfzChannelEmotes(currentChannelId, true);
    if (options.stv.emotes) fetchStvChannelEmotes(currentChannelId, true);
  }, [
    currentChannelId,
    options.bttv.emotes,
    options.ffz.emotes,
    options.stv.emotes,
  ]);

  useEffect(() => {
    if (!currentChannelName) return;

    if (options.recentMessages.load) {
      fetchRecentMessages(currentChannelName, true);
    }
  }, [currentChannelName, options.recentMessages.load]);
};

export default useFetchChatData;

import { ChatterinoBadgesResponse } from './chatterinoApiTypes';

const chatterino = {
  globalBadges: (): Promise<ChatterinoBadgesResponse> =>
    fetch('https://api.chatterino.com/badges').then((r) => r.json()),
};

export default chatterino;

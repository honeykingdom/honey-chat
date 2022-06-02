import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Badges } from '../types';
import { ChatterinoBadge } from './chatterinoApiTypes';

export const chatterinoApi = createApi({
  reducerPath: 'chatterinoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    chatterinoBadges: builder.query<Badges<ChatterinoBadge>, void>({
      query: () => 'https://api.chatterino.com/badges',
    }),
  }),
});

export const { useLazyChatterinoBadgesQuery } = chatterinoApi;

export const chatterinoBadgesSelector =
  chatterinoApi.endpoints.chatterinoBadges.select();

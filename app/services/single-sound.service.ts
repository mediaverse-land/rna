import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const singleSoundService: any = createApi({
  reducerPath: 'singleSoundService',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_APPBASE_URL,
  }),
  endpoints: (builder) => ({
    getSingleSoundData: builder.query({
      query: (args) => {
        return {
          url: `/audios/${args.id}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${args.token}`, 'Accept-Language': 'en-US' },
        };
      },
    }),
    createSingleSound: builder.mutation({
      query: (args) => {
        return {
          url: '/audios',
          method: 'POST',
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}`, 'Accept-Language': 'en-US' },
        };
      },
    }),
    convertAudioToText: builder.mutation({
      query: (args) => {
        console.log(args.body, args.token);
        return {
          url: '/convert/audio-text',
          method: 'POST',
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}`, 'Accept-Language': 'en-US' },
        };
      },
    }),
  }),
});

export const {
  useGetSingleSoundDataQuery,
  useCreateSingleSoundMutation,
  useConvertAudioToTextMutation,
} = singleSoundService;

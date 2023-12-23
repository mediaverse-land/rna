import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const singleTextService: any = createApi({
  reducerPath: 'singleTextService',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_APPBASE_URL,
  }),
  endpoints: (builder) => ({
    getSingleText: builder.query({
      query: (args) => {
        return {
          url: `/texts/${args.id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
            'X-App': '_Android',
          },
        };
      },
    }),
    createSingleText: builder.mutation({
      query: (args) => {
        return {
          url: '/texts',
          method: 'POST',
          body: args.body,
          headers: {
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
            'X-App': '_Android',
          },
        };
      },
    }),
    convertTextToText: builder.mutation({
      query: (args) => {
        return {
          url: '/convert/text-text',
          method: 'POST',
          body: args.body,
          headers: {
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
            'X-App': '_Android',
          },
        };
      },
    }),
    convertTextToAudio: builder.mutation({
      query: (args) => {
        console.log(args.body);
        return {
          url: '/convert/text-audio',
          method: 'POST',
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}`, 'Accept-Language': 'en-US' },
        };
      },
    }),
  }),
});

export const {
  useGetSingleTextQuery,
  useCreateSingleTextMutation,
  useConvertTextToTextMutation,
  useConvertTextToAudioMutation,
} = singleTextService;

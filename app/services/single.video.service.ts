import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const singleVideoService: any = createApi({
  reducerPath: 'singleVideoService',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_APPBASE_URL,
  }),
  endpoints: (builder) => ({
    getSingleVideo: builder.query({
      query: (args) => {
        return {
          url: `videos/${args.id}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${args.token}`, 'Accept-Language': 'en-US' },
        };
      },
    }),
    createSingleVideo: builder.mutation({
      query: (args) => {
        return {
          url: '/videos',
          method: 'POST',
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}`, 'Accept-Language': 'en-US' },
        };
      },
    }),
  }),
});

export const { useCreateSingleVideoMutation } = singleVideoService;

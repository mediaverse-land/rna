import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const singleTextService: any = createApi({
  reducerPath: 'singleTextService',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_APPBASE_URL,
  }),
  endpoints: (builder) => ({
    getSingleImage: builder.query({
      query: (args) => {
        return {
          url: `/texts/${args.id}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
    createSingleText: builder.mutation({
      query: (args) => {
        return {
          url: '/texts',
          method: 'POST',
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
    convertTextToText: builder.mutation({
      query: (args) => {
        return {
          url: '/convert/text-text',
          method: 'POST',
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
  }),
});

export const { useCreateSingleTextMutation, useConvertTextToTextMutation } = singleTextService;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Image } from '../types/image';


export const singleImageService: any = createApi({
  reducerPath: 'singleImageService',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_APPBASE_URL,
  }),
  endpoints: (builder) => ({
    getSingleImage: builder.query<Image, { id: number, token: string }>({
      query: (args) => {
        return {
          url: `images/${args.id}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${args.token}`, 'Accept-Language': 'en-US' },
        };
      },
    }),
    createSingleImage: builder.mutation({
      query: (args) => {
        return {
          url: '/images',
          method: 'POST',
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}`, 'Accept-Language': 'en-US' },
        };
      },
    }),
  }),
});

export const { useGetSingleImageQuery, useCreateSingleImageMutation } = singleImageService;

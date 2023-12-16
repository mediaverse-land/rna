import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Image } from '../types/image';
import { tokenStringResolver } from '../utils/token-string-resolver';
import AsyncStorage from '@react-native-async-storage/async-storage';

const _getToken = async () => {
  const formattedToken = await tokenStringResolver(await AsyncStorage.getItem('user_data'));
  return formattedToken;
};

export const singleImageService: any = createApi({
  reducerPath: 'singleImageService',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_APPBASE_URL,
  }),
  endpoints: (builder) => ({
    getSingleImage: builder.query<Image, { id: number }>({
      query: (args) => {
        return {
          url: `images/${args.id}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${_getToken}` },
        };
      },
    }),
    createSingleImage: builder.mutation({
      query: (args) => {
        return {
          url: '/images',
          method: 'POST',
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
  }),
});

export const { useGetSingleImageQuery, useCreateSingleImageMutation } = singleImageService;

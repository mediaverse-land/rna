import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const uploadService: any = createApi({
  reducerPath: 'uploadService',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_APPBASE_URL,
  }),
  endpoints: (builder) => ({
    uploadAsset: builder.mutation({
      query: (args) => {
        return {
          url: `/assets/${args.body.asset_id}/files`,
          method: 'POST',
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
  }),
});

export const { useUploadAssetMutation } = uploadService;

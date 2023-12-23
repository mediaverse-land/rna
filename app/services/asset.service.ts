import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const assetService: any = createApi({
  reducerPath: 'assetService',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_APPBASE_URL,
  }),
  endpoints: (builder) => ({
    search: builder.mutation({
      query: (args) => {
        return {
          url: args.url,
          method: 'GET',
          headers: {
            'X-App': '_Android',
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
          },
        };
      },
    }),

    googleDriveShare: builder.mutation({
      query: (args) => {
        return {
          url: `/share/google-drive`,
          method: 'POST',
          body: args.body,
          headers: {
            'X-App': '_Android',
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    youtubeShare: builder.mutation({
      query: (args) => {
        console.log(args)
        return {
          url: `/share/youtube`,
          // url: `/share/stream`,
          method: 'POST',
          body: args.body,
          headers: {
            'X-App': '_Android',
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    share: builder.mutation({
      query: (args) => {
        return {
          url: args.url,
          body: args.body,
          method: 'POST',
          headers: {
            'X-App': '_Android',
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    addExternalAccount: builder.mutation({
      query: (args) => {
        return {
          url: `/external-accounts`,
          method: 'POST',
          body: args.body,
          headers: {
            'X-App': '_Android',
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
          },
        };
      },
    }),

    updateExternalAccount: builder.mutation({
      query: (args) => {
        return {
          url: `/external-accounts/${args.id}`,
          method: 'PUT',
          body: args.body,
          headers: {
            'X-App': '_Android',
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    removeExternalAccount: builder.mutation({
      query: (args) => {
        return {
          url: `/external-accounts/${args.id}`,
          method: 'DELETE',
          // body: args.body,
          headers: {
            'X-App': '_Android',
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    getAssetList: builder.query({
      query: (args) => {
        return {
          url: args.url,
          method: 'GET',
          headers: {
            'X-App': '_Android',
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    getShareList: builder.query({
      query: (args) => {
        return {
          url: `/share-schedules?page=${args.page}`,
          method: 'GET',
          headers: {
            'X-App': '_Android',
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    removeShareItem: builder.mutation({
      query: (args) => {
        return {
          url: `/share-schedules/${args.id}`,
          method: 'DELETE',
          headers: {
            'X-App': '_Android',
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    createAsset: builder.mutation({
      query: (args) => {
        return {
          url: args.url,
          method: 'POST',
          body: args.body,
          headers: {
            'X-App': '_Android',
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    getComments: builder.query({
      query: (args) => {
        return {
          url: `/assets/${args.assetId}/comments`,
          method: 'GET',
          headers: {
            'X-App': '_Android',
            Authorization: `Bearer ${args.token}`,
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
  }),
});

export const {
  useGoogleDriveShareMutation,
  useAddExternalAccountMutation,
  useUpdateExternalAccountMutation,
  useYoutubeShareMutation,
  useGetAssetListQuery,
  useShareMutation,
  useGetShareListQuery,
  useRemoveExternalAccountMutation,
  useRemoveShareItemMutation,

  useCreateAssetMutation,

  useSearchMutation,

  useGetCommentsQuery
} = assetService;

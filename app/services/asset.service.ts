import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const assetService: any = createApi({
  reducerPath: "assetService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mediaverse.land/v2",
  }),
  endpoints: (builder) => ({
    search: builder.mutation({
      query: (args) => {
        return {
          url: args.url,
          method: "GET",
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),

    googleDriveShare: builder.mutation({
      query: (args) => {
        return {
          url: `/share/google-drive`,
          method: "POST",
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
    youtubeShare: builder.mutation({
      query: (args) => {
        return {
          url: `/share/youtube`,
          // url: `/share/stream`,
          method: "POST",
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
    share: builder.mutation({
      query: (args) =>{ 
        return {
          url:args.url,
          body: args.body,
          method: "POST",
          headers: { Authorization: `Bearer ${args.token}` },
        }
      }
    }),
    addExternalAccount: builder.mutation({
      query: (args) => {
        return {
          url: `/external-accounts`,
          method: "POST",
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),

    updateExternalAccount: builder.mutation({
      query: (args) => {
        return {
          url: `/external-accounts/${args.id}`,
          method: "PUT",
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
    removeExternalAccount: builder.mutation({
      query: (args) => {
        return {
          url: `/external-accounts/${args.id}`,
          method: "DELETE",
          // body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
    getAssetList: builder.query({
      query: (args) => {
        return {
          url: args.url,
          method: "GET",
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
    getShareList: builder.query({
      query: (args) => {
        return {
          url: `/share-schedules?page=${args.page}`,
          method: "GET",
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
    removeShareItem: builder.mutation({
      query: (args) => {
        return {
          url: `/share-schedules/${args.id}`,
          method: "DELETE",
          headers: { Authorization: `Bearer ${args.token}` },
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

  useSearchMutation
} = assetService;

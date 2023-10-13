import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const assetService: any = createApi({
  reducerPath: "assetService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mediaverse.land/v2",
  }),
  endpoints: (builder) => ({
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
          url: `/external-accounts/${args.body?.id}`,
          method: "DELETE",
          // body: args.body,
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

  useRemoveExternalAccountMutation
} = assetService;

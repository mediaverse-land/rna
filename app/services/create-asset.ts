import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadService: any = createApi({
  reducerPath: "uploadService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mediaverse.land/v2",
  }),
  endpoints: (builder) => ({
    uploadAsset: builder.mutation({
      query: (args) => {
        return {
          url: `/assets/${args.body.asset_id}/files`,
          method: "POST",
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
  }),
});

export const { 
  useUploadAssetMutation
 } = uploadService;

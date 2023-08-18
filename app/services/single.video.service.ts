import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const singleVideoService: any = createApi({
  reducerPath: "singleVideoService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mediaverse.land/v2",
  }),
  endpoints: (builder) => ({
    getSingleVideo: builder.query({
      query: (args) => {
        return {
          url: `videos/${args.id}`,
          method: "GET",
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
    createSingleVideo: builder.mutation({
      query: (args) => {
        return {
          url: "/videos",
          method: "POST",
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
  }),
});

export const { useCreateSingleVideoMutation } = singleVideoService;

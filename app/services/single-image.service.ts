import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const singleImageService: any = createApi({
  reducerPath: "singleImageService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mediaverse.land/v2",
  }),
  endpoints: (builder) => ({
    getSingleImage: builder.query({
      query: (args) => {
        return {
          url: `images/${args.id}`,
          method: "GET",
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
    createSingleImage: builder.mutation({
      query: (args) => {
        return {
          url: "/images",
          method: "POST",
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        }
      },
    }),
  }),
});

export const { useGetSingleImageQuery, useCreateSingleImageMutation } = singleImageService;

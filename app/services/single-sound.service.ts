import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const singleSoundService: any = createApi({
  reducerPath: "singleSoundService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mediaverse.land/v2",
  }),
  endpoints: (builder) => ({
    getSingleVideoData: builder.query({
      query: (args) => {
        return {
          url: `/audios/${args.id}`,
          method: "GET",
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
    createSingleSound: builder.mutation({
      query: (args) => {
        console.log({args})
        return {
          url: "/audios",
          method: "POST",
          body: args.body,
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
  }),
});

export const { 
    useGetSingleVideoDataQuery,
    useCreateSingleSoundMutation
 } = singleSoundService;

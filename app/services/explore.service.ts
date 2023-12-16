import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { enviroments } from "../../enviroments/enviroments";

export const exploreService: any = createApi({
  reducerPath: "exploreService",
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.BASE_URL,
  }),
  //   tagTypes: ['ExploreLives'],
  endpoints: (builder) => ({
    getLives: builder.query({
      query: () => {
        return {
          url: "lives",
          method: "GET",
          headers: {
            // Authorization: `Bearer ${args.token}`
            "X-App": "_Android",
          },
        };
      },
    }),
    getMostViewdImages: builder.query({
      query: () => {
        return {
          url: "images/daily-recommended",
          method: "GET",
          headers: {
            // Authorization: `Bearer ${args.token}`
            "X-App": "_Android",
          },
        };
      },
    }),
    getTopTenTexts: builder.query({
      query: () => {
        return {
          url: "texts/",
          method: "GET",
          headers: {
            // Authorization: `Bearer ${args.token}`
            "X-App": "_Android",
          },
        };
      },
    }),
    getBestVideos: builder.query({
      query: () => {
        return {
          url: "videos/most-viewed",
          method: "GET",
          headers: {
            // Authorization: `Bearer ${args.token}`
            "X-App": "_Android",
          },
        };
      },
    }),
    getChillSongs: builder.query({
      query: () => {
        return {
          url: "audios/daily-recommended",
          method: "GET",
          headers: {
            // Authorization: `Bearer ${args.token}`
            "X-App": "_Android",
          },
        };
      },
    }),
  }),
});

export const {
  useGetLivesQuery,
  useGetBestVideosQuery,
  useGetMostViewdImagesQuery,
  useGetTopTenTextsQuery,
  useGetChillSongsQuery
} = exploreService;

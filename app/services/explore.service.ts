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
      query: (args) => {
        return {
          url: "lives",
          method: "GET",
          headers: {
            // Authorization: `Bearer ${args.token}`
            "X-App": "_ReactNative",
          },
        };
      },
    }),
    getMostViewdImages: builder.query({
      query: (args) => {
        return {
          url: "images/daily-recommended",
          method: "GET",
          headers: {
            // Authorization: `Bearer ${args.token}`
            "X-App": "_ReactNative",
          },
        };
      },
    }),
    getTopTenTexts: builder.query({
      query: (args) => {
        return {
          url: "texts",
          method: "GET",
          headers: {
            // Authorization: `Bearer ${args.token}`
            "X-App": "_ReactNative",
          },
        };
      },
    }),
    getBestVideos: builder.query({
      query: (args) => {
        return {
          url: "videos/most-viewed",
          method: "GET",
          headers: {
            // Authorization: `Bearer ${args.token}`
            "X-App": "_ReactNative",
          },
        };
      },
    }),
    getChillSongs: builder.query({
      query: (args) => {
        return {
          url: "audios/daily-recommended",
          method: "GET",
          headers: {
            // Authorization: `Bearer ${args.token}`
            "X-App": "_ReactNative",
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

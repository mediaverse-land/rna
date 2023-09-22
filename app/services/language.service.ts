import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { enviroments } from "../../enviroments/enviroments";

export const languageService: any = createApi({
  reducerPath: "languageService",
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.BASE_URL,
  }),
  tagTypes: ["Language", "country"],
  endpoints: (builder) => ({
    getLanguages: builder.query({
      query: (args) => {
        return {
          url: "languages",
          method: "GET",
          headers: {
            // Authorization: `Bearer ${args.token}`
            "X-App": "_ReactNative",
          },
        };
      },
    }),
    getCountries: builder.query({
      query: (args) => {
        return {
          url: "countries",
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

export const { useGetLanguagesQuery, useGetCountriesQuery } = languageService;

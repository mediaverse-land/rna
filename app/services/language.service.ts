import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enviroments } from '../../enviroments/enviroments';

export const languageService: any = createApi({
  reducerPath: 'languageService',
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.BASE_URL,
  }),
  // tagTypes: ['Language', 'country'],
  endpoints: (builder) => ({
    getLanguages: builder.query({
      query: () => {
        return {
          url: 'languages',
          method: 'GET',
          headers: {
            // Authorization: `Bearer ${args.token}`
            'X-App': '_Android',
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    getCountries: builder.query({
      query: () => {
        return {
          url: 'countries',
          method: 'GET',
          headers: {
            // Authorization: `Bearer ${args.token}`
            'X-App': '_Android',
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
  }),
});

export const { useGetLanguagesQuery, useGetCountriesQuery } = languageService;

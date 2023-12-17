import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enviroments } from '../../enviroments/enviroments';

export const profileService = createApi({
  reducerPath: 'profileService',
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.BASE_URL,
  }),
  //   tagTypes: ['ExploreLives'],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (args) => {
        return {
          url: 'profile/statics',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${args.token}`,
            'X-App': '_Android',
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
  }),
});

export const { useGetUserProfileQuery } = profileService;

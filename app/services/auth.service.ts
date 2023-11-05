import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { enviroments } from "../../enviroments/enviroments";

export const authService: any = createApi({
  reducerPath: "authService",
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.BASE_URL,
  }),
  //   tagTypes: ['ExploreLives'],
  endpoints: (builder) => ({
    getExternalAccountsList: builder.query({
      query: (args) => {
        return {
          url: `external-accounts?page=${args.page}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${args.token}`,
            "X-App": "_Android",
          },
        };
      },
    }),
    setFirebasePushNotificationAccount: builder.mutation({
      query: (args) => {
        console.log(args)
        return {
          url: `push-notifications/firebase-tokens`,
          method: "POST",
          body: args.body,
          headers: {
            Authorization: `Bearer ${args.token}`,
            "X-App": "_Android",
          },
        };
      },
    }),
    signIn: builder.mutation({
      query: (args) => {
        return {
          url: `auth/sign-in`,
          method: "POST",
          body: args.body,
          headers: {
            "X-App": "_Android",
            // "Accept-Language": "en-US"
          },
        };
      },
    }),
    
  }),
});

export const {
  useGetExternalAccountsListQuery,
  useSetFirebasePushNotificationAccountMutation,
  useSignInMutation,
} = authService;

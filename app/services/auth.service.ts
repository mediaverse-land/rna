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
        console.log(`Bearer ${args.token}`)
        return {
          url: `external-accounts?page=${args.page}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${args.token}`,
            "X-App": "_ReactNative",
          },
        };
      },
    }),

  }),
});

export const {
  useGetExternalAccountsListQuery
} = authService;

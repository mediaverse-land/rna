import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {REACT_APP_BASE_URL} from '@env'

export const viewAllService: any = createApi({
  reducerPath: "viewAllService",
  baseQuery: fetchBaseQuery({
    baseUrl: REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAssetList: builder.query({
      query: (args) => {
        return {
          url: args.url,
          method: "GET",
          headers: { Authorization: `Bearer ${args.token}` },
        };
      },
    }),
  }),
});

export const { 
  useGetAssetListQuery
 } = viewAllService;

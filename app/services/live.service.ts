import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { enviroments } from "../../enviroments/enviroments";

export const liveService: any = createApi({
  reducerPath: "liveService",
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.BASE_URL,
  }),
  endpoints: (builder) => ({
    recordLive: builder.mutation({
      query: (args) => {
        return {
          url: "edit/live/record",
          method: "POST",
          body: args.body,
          headers: {
            Authorization: `Bearer ${args.token}`,
            "X-App": "_ReactNative",
          },
        };
      },
    }),
    getSearchLive: builder.query({
      query: (args) => {

        console.log({args})

        let url = 'lives?'

        if(args.lang) url = url+`language=${args.lang}`

        if(args.country){
          if(url.charAt(url.length -1) === '?'){
            url = url + `country=${args.country}`
          }
          else{
            url = url + `&country=${args.country}`
          }
        }

        // const lang = args?.params.lang ? `lang=${args.params.lang}` : null;
        // const country = args.params.country
        //   ? `country=${args.params.country}`
        //   : null;
        // console.log(`lives?${lang}&${country}`);

        return {
          url: url,
          method: "get",
          headers: {
            // Authorization: `Bearer ${args.token}`,
            "X-App": "_ReactNative",
          },
        };
      },
    }),
  }),
});

export const { useRecordLiveMutation, useGetSearchLiveQuery } = liveService;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enviroments } from '../../enviroments/enviroments';

export const paymentService: any = createApi({
  reducerPath: 'paymentService',
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.BASE_URL,
  }),
  endpoints: (builder) => ({
    connectToStripe: builder.mutation({
      query: (args) => {
        return {
          url: `stripe/connect`,
          method: 'POST',
          body: {},
          headers: {
            Authorization: `Bearer ${args.token}`,
            'X-App': '_Android',
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    chargeStripe: builder.mutation({
      query: (args) => {
        return {
          url: `stripe/gateway`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${args.token}`,
            'X-App': '_Android',
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    checkStripeAccount: builder.query({
      query: (args) => {
        return {
          url: `stripe/account`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${args.token}`,
            'X-App': '_Android',
            'Accept-Language': 'en-US',
          },
        };
      },
    }),
    checkStripeAccountBalance: builder.query({
      query: (args) => {
        return {
          url: `stripe/balance`,
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

export const {
  useConnectToStripeMutation,
  useCheckStripeAccountQuery,
  useChargeStripeMutation,
  useCheckStripeAccountBalanceQuery,
} = paymentService;

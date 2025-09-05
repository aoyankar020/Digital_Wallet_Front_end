import { baseApi } from "../baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMoney: builder.mutation({
      query: (userinfo) => ({
        url: "/agent/cash-in",
        method: "POST",
        data: userinfo,
      }),
      invalidatesTags: () => [{ type: "WALLET" }, { type: "TRANSACTION" }],
    }),

    withdrawMoney: builder.mutation({
      query: (userinfo) => ({
        url: "/agent/cash-out",
        method: "POST",
        data: userinfo,
      }),
      invalidatesTags: () => [{ type: "WALLET" }, { type: "TRANSACTION" }],
    }),
    updateProfile: builder.mutation({
      query: (userinfo) => ({
        url: "/agent/update",
        method: "PATCH",
        data: userinfo,
      }),
      invalidatesTags: ["USER"],
    }),

    getTransactions: builder.query({
      query: (params?: { type?: string; page?: number; limit?: number }) => {
        const searchParams = new URLSearchParams();

        if (params?.type) searchParams.append("type", params.type);
        if (params?.page) searchParams.append("page", String(params.page));
        if (params?.limit) searchParams.append("limit", String(params.limit));

        return {
          url: `/agent/transaction-history?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) => [{ type: "TRANSACTION", id: result?.id }],
    }),
    getWallet: builder.query({
      query: () => ({
        url: "/agent/wallet",
        method: "GET",
      }),
      providesTags: (result) => [{ type: "WALLET", id: result?.id }],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),

    getMeAgent: builder.query({
      query: () => ({
        url: "/agent/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddMoneyMutation,
  useGetMeAgentQuery,
  useWithdrawMoneyMutation,
  useGetTransactionsQuery,
  useUpdateProfileMutation,
  useGetWalletQuery,
} = agentApi;

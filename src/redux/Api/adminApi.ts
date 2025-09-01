import { baseApi } from "../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMoney: builder.mutation({
      query: (ammount) => ({
        url: "/user/add-money",
        method: "POST",
        data: ammount,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
    }),
    getAgents: builder.query({
      query: () => ({
        url: "/admin/agents",
        method: "GET",
      }),
    }),
    getWallets: builder.query({
      query: () => ({
        url: "/admin/wallets",
        method: "GET",
      }),
    }),
    blockAgent: builder.mutation({
      query: (data) => ({
        url: "/admin/approve/agent",
        method: "PATCH",
        data: data,
      }),
    }),
    getAllTransactions: builder.query({
      query: (params?: { type?: string; page?: number; limit?: number }) => {
        const searchParams = new URLSearchParams();

        if (params?.type) searchParams.append("type", params.type);
        if (params?.page) searchParams.append("page", String(params.page));
        if (params?.limit) searchParams.append("limit", String(params.limit));

        return {
          url: `/admin/transaction-history?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TRANSACTION"],
    }),
    // getAllTransactions: builder.query({
    //   query: () => ({
    //     url: "/admin/transaction-history",
    //     method: "GET",
    //   }),
    //   providesTags: ["TRANSACTION"],
    // }),

    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddMoneyMutation,
  useGetMeQuery,
  useGetAgentsQuery,
  useGetUsersQuery,
  useGetWalletsQuery,
  useGetAllTransactionsQuery,
  useBlockAgentMutation,
} = adminApi;

import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userAddMoney: builder.mutation({
      query: (ammount) => {
        return {
          url: "/user/add-money",
          method: "POST",
          data: ammount,
        };
      },
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    userWithdrawMoney: builder.mutation({
      query: (ammount) => ({
        url: "/user/withdraw",
        method: "POST",
        data: ammount,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    sendMoney: builder.mutation({
      query: (ammount) => ({
        url: "/user/send-money",
        method: "POST",
        data: ammount,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    getTransaction: builder.query({
      query: (params?: { type?: string; page?: number; limit?: number }) => {
        const searchParams = new URLSearchParams();

        if (params?.type) searchParams.append("type", params.type);
        if (params?.page) searchParams.append("page", String(params.page));
        if (params?.limit) searchParams.append("limit", String(params.limit));

        return {
          url: `/user/transaction-history?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TRANSACTION"],
    }),
    getuserWallet: builder.query({
      query: () => ({
        url: "/user/wallet",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
    updateUserProfile: builder.mutation({
      query: (userinfo) => ({
        url: "/user/update_user",
        method: "PATCH",
        data: userinfo,
      }),
      invalidatesTags: ["USER"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useUserAddMoneyMutation,
  useGetMeQuery,
  useUserWithdrawMoneyMutation,
  useSendMoneyMutation,
  useGetTransactionQuery,
  useGetuserWalletQuery,
  useUpdateUserProfileMutation,
} = userApi;

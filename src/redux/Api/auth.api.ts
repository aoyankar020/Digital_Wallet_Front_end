import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    regesterUser: builder.mutation({
      query: (userinfo) => ({
        url: "/user/regester",
        method: "POST",
        data: userinfo,
      }),
    }),
    regesterAgent: builder.mutation({
      query: (userinfo) => ({
        url: "/agent/regester",
        method: "POST",
        data: userinfo,
      }),
    }),
    loginUser: builder.mutation({
      query: (userinfo) => ({
        url: "/auth/login/user",
        method: "POST",
        data: userinfo,
      }),
      invalidatesTags: ["USER"],
    }),
    loginAgent: builder.mutation({
      query: (userinfo) => ({
        url: "/auth/login/agent",
        method: "POST",
        data: userinfo,
      }),
      invalidatesTags: ["AGENTS"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER", "AGENTS"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER", "AGENTS"],
    }),

    getMeAgent: builder.query({
      query: () => ({
        url: "/agent/me",
        method: "GET",
      }),
      providesTags: ["USER", "AGENTS"],
    }),
  }),
});

export const {
  useRegesterUserMutation,
  useRegesterAgentMutation,
  useLoginUserMutation,
  useLoginAgentMutation,
  useGetMeQuery,
  useLogoutMutation,
  useGetMeAgentQuery,
} = authApi;

import { type TROLE } from "@/constant/role";

import { useGetMeAgentQuery, useGetMeQuery } from "@/redux/Api/auth.api";

import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const AutorizationhComponent = (
  Component: ComponentType,
  requiredRole?: TROLE
) => {
  return function authWrapper() {
    // const auth = useAppSelector((state) => state.auth);
    // const isAgent = auth.role === ROLE.AGENT;
    // console.log("Auth Compo", auth);
    const { data: userData, isLoading: userLoading } = useGetMeQuery(undefined);
    const { data: agentData, isLoading: agentLoading } =
      useGetMeAgentQuery(undefined);
    if (userLoading || agentLoading) {
      return <div>Loading...</div>;
    }

    const user = userData?.data || agentData?.data;

    // console.log("User Dashboard User ", user);
    // if (!user?.email) {
    //   return <Navigate to="/" replace />;
    // }
    if (requiredRole && user?.role !== requiredRole) {
      console.log("Unauthorized:", {
        required: requiredRole,
        got: user?.role,
      });
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};

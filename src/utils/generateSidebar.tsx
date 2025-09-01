import { ROLE } from "@/constant/role";
import { agentSidebarsRoutes } from "@/routes/SideBar_Menues/agentSidebarsRoutes";
import { adminSidebarsRoutes } from "@/routes/SideBar_Menues/sideBarMenues";
import { userSidebarsRoutes } from "@/routes/SideBar_Menues/user_menues";
import type { TRole } from "@/types";

export const generateSideBar = (role: TRole) => {
  switch (role) {
    case ROLE.ADMIN:
      return adminSidebarsRoutes;

    case ROLE.USER:
      return userSidebarsRoutes;
    case ROLE.AGENT:
      return agentSidebarsRoutes;

    default:
      return [];
  }
};

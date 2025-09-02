import App from "@/App";
import DashboardLayout from "@/layouts/dashboardLayout";

import About from "@/pages/public/about";
import Contact from "@/pages/public/contact";
import FAQ from "@/pages/public/faq";

import { createBrowserRouter } from "react-router";
import { adminSidebarsRoutes } from "./SideBar_Menues/sideBarMenues";
import { generateRoutes } from "@/utils/generateRoutes";
import { userSidebarsRoutes } from "./SideBar_Menues/user_menues";
import { agentSidebarsRoutes } from "./SideBar_Menues/agentSidebarsRoutes";
import Unauthorized from "@/pages/errors/unauthorized";
import { ROLE, type TROLE } from "@/constant/role";
import { AutorizationhComponent } from "@/utils/authComponent";
import Features from "@/pages/public/features";
import Pricing from "@/pages/public/pricing";
import Home from "@/pages/public/home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "home",
        Component: Home,
        index: true,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "pricing",
        Component: Pricing,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "faq",
        Component: FAQ,
      },
      {
        path: "features",
        Component: Features,
      },
    ],
  },
  {
    path: "/admin",
    Component: AutorizationhComponent(DashboardLayout, ROLE.ADMIN as TROLE),
    children: [
      ...generateRoutes(adminSidebarsRoutes),
      // { index: true, element: <Navigate to={"/admin/users"} /> },
    ],
  },
  {
    path: "/user",
    Component: AutorizationhComponent(DashboardLayout, ROLE.USER as TROLE),
    children: [...generateRoutes(userSidebarsRoutes)],
  },
  {
    path: "/agent",
    Component: AutorizationhComponent(DashboardLayout, ROLE.AGENT as TROLE),
    children: [...generateRoutes(agentSidebarsRoutes)],
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);

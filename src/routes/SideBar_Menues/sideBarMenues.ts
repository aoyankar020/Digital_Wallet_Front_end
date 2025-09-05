import Profile from "@/pages/private/profile";
import { LayoutDashboard } from "lucide-react";
import { lazy } from "react";

const Agents = lazy(() => import("@/pages/private/admin/Agents"));
const AdminOverview = lazy(() => import("@/pages/private/admin/adminOverview"));
const Users = lazy(() => import("@/pages/private/admin/users"));
const Wallets = lazy(() => import("@/pages/private/admin/Wallets"));
const Transitions = lazy(() => import("@/pages/private/admin/Trsnsactions"));

export const adminSidebarsRoutes = [
  {
    title: "Dashboard",
    Icon: LayoutDashboard,
    url: "#",
    items: [
      {
        title: "Overview",
        url: "",
        Icon: LayoutDashboard,
        Component: AdminOverview,
      },
    ],
  },
  {
    title: "Features",
    Icon: LayoutDashboard,
    url: "#",
    items: [
      {
        title: "All Agents",
        url: "/admin/agents",
        Icon: LayoutDashboard,
        Component: Agents,
      },
      {
        title: "All Users",
        url: "/admin/users",
        Component: Users,
        Icon: LayoutDashboard,
      },
      {
        title: "Wallets",
        url: "/admin/wallets",
        Component: Wallets,
        Icon: LayoutDashboard,
      },
      {
        title: "Transactions",
        url: "/admin/transaction-history",
        Component: Transitions,
        Icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    Icon: LayoutDashboard,
    items: [
      {
        title: "Profile",
        url: "/admin/me",
        Icon: LayoutDashboard,
        Component: Profile,
      },
    ],
  },
];

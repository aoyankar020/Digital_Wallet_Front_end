import Profile from "@/pages/private/profile";
import { LayoutDashboard } from "lucide-react";
import { lazy } from "react";

const Agents = lazy(() => import("@/pages/private/admin/Agents"));
const DashboardHome = lazy(() => import("@/pages/dashboard/home"));
const Users = lazy(() => import("@/pages/private/admin/users"));
const Wallets = lazy(() => import("@/pages/private/admin/Wallets"));
const Transitions = lazy(() => import("@/pages/private/admin/Trsnsactions"));
const BlockWallet = lazy(() => import("@/pages/private/admin/BlockWallet"));
const ApproveAgent = lazy(() => import("@/pages/private/admin/ApproveAgent"));
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
        Component: DashboardHome,
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
      {
        title: "Approve Agent",
        url: "/admin/approve/agent",
        Component: ApproveAgent,
        Icon: LayoutDashboard,
      },
      {
        title: "Block Wallet",
        url: "/admin/approve/wallet",
        Component: BlockWallet,
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
        url: "",
        Icon: LayoutDashboard,
        Component: Profile,
      },
    ],
  },
];

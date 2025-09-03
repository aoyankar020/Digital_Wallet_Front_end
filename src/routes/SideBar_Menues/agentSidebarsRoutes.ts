import { lazy } from "react";
const Token = lazy(() => import("@/pages/private/token"));
const Profile = lazy(() => import("@/pages/private/profile"));
const Cashout = lazy(() => import("@/pages/private/agent/cashout"));
const CashIn = lazy(() => import("@/pages/private/agent/cashin"));
const AgentTransactions = lazy(
  () => import("@/pages/private/agent/agentPersonalTransactionHistory")
);
const agentOverview = lazy(() => import("@/pages/private/agent/agentOverview"));

import Wallet from "@/pages/private/Wallet";
import { LayoutDashboard } from "lucide-react";

export const agentSidebarsRoutes = [
  {
    title: "Dashboard",
    url: "#",
    Icon: LayoutDashboard,
    items: [
      {
        title: "Overview",
        url: "",
        Icon: LayoutDashboard,
        Component: agentOverview,
      },
    ],
  },
  {
    title: "Features",
    url: "#",
    Icon: LayoutDashboard,
    items: [
      {
        title: "Add Money",
        url: "/agent/cash-in",
        Component: CashIn,
        Icon: LayoutDashboard,
      },
      {
        title: "Withdraw Money",
        url: "/agent/cash-out",
        Component: Cashout,
        Icon: LayoutDashboard,
      },
      {
        title: "Wallets",
        url: "/agent/wallet",
        Component: Wallet,
        Icon: LayoutDashboard,
      },
      {
        title: "Transaction",
        url: "/agent/transaction-history",
        Component: AgentTransactions,
        Icon: LayoutDashboard,
      },

      {
        title: "Access Token",
        url: "/agent/newagenttoken",
        Component: Token,
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
        url: "/agent/me",
        Component: Profile,
        Icon: LayoutDashboard,
      },
    ],
  },
];

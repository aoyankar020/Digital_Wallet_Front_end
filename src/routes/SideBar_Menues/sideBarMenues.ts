// import Agents from "@/pages/private/admin/Agents";

// import ApproveAgent from "@/pages/private/admin/ApproveAgent";
// import BlockWallet from "@/pages/private/admin/BlockWallet";
// import Transitions from "@/pages/private/admin/Trsnsactions";
// import Users from "@/pages/private/admin/users";
// import Wallets from "@/pages/private/admin/Wallets";

import Profile from "@/pages/private/profile";
import { lazy } from "react";

const Agents = lazy(() => import("@/pages/private/admin/Agents"));
const Users = lazy(() => import("@/pages/private/admin/users"));
const Wallets = lazy(() => import("@/pages/private/admin/Wallets"));
const Transitions = lazy(() => import("@/pages/private/admin/Trsnsactions"));
const BlockWallet = lazy(() => import("@/pages/private/admin/BlockWallet"));
const ApproveAgent = lazy(() => import("@/pages/private/admin/ApproveAgent"));
export const adminSidebarsRoutes = [
  {
    title: "Features",
    url: "#",
    items: [
      {
        title: "All Agents",
        url: "/admin/agents",
        Component: Agents,
      },
      {
        title: "All Users",
        url: "/admin/users",
        Component: Users,
      },
      {
        title: "Wallets",
        url: "/admin/wallets",
        Component: Wallets,
      },
      {
        title: "Transactions",
        url: "/admin/transaction-history",
        Component: Transitions,
      },
      {
        title: "Approve Agent",
        url: "/admin/approve/agent",
        Component: ApproveAgent,
      },
      {
        title: "Block Wallet",
        url: "/admin/approve/wallet",
        Component: BlockWallet,
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    items: [
      {
        title: "Profile",
        url: "",
        Component: Profile,
      },
    ],
  },
];

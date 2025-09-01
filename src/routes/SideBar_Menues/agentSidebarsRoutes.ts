import AgentTransactions from "@/pages/private/agent/agentPersonalTransactionHistory";
import CashIn from "@/pages/private/agent/cashin";
import Cashout from "@/pages/private/agent/cashout";
import Profile from "@/pages/private/profile";
import Token from "@/pages/private/token";

import Wallet from "@/pages/private/Wallet";

export const agentSidebarsRoutes = [
  {
    title: "Features",
    url: "#",
    items: [
      {
        title: "Add Money",
        url: "/agent/cash-in",
        Component: CashIn,
      },
      {
        title: "Withdraw Money",
        url: "/agent/cash-out",
        Component: Cashout,
      },
      {
        title: "Wallets",
        url: "/agent/wallet",
        Component: Wallet,
      },
      {
        title: "Transaction",
        url: "/agent/transaction-history",
        Component: AgentTransactions,
      },

      {
        title: "Access Token",
        url: "/agent/newagenttoken",
        Component: Token,
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    items: [
      {
        title: "Profile",
        url: "/agent/me",
        Component: Profile,
      },
    ],
  },
];

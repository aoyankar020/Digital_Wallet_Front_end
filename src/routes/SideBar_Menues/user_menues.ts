import { lazy } from "react";

const AddMoney = lazy(() => import("@/pages/private/user/add_money"));
const Profile = lazy(() => import("@/pages/private/profile"));
const SendMoney = lazy(() => import("@/pages/private/user/send_money"));
const Token = lazy(() => import("@/pages/private/token"));
const Transaction = lazy(() => import("@/pages/private/Transaction"));
const Wallet = lazy(() => import("@/pages/private/Wallet"));
const Withdraw = lazy(() => import("@/pages/private/user/Withdraw"));

export const userSidebarsRoutes = [
  {
    title: "Features",
    url: "#",
    items: [
      {
        title: "Add Money",
        url: "/user/add-money",
        Component: AddMoney,
      },
      {
        title: "Withdraw",
        url: "/user/withdraw",
        Component: Withdraw,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        Component: SendMoney,
      },
      {
        title: "Transaction",
        url: "/user/transaction-history",
        Component: Transaction,
      },
      {
        title: "Wallet",
        url: "/user/wallet",
        Component: Wallet,
      },
      {
        title: "Access Token",
        url: "/user/newusertoken",
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
        url: "",
        Component: Profile,
      },
    ],
  },
];

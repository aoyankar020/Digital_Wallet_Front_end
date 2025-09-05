import {
  ArrowDownCircle,
  ArrowUpCircle,
  CreditCard,
  History,
  KeyRound,
  LayoutDashboard,
  Send,
  User,
  Wallet2,
} from "lucide-react";
import { lazy } from "react";

const AddMoney = lazy(() => import("@/pages/private/user/add_money"));
const userOverview = lazy(() => import("@/pages/private/user/overview"));
const Profile = lazy(() => import("@/pages/private/profile"));
const SendMoney = lazy(() => import("@/pages/private/user/send_money"));
const Token = lazy(() => import("@/pages/private/token"));
const Transaction = lazy(() => import("@/pages/private/Transaction"));
const Wallet = lazy(() => import("@/pages/private/Wallet"));
const Withdraw = lazy(() => import("@/pages/private/user/Withdraw"));

export const userSidebarsRoutes = [
  {
    title: "Dashboard",
    Icon: LayoutDashboard,
    url: "#",
    items: [
      {
        title: "Overview",
        url: "",
        Component: userOverview,
        Icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Features",
    url: "#",
    Icon: CreditCard,
    items: [
      {
        title: "Add Money",
        url: "/user/add-money",
        Component: AddMoney,
        Icon: ArrowDownCircle,
      },
      {
        title: "Withdraw",
        url: "/user/withdraw",
        Component: Withdraw,
        Icon: ArrowUpCircle,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        Component: SendMoney,
        Icon: Send,
      },
      {
        title: "Transaction",
        url: "/user/transaction-history",
        Component: Transaction,
        Icon: History,
      },
      {
        title: "Wallet",
        url: "/user/wallet",
        Component: Wallet,
        Icon: Wallet2,
      },
      {
        title: "Access Token",
        url: "/user/newusertoken",
        Component: Token,
        Icon: KeyRound,
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
        url: "/user/me",
        Component: Profile,
        Icon: User,
      },
    ],
  },
];

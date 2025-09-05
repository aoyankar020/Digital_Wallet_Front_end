import type { DriverStep } from "@/types";

// steps/dashboardSteps.js
export const userOverviewSteps = [
  {
    element: "#Wallet_Balance",
    popover: {
      title: "Wallet Balance 🎉",
      description: "This is your Wallet Balance.",
    },
  },
  {
    element: "#total_Transaction",
    popover: {
      title: "Total Transaction ",
      description: "This is your Total Transaction .",
    },
  },
];
export const userTransactionSteps = [
  {
    element: "#limit",
    popover: {
      title: "Limit Selection ",
      description: "You can select limit to view transaction on per page.",
    },
  },
  {
    element: "#filter",
    popover: {
      title: "Filter Section",
      description: "Filter your transaction based on type here.",
    },
  },
  {
    element: "#transactions",
    popover: {
      title: "Your transaction List",
      description: "Your Transaction List here.",
    },
  },
  {
    element: "#pagination",
    popover: {
      title: "Pagination",
      description: "Your pagination controller buttons are  here.",
    },
  },
];

export const allUserSteps: DriverStep[] = [
  ...userOverviewSteps,
  ...userTransactionSteps,
];

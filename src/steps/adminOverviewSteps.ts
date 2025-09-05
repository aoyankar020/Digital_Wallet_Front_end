import type { DriverStep } from "@/types";

export const adminOverviewSteps = [
  {
    element: "#total_user",
    popover: {
      title: "Total Users",
      description: "This is your Wallet Balance.",
    },
  },
  {
    element: "#total_agent",
    popover: {
      title: "Total Agents",
      description: "This is your Wallet Balance.",
    },
  },
  {
    element: "#total_transaction",
    popover: {
      title: "Total Transaction ",
      description: "This is your Total Transaction .",
    },
  },
];
export const adminChartSteps = [
  {
    element: "#area_chart",
    popover: {
      title: "Area Chart",
      description: "This is your area chart section.",
    },
  },
];

export const adminSteps: DriverStep[] = [
  ...adminOverviewSteps,
  ...adminChartSteps,
];

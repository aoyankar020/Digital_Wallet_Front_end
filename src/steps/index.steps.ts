import type { DriverStep } from "@/types";
import { adminSteps } from "./adminOverviewSteps";
import { agentSteps } from "./agentOverviewSteps";
import { allUserSteps } from "./userSteps";

export const roleSteps: Record<string, DriverStep[]> = {
  USER: allUserSteps,
  AGENT: agentSteps, // Agents see only overview
  ADMIN: adminSteps, // Admin sees all
};

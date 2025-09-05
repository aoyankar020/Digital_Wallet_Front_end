import { PulseLoader } from "react-spinners";
import {
  useGetTransactionsQuery,
  useGetWalletQuery,
} from "@/redux/Api/agentAuth";
import AgentTransactions from "./agentPersonalTransactionHistory";

import { useDriver } from "@/hooks/appTour";
import { useEffect } from "react";

import { useGetMeAgentQuery, useGetMeQuery } from "@/redux/Api/auth.api";
import { roleSteps } from "@/steps/index.steps";

function userOverview() {
  const { startTour } = useDriver();
  const { data: agentProfile } = useGetMeAgentQuery(undefined);
  const { data: userProfile } = useGetMeQuery(undefined);

  const { data: wallet, isLoading: walletIsloading } =
    useGetWalletQuery(undefined);
  const { data: tran, isLoading: tranIsLoading } =
    useGetTransactionsQuery(undefined);
  const loading = walletIsloading || tranIsLoading;

  const userRole = agentProfile?.data?.role || userProfile?.data?.role;
  console.log("USerRole:", userRole);
  const TOUR_KEY = `tourSeen_${userRole}`;
  const stepsForRole = roleSteps[userRole] || [];
  console.log("Step Role:", stepsForRole);

  useEffect(() => {
    if (loading) return;
    const tourDone = localStorage.getItem(TOUR_KEY);
    if (tourDone) return;

    const timer = setTimeout(() => {
      startTour(stepsForRole);
      localStorage.setItem(TOUR_KEY, "true");
    }, 100);

    return () => clearTimeout(timer);
  }, [loading, startTour]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 sweet-loading">
        <PulseLoader color={"#FF7917"} size={15} speedMultiplier={1} />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div
            id="wallet_balance"
            className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-center items-center p-6"
          >
            <h2 className="text-muted-foreground/65 font-semibold text-lg capitalize">
              Wallet Balance
            </h2>
            <span className="text-primary/80 font-bold text-5xl">
              {wallet?.data?.balance}
            </span>
          </div>
          <div
            id="total_transaction"
            className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-center items-center p-6"
          >
            <h2 className="text-muted-foreground/65 font-semibold text-lg capitalize">
              Total Transaction
            </h2>
            <span className="text-primary/80 font-bold text-5xl">
              {tran?.data.length}
            </span>
          </div>
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
          <AgentTransactions />
        </div>
      </div>
    </>
  );
}

export default userOverview;

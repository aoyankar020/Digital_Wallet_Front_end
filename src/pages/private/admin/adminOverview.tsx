import { MyChart } from "@/components/shared/my_chart";

import { useDriver } from "@/hooks/appTour";
import { useGetOverviewsQuery } from "@/redux/Api/adminApi";
import { useGetMeAgentQuery, useGetMeQuery } from "@/redux/Api/auth.api";

import { roleSteps } from "@/steps/index.steps";
import { useEffect } from "react";
import { PulseLoader } from "react-spinners";

function AdminOverview() {
  const { startTour } = useDriver();
  const { data: agentProfile } = useGetMeAgentQuery(undefined);
  const { data: userProfile } = useGetMeQuery(undefined);

  const { data: Overviews, isLoading } = useGetOverviewsQuery(undefined);
  const userRole = agentProfile?.data?.role || userProfile?.data?.role;
  console.log("USerRole:", userRole);
  const TOUR_KEY = `tourSeen_${userRole}`;
  const stepsForRole = roleSteps[userRole] || [];
  console.log("Step Role:", stepsForRole);

  useEffect(() => {
    if (isLoading) return;
    const tourDone = localStorage.getItem(TOUR_KEY);
    if (tourDone) return;

    const timer = setTimeout(() => {
      startTour(stepsForRole);
      localStorage.setItem(TOUR_KEY, "true");
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading, startTour]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 sweet-loading">
        <PulseLoader color={"#FF7917"} size={15} speedMultiplier={1} />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div
            id="total_user"
            className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-start items-start p-6"
          >
            <h2 className="text-muted-foreground/65 font-semibold text-lg capitalize">
              Total User
            </h2>
            <span className="text-primary/80 font-bold text-5xl">
              {Overviews?.data?.totalUsers}
            </span>
          </div>
          <div
            id="total_agent"
            className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-start items-start p-6"
          >
            <h2 className="text-muted-foreground/65 font-semibold text-lg capitalize">
              Total Agent
            </h2>
            <span className="text-primary/80 font-bold text-5xl">
              {Overviews?.data?.totalAgents}
            </span>
          </div>
          <div
            id="total_transaction"
            className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-start items-start p-6"
          >
            <h2 className="text-muted-foreground/65 font-semibold text-lg capitalize ">
              Total Transaction
            </h2>
            <span className="text-primary/80 font-bold text-5xl">
              {Overviews?.data?.transactionCount}
            </span>
          </div>
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
          <MyChart />
        </div>
      </div>
    </>
  );
}

export default AdminOverview;

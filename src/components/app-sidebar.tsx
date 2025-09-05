import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import Logo from "@/assets/icon/logo";

import { generateSideBar } from "@/utils/generateSidebar";
import { useGetMeAgentQuery, useGetMeQuery } from "@/redux/Api/auth.api";
import { Button } from "./ui/button";

import { roleSteps } from "@/steps/index.steps";
import { useDriver } from "@/hooks/appTour";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { startTour } = useDriver();

  const { data: userData, isLoading: userIsLoading } = useGetMeQuery(undefined);
  const { data: agentData, isLoading: agentIsLoading } =
    useGetMeAgentQuery(undefined);
  const loading = userIsLoading || agentIsLoading;
  const userRole = userData?.data?.role || agentData?.data?.role;
  const stepsForRole = roleSteps[userRole] || [];
  const TOUR_KEY = `tourSeen_${userRole}`;

  // Update steps when role changes
  React.useEffect(() => {
    if (loading) return;
    const tourDone = localStorage.getItem(TOUR_KEY);
    if (tourDone) return;

    const timer = setTimeout(() => {
      startTour(stepsForRole);
      localStorage.setItem(TOUR_KEY, "true");
    }, 100);

    return () => clearTimeout(timer);
  }, [loading, startTour]);

  // Manual trigger
  // const startTours = () => {
  //   const hasSeenTour = localStorage.getItem(TOUR_KEY);
  //   if (!hasSeenTour) {
  //     localStorage.setItem(TOUR_KEY, "true");
  //   }
  //   driverObj.drive();
  // };
  const data = {
    navMain: generateSideBar(userRole),
  };

  console.log("SIDE MENUES rOLE:", data);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link className="flex justify-start items-center gap-4" to={"/"}>
          {" "}
          <Logo />
          <span className="font-bold text-2xl text-accent-foreground">
            D-Wallet
          </span>
        </Link>
        {/* <SearchForm /> */}
        <hr />
      </SidebarHeader>
      <SidebarContent>
        <Button
          onClick={() => {
            startTour(stepsForRole, true);
          }}
        >
          Take a Tour
        </Button>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link className="flex gap-2" to={item.url}>
                        <item.Icon className="w-4 h-4 text-muted-foreground/70 " />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

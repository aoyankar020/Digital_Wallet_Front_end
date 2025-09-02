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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetMeQuery(undefined);
  const { data: agentData } = useGetMeAgentQuery(undefined);

  const data = {
    navMain: generateSideBar(userData?.data?.role || agentData?.data?.role),
  };

  console.log("SIDE MENUES DATA:", data);
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

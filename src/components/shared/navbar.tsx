import Logo from "../../assets/icon/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./them-toggler";
import { Link } from "react-router";
import { useState } from "react";

import AuthModal from "../modal/authmodal";
import {
  authApi,
  useGetMeAgentQuery,
  useGetMeQuery,
  useLogoutMutation,
} from "@/redux/Api/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/reduxHook";

import { ROLE } from "@/constant/role";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", active: true, role: "public" },
  { href: "about", label: "About", role: "public" },
  { href: "contact", label: "Contact", role: "public" },
  { href: "faq", label: "FAQ", role: "public" },
  { href: "/admin", label: "Dashboard", role: ROLE.ADMIN },
  { href: "/user", label: "Dashboard", role: ROLE.USER },
  { href: "/agent", label: "Dashboard", role: ROLE.AGENT },
];

export default function Navbar() {
  const { data: userData } = useGetMeQuery(undefined);
  const { data: agentData } = useGetMeAgentQuery(undefined);
  const user = userData?.data || agentData?.data;
  const userRole = userData?.data?.role ?? agentData?.data?.role ?? null;
  const [logout] = useLogoutMutation(undefined);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const result = await logout(undefined);
    dispatch(authApi.util.resetApiState());
    if (result?.data?.success) {
      toast.success(`${result?.data?.message}`);
    }
  };
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild className="py-1.5">
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary hover:text-primary/90">
              <Logo />
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <>
                    {link.role === "public" && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          active={link.active}
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                    {link.role === userRole && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          active={link.active}
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {user?.email && (
            <Button
              onClick={() => handleLogout()}
              variant="ghost"
              size="sm"
              className="text-sm"
            >
              Sign out
            </Button>
          )}
          {!user?.email && (
            <Button
              onClick={() => setOpen(true)}
              variant="ghost"
              size="sm"
              className="text-sm"
            >
              Sign in
            </Button>
          )}

          <AuthModal open={open} setOpen={setOpen} />
          <Button asChild size="sm" className="text-sm">
            <a href="#">Get Started</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

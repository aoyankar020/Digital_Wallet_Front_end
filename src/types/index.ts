import type { ComponentType, ReactNode } from "react";
// Them Types
export type Theme = "dark" | "light" | "system";
export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
export interface ILayoutProps {
  children: ReactNode;
}

export interface IAdminSidebar {
  title: string;
  url: string;
  Icon: ComponentType<{ className?: string }>;
  items: {
    title: string;
    url: string;
    Component: ComponentType;
    Icon: ComponentType<{ className?: string }>;
  }[];
}

// export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "AGENT";
export interface IProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  wallet: string;
  isApproved: boolean;
  isVarified: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
  isActive: string;
}

export interface CommonModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: Partial<IProfile> | null;
  onSave?: (updatedData: Partial<IProfile>) => void; // optional save callback
}

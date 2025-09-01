import type { IAdminSidebar } from "@/types";

export const generateRoutes = (menues: IAdminSidebar[]) => {
  return menues.flatMap((obj) =>
    obj.items.map((data) => ({
      path: data.url,
      Component: data.Component,
    }))
  );
};

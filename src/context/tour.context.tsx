// context/TourContext.tsx
"use client";

import React, { createContext, useContext, useMemo } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import type { DriverStep } from "@/types";

interface TourContextProps {
  startTour: (steps: DriverStep[]) => void;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const driverconfig = driver({
    showProgress: true,
    overlayClickBehavior: "nextStep",
    allowClose: false,
    animate: true,
    popoverClass: "custom-driver-popover",
  });
  const driverObj = useMemo(() => {
    return driverconfig;
  }, []);

  const startTour = (steps: DriverStep[]) => {
    if (!localStorage.getItem("tour_shown")) {
      driverObj.setSteps(steps);
      driverObj.drive();
      localStorage.setItem("tour_shown", "true");
    }
  };

  return (
    <TourContext.Provider value={{ startTour }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) throw new Error("useTour must be used within a TourProvider");
  return context;
};

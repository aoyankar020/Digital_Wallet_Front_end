import type { DriverStep } from "@/types";

import { useCallback } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const useDriver = () => {
  // Start the tour with dynamic steps
  const startTour = useCallback(
    (steps: DriverStep[], manual = false, role?: string) => {
      const TOUR_KEY = `tourSeen_${role}`;
      if (!manual) {
        const hasSeenTour = localStorage.getItem(TOUR_KEY);
        if (hasSeenTour) return;
        localStorage.setItem(TOUR_KEY, "true");
      }
      // Each tour gets its own fresh instance
      const driverInstance = driver({
        popoverClass: "driverjs-theme",
        showProgress: true,
        showButtons: ["next", "previous"],
        overlayOpacity: 0.4,
        steps, // pass the steps here directly
      });

      driverInstance.drive(); // start the tour immediately
    },
    []
  );

  return { startTour };
};

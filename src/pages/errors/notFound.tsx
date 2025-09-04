import { Button } from "@/components/ui/button";
import { Bird } from "lucide-react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { motion } from "framer-motion";
function NotFound() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <div>
          <Bird className="text-primary " size={200} />
        </div>
        <h1 className="text-4xl font-bold text-muted-foreground">Oops!</h1>
        <p className="mt-4 text-lg">
          {error.status} - {error.statusText}
        </p>
        <p className="text-gray-500">{error.data || "Something went wrong."}</p>
        <motion.div
          whileHover={{ scale: 1.1, originX: 0 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild size="sm" className="text-sm mt-8">
            <Link to={"/"}>Home</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-500">Unexpected Error</h1>
      <p className="mt-4 text-gray-500">
        {error instanceof Error ? error.message : "Unknown error occurred."}
      </p>
    </div>
  );
}

export default NotFound;

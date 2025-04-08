
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-medical-600 mb-4">404</h1>
          <p className="text-2xl text-gray-700 mb-8">Page not found</p>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <Button asChild className="medical-gradient">
            <a href="/">Return to Dashboard</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

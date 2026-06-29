import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { API_URL } from "../config/api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("ProtectedRoute mounted");

    const checkAuth = async () => {
      console.log("Checking auth...");

      const response = await fetch(`${API_URL}/api/users/me`, {
        credentials: "include",
      });

      console.log("Status:", response.status);

      if (response.ok) {
        console.log("Authenticated");
        setIsAuthenticated(true);
      } else {
        console.log("Not authenticated");
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // LOADING

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  // NOT AUTHENTICATED

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // AUTHENTICATED

  return children;
};

export default ProtectedRoute;

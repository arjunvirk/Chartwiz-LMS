import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { API_URL } from "../config/api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("ProtectedRoute mounted");

    const checkAuth = async () => {
      console.log("===== CHECK AUTH =====");

      try {
        const response = await fetch(`${API_URL}/api/users/me`, {
          credentials: "include",
        });

        console.log("Status:", response.status);

        const data = await response.json();

        console.log("Response:", data);

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log(err);

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

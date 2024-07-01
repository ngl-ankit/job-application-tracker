import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

/**
 * PrivateRoute component handles authentication checks for protected routes.
 * Renders child routes (Outlet) if the user is authenticated, otherwise redirects to /login.
 */
const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Update authenticated state based on currentUser changes
    if (currentUser) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [currentUser]);

  // Display loading indicator while checking authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login page if not authenticated
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

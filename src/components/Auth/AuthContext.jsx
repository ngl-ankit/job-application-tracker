import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase/firebase";

// Create an Auth context
const AuthContext = React.createContext();

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide authentication state and logic
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State to hold the current user
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Effect to subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Set the current user
      setLoading(false); // Set loading to false once user is fetched
    });

    // Cleanup the subscription on unmount
    return unsubscribe;
  }, []);

  // Value to be provided by the Auth context
  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only when not loading */}
    </AuthContext.Provider>
  );
};

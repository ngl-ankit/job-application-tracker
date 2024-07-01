import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./components/Auth/AuthContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ApplicationForm from "./components/Pages/ApplicationForm";
import ApplicationList from "./components/Pages/ApplicationList";
import ApplicationItem from "./components/Pages/ApplicationItem";
import Statistics from "./components/Pages/Statistics";
import JobListings from "./components/Pages/JobListings";
import Dashboard from "./components/Pages/Dashboard";

// Component to protect private routes
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/applications/new"
            element={
              <PrivateRoute>
                <ApplicationForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/applications/all"
            element={
              <PrivateRoute>
                <ApplicationList />
              </PrivateRoute>
            }
          />

          <Route
            path="/applications/:id"
            element={
              <PrivateRoute>
                <ApplicationItem />
              </PrivateRoute>
            }
          />

          <Route
            path="/statistics"
            element={
              <PrivateRoute>
                <Statistics />
              </PrivateRoute>
            }
          />

          <Route
            path="/job-listings"
            element={
              <PrivateRoute>
                <JobListings />
              </PrivateRoute>
            }
          />

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

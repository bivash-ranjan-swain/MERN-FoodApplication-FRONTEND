import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContextStore.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Still checking auth status on first load — don't redirect yet
  if (loading) {
    return <p>Loading...</p>; // swap for a spinner/skeleton if you have one
  }

  // Not logged in — send to login, remember where they were headed
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in — render the actual page
  return children;
};

export default ProtectedRoute;
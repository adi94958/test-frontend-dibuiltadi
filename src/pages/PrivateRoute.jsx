import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/atoms/Loading";

const PrivateRoute = ({ children, isAuthenticated, loading }) => {
  const location = useLocation();

  // Show loading spinner while authentication is being checked
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading size="large" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the protected component
  return children;
};

export default PrivateRoute;

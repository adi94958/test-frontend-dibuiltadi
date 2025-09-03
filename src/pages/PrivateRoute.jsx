import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, isAuthenticated }) => {
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the protected component
  return children;
};

export default PrivateRoute;

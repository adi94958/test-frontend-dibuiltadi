import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import { useDispatch } from "react-redux";
import { getProfile } from "../redux/slices/authSlice";
import Loading from "../components/atoms/Loading";

// Lazy loading untuk komponen
const Customer = lazy(() => import("./Customer"));
const DetailCustomer = lazy(() => import("./Customer/DetailCustomer"));
const Dashboard = lazy(() => import("./Summary"));
const Transaction = lazy(() => import("./Transaction"));
const DetailSummary = lazy(() => import("./Transaction/DetailSummary"));

// Auth component (Login/Register)
const Login = lazy(() => import("./Auth/Login"));
const Register = lazy(() => import("./Auth/Register"));

// Private Route component
const PrivateRoute = lazy(() => import("./PrivateRoute"));

// Navigation components
const Sidebar = lazy(() => import("../components/organisms/Sidebar"));

const Pages = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();

  const isPublicRoute =
    location.pathname === "/login" || location.pathname === "/register";

  // Fetch user profile
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated]);

  // Jika masih dalam proses loading, tampilkan spinner
  if (loading) {
    return <Loading centered={true} size="lg" />;
  }

  // Redirect ke dashboard jika pengguna sudah login dan mencoba mengakses halaman login
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Suspense fallback={<Loading centered={true} size="lg" />}>
        {/* Sidebar */}
        {isAuthenticated && !isPublicRoute && (
          <div className="fixed w-70 h-screen z-50">
            <Sidebar />
          </div>
        )}

        <div className={`flex-grow ${!isPublicRoute ? "ml-70" : ""}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Customer Routes */}
            <Route
              path="/customers"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <Customer />
                </PrivateRoute>
              }
            />
            <Route
              path="/customers/:code"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <DetailCustomer />
                </PrivateRoute>
              }
            />

            {/* Transaction Routes */}
            <Route
              path="/transactions"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <Transaction />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions/:referenceNo"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <DetailSummary />
                </PrivateRoute>
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
};

export default Pages;

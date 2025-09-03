import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/atoms/Loading";
import { Sidebar, Header } from "../components/organisms";

// Lazy loading
const Customer = lazy(() => import("./Customer"));
const DetailCustomer = lazy(() => import("./Customer/DetailCustomer"));
const Dashboard = lazy(() => import("./Summary"));
const Transaction = lazy(() => import("./Transaction"));
const DetailSummary = lazy(() => import("./Transaction/DetailTransaction"));
const Profile = lazy(() => import("./Profile"));
const Login = lazy(() => import("./Auth/Login"));
const Register = lazy(() => import("./Auth/Register"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));

const Pages = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const location = useLocation();

  const isPublicRoute =
    location.pathname === "/login" || location.pathname === "/register";

  // Redirect ke dashboard jika pengguna sudah login dan mencoba mengakses halaman login
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar dan Header */}
      {isAuthenticated && !isPublicRoute && (
        <>
          <Sidebar />
          <Header />
        </>
      )}

      {/* Main Content */}
      <div
        className={`
            min-h-screen transition-all duration-300 ease-in-out
            ${
              !isPublicRoute && isAuthenticated
                ? isCollapsed
                  ? "lg:ml-16 pt-16"
                  : "lg:ml-64 pt-16"
                : "ml-0"
            }
          `}
      >
        <Suspense fallback={<Loading centered={true} size="lg" />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes - Hapus loading prop yang bikin issue */}
            <Route
              path="/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Customer Routes */}
            <Route
              path="/customers"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Customer />
                </PrivateRoute>
              }
            />
            <Route
              path="/customers/:code"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <DetailCustomer />
                </PrivateRoute>
              }
            />

            {/* Transaction Routes */}
            <Route
              path="/transactions"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Transaction />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions/:referenceNo"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <DetailSummary />
                </PrivateRoute>
              }
            />

            {/* Profile Route */}
            <Route
              path="/profile"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default Pages;

import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/atoms/Loading";
import { getProfile } from "../redux/slices/authSlice";

// Lazy loading untuk komponen
const Customer = lazy(() => import("./Customer"));
const DetailCustomer = lazy(() => import("./Customer/DetailCustomer"));
const Dashboard = lazy(() => import("./Summary"));
const Transaction = lazy(() => import("./Transaction"));
const DetailSummary = lazy(() => import("./Transaction/DetailTransaction"));
const Profile = lazy(() => import("./Profile"));

// Auth component (Login/Register)
const Login = lazy(() => import("./Auth/Login"));
const Register = lazy(() => import("./Auth/Register"));

// Private Route component
const PrivateRoute = lazy(() => import("./PrivateRoute"));

// Navigation components
const Header = lazy(() => import("../components/organisms/Header"));
const Sidebar = lazy(() => import("../components/organisms/Sidebar"));

const Pages = () => {
  const { isAuthenticated, loading } = useAuth();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated]);

  const isPublicRoute =
    location.pathname === "/login" || location.pathname === "/register";

  // Jika masih dalam proses loading, tampilkan spinner
  if (loading) {
    return <Loading centered={true} size="lg" />;
  }

  // Redirect ke dashboard jika pengguna sudah login dan mencoba mengakses halaman login
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<Loading centered={true} size="lg" />}>
        {/* Sidebar */}
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
                  ? "lg:ml-16"
                  : "lg:ml-64"
                : "ml-0"
            }
          `}
        >
          <>
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

              {/* Profile Route */}
              <Route
                path="/profile"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    loading={loading}
                  >
                    <Profile />
                  </PrivateRoute>
                }
              />

              {/* Catch-all Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </>
        </div>
      </Suspense>
    </div>
  );
};

export default Pages;

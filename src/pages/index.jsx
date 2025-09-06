import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loading } from "../components/Elements";
import { SidebarNav, HeaderBar } from "../components/Fragments";

// Lazy loading
const Customer = lazy(() => import("./Customer"));
const DetailCustomer = lazy(() => import("./Customer/DetailCustomer"));
const AddCustomer = lazy(() => import("./Customer/addCustomer"));
const EditCustomer = lazy(() => import("./Customer/editCustomer"));
const Dashboard = lazy(() => import("./Summary"));
const Transaction = lazy(() => import("./Transaction"));
const DetailTransaction = lazy(() => import("./Transaction/detailTransaction"));
const Profile = lazy(() => import("./Profile"));
const Login = lazy(() => import("./Auth/login"));
const Register = lazy(() => import("./Auth/register"));

const Pages = () => {
  //const { isAuthenticated } = useSelector((state) => state.auth);
  const isAuthenticated = true; // Hardcoded for testing purposes
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const location = useLocation();

  const isPublicRoute =
    location.pathname === "/login" || location.pathname === "/register";

  // Redirect ke dashboard jika pengguna sudah login dan mencoba mengakses halaman login
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" replace />;
  }

  const PrivateRoute = ({ children, isAuthenticated }) => {
    const location = useLocation();

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar dan HeaderBar */}
      {isAuthenticated && !isPublicRoute && (
        <>
          <SidebarNav />
          <HeaderBar />
        </>
      )}

      {/* Main Content */}
      <div
        className={`
            min-h-screen transition-all duration-300 ease-in-out
            ${
              !isPublicRoute && isAuthenticated
                ? isCollapsed
                  ? "lg:ml-16 pt-18"
                  : "lg:ml-64 pt-18"
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
              path="/customers/detail/:code"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <DetailCustomer />
                </PrivateRoute>
              }
            />
            <Route
              path="/customers/edit/:code"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <EditCustomer />
                </PrivateRoute>
              }
            />
            <Route
              path="/customers/add"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AddCustomer />
                </PrivateRoute>
              }
            />

            {/* Transaction Routes */}
            <Route
              path="/transaction"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Transaction />
                </PrivateRoute>
              }
            />
            <Route
              path="/transaction/detail/:referenceNo"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <DetailTransaction />
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

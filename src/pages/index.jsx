import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import { useDispatch } from "react-redux";
import { getProfile } from "../redux/slices/authSlice";
import { getAllCustomers } from "../redux/slices/customerSlice";
import { CUSTOMER_FILTER_CONSTANTS } from "../constants/paginationConstants";
import Loading from "../components/atoms/Loading";

// Lazy loading untuk komponen
const Customer = lazy(() => import("./Customer"));
const DetailCustomer = lazy(() => import("./Customer/DetailCustomer"));
const Dashboard = lazy(() => import("./Summary")); // Summary sebagai Dashboard
const Transaction = lazy(() => import("./Transaction"));
const DetailSummary = lazy(() => import("./Transaction/DetailSummary"));

// Auth component (Login/Register)
const Auth = lazy(() => import("./Auth"));

// Private Route component
const PrivateRoute = lazy(() => import("./PrivateRoute"));

// Navigation components
const Sidebar = lazy(() => import("../components/organims/Sidebar"));
const NavItem = lazy(() => import("../components/molecules/NavItem"));

const Pages = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();

  const isPublicRoute =
    location.pathname === "/login" || location.pathname === "/register";

  // Fetch user profile and initial data
  useEffect(() => {
    if (isAuthenticated) {
      // Fetch user profile
      dispatch(getProfile());

      // Fetch initial customer data for dashboard
      dispatch(getAllCustomers(CUSTOMER_FILTER_CONSTANTS.DEFAULT_FILTERS));
    }
  }, [dispatch, isAuthenticated]);

  // Jika masih dalam proses loading, tampilkan spinner
  if (loading) {
    return <Loading />;
  }

  // Redirect ke dashboard jika pengguna sudah login dan mencoba mengakses halaman login
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-4">
      <Suspense fallback={<Loading />}>
        {/* Sidebar */}
        {isAuthenticated && !isPublicRoute && (
          <div className="fixed w-70 h-screen z-50">
            <Sidebar />
          </div>
        )}

        <div className={`flex-grow ${!isPublicRoute ? "ml-70" : ""}`}>
          {/* Header/Navigation */}
          {isAuthenticated && !isPublicRoute && (
            <div className="mb-6 flex gap-4 bg-white shadow-sm rounded-lg p-4">
              <NavItem to="/" label="Dashboard" />
              <NavItem to="/customers" label="Customers" />
              <NavItem to="/transactions" label="Transactions" />
            </div>
          )}

          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />

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

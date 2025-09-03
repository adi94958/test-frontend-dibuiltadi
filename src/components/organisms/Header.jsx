import { useState, useRef, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProfileAvatar } from "../molecules";
import { Text, Loading } from "../atoms";
import { useAuth } from "../../context/AuthContextProvider";
import { getProfile } from "../../redux/slices/authSlice";
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

/**
 * Header Component - Optimized with React.memo
 * 
 * Menggunakan memo() untuk:
 * 1. Mencegah re-render yang tidak perlu saat parent component re-render
 * 2. Header tidak memiliki props yang berubah-ubah
 * 3. Component ini cukup complex dengan dropdown state dan event handlers
 * 4. Optimasi performance untuk component yang sering di-render
 * 
 * memo() akan melakukan shallow comparison dan hanya re-render jika:
 * - Redux state auth berubah (user, isAuthenticated, loading)
 * - Internal state berubah (isDropdownOpen)
 */
const Header = memo(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();

  // Get user data and auth state
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // Fetch profile when component mounts and user is authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      // Always fetch fresh profile data when authenticated
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated, loading]);

  // Memoized handlers
  const handleProfileClick = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleNavigateToProfile = useCallback(() => {
    setIsDropdownOpen(false);
    navigate("/profile");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setIsDropdownOpen(false);
    logout();
  }, [logout]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show loading or don't render if no auth
  if (!isAuthenticated) {
    return null;
  }

  // Show loading state only when actually loading and no user data
  if (loading && !user) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <Text variant="caption" color="muted" className="animate-pulse">
                Loading...
              </Text>
            </div>
            <Loading size="sm" color="secondary" />
          </div>
        </div>
      </header>
    );
  }

  // Show header with user data (either from localStorage or fresh from API)
  if (!user) {
    return null; // Don't render if no user data at all
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-end">
        {/* Profile section di pojok kanan */}
        <div className="flex items-center space-x-3">
          {/* User name */}
          <div className="text-right">
            <Text variant="body" color="dark" className="font-medium">
              {user.name}
            </Text>
          </div>

          {/* Profile Avatar with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <ProfileAvatar
              profileImage={user.profileImage}
              name={user.name}
              size="md"
              onClick={handleProfileClick}
              className="ring-2 ring-transparent hover:ring-blue-200 transition-all duration-200"
            />

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                {/* Menu Items */}
                <button
                  onClick={handleNavigateToProfile}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                >
                  <UserIcon className="w-4 h-4 mr-3 text-gray-500" />
                  <Text variant="caption" color="secondary">
                    View Profile
                  </Text>
                </button>

                {/* Divider */}
                <div className="border-t border-gray-100 my-1"></div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3 text-red-500" />
                  <Text variant="caption" color="danger">
                    Log out
                  </Text>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;

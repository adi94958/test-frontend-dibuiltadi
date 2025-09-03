import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProfileAvatar } from "../molecules";
import { logout } from "../../redux/slices/authSlice";
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const Header = ({ className = "" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user data from auth state
  const { user } = useSelector((state) => state.auth);

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

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigateToProfile = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    dispatch(logout());
    navigate("/auth/login");
  };

  const handleSettings = () => {
    setIsDropdownOpen(false);
    navigate("/settings");
  };

  return (
    <header
      className={`
      bg-white shadow-sm border-b border-gray-200 
      px-4 py-3 md:px-6 md:py-4
      ${className}
    `}
    >
      <div className="flex items-center justify-end">
        {/* Profile section di pojok kanan */}
        <div className="flex items-center space-x-3">
          {/* User name */}
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {user?.name || "User"}
            </p>
          </div>

          {/* Profile Avatar with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <ProfileAvatar
              profileImage={user?.profileImage}
              name={user?.name || "User"}
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
                  View Profile
                </button>

                <button
                  onClick={handleSettings}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                >
                  <Cog6ToothIcon className="w-4 h-4 mr-3 text-gray-500" />
                  Settings
                </button>

                {/* Divider */}
                <div className="border-t border-gray-100 my-1"></div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3 text-red-500" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

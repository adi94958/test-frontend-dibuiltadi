import { useState, useRef, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "../molecules";
import { Text } from "../atoms";
import { logout } from "../../redux/slices/authSlice";
import Swal from "sweetalert2";
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Header = memo(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const isMobileMenuOpen = useSelector((state) => state.sidebar.isMobileMenuOpen);
  const handleProfileClick = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleNavigateToProfile = useCallback(() => {
    setIsDropdownOpen(false);
    navigate("/profile");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setIsDropdownOpen(false);

    // SweetAlert confirmation
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch Redux logout
        dispatch(logout());

        Swal.fire({
          title: "Logout Success",
          text: "You have been logged out successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      }
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 z-40 bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 h-16 ${
        isMobileMenuOpen 
          ? "left-64 right-0" // Ketika sidebar mobile terbuka, header bergeser ke kanan
          : "left-0 right-0"  // Normal full width
      } ${
        isCollapsed ? "lg:ml-16" : "lg:ml-64"
      }`}
    >
      <div className="flex items-center justify-between lg:justify-end h-full">
        {/* Mobile menu space - reserve space for hamburger */}
        <div className="w-12 lg:hidden"></div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right hidden md:block">
            <Text variant="body" color="dark" className="font-medium">
              {user.name}
            </Text>
          </div>

          <div className="relative" ref={dropdownRef}>
            <Avatar
              profileImage={user.profileImage}
              name={user.name}
              size="md"
              onClick={handleProfileClick}
              className="ring-2 ring-transparent hover:ring-blue-200 transition-all duration-200 cursor-pointer"
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={handleNavigateToProfile}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <UserIcon className="w-4 h-4 mr-3 text-gray-500" />
                  <Text
                    variant="caption"
                    color="secondary"
                    className="font-normal"
                  >
                    View Profile
                  </Text>
                </button>

                <div className="border-t border-gray-100 my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3 text-red-500" />
                  <Text
                    variant="caption"
                    color="danger"
                    className="font-normal"
                  >
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

export default Header;

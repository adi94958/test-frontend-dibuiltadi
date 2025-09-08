import { useState, useRef, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "../Elements";
import { Text } from "../Elements";
import { logout } from "../../redux/slices/authSlice";
import { useSidebar } from "../../hooks/useSidebar";
import Swal from "sweetalert2";
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Header = memo(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toggleSidebar, toggleMobileMenu } = useSidebar();

  const { user } = useSelector((state) => state.auth);
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const isMobileMenuOpen = useSelector(
    (state) => state.sidebar.isMobileMenuOpen
  );
  
  const handleProfileClick = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleNavigateToProfile = useCallback(() => {
    setIsDropdownOpen(false);
    navigate("/profile");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setIsDropdownOpen(false);

    
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

  const handleHamburgerClick = useCallback(() => {
    
    if (!isDesktop) {
      toggleMobileMenu();
    } else {
      
      toggleSidebar();
    }
  }, [isDesktop, toggleMobileMenu, toggleSidebar]);

  const handleOverlayClick = useCallback(() => {
    
    if (isMobileMenuOpen && !isDesktop) {
      toggleMobileMenu();
    }
  }, [isMobileMenuOpen, isDesktop, toggleMobileMenu]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 z-40 bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 h-18 left-0 right-0 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        <div className="flex items-center justify-between h-full">
          
          <div className="flex items-center">
            <button
              onClick={handleHamburgerClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-gray-900"
              title={
                isDesktop
                  ? isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  : "Open menu"
              }
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
          </div>

        
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
    

    {isMobileMenuOpen && !isDesktop && (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div
          className="absolute inset-0 bg-black/30 transition-opacity duration-200"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      </div>
    )}
    </>
  );
});

export default Header;

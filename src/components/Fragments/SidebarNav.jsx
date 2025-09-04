import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "../../hooks/useSidebar";

const Sidebar = () => {
  const {
    isCollapsed,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  } = useSidebar();

  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: HomeIcon,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: UsersIcon,
    },
    {
      name: "Transactions",
      path: "/transaction",
      icon: CreditCardIcon,
    },
  ];

  const isActiveRoute = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Sidebar content
  const SidebarContent = ({ isMobile = false }) => {
    // Di mobile, selalu gunakan expanded (tidak collapsed)
    const shouldCollapse = isMobile ? false : isCollapsed;
    
    return (
      <div
        className={`
          h-full bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out
          ${shouldCollapse ? "w-16" : "w-64"}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 h-18 flex items-center">
          <div className="flex items-center w-full relative">
            {/* Icon Admin */}
            <div className="flex-shrink-0">
              <UserCircleIcon className="w-8 h-8 text-white" />
            </div>
            
            {/* Title */}
            <h1 className={`ml-3 text-lg font-semibold text-white truncate transition-all duration-300 ease-in-out ${
              shouldCollapse 
                ? "opacity-0 w-0 overflow-hidden ml-0" 
                : "opacity-100 w-auto ml-3"
            }`}>
              Admin Panel
            </h1>
            
            {/* Mobile close button - only show on mobile when sidebar is open */}
            {isMobile && (
              <button
                onClick={toggleMobileMenu}
                className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors text-white absolute right-0"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);

              return (
                <li key={item.path} className="relative">
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`
                      group relative flex items-center h-12 px-3 rounded-lg transition-all duration-300 ease-in-out w-full
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                      ${shouldCollapse ? "justify-center" : "justify-start"}
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />

                    {!shouldCollapse && (
                      <span className="ml-3 font-medium transition-all duration-300 ease-in-out truncate">
                        {item.name}
                      </span>
                    )}

                    {/* Tooltip for collapsed state - hanya show di desktop */}
                    {shouldCollapse && !isMobile && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <div
            className={`
              flex items-center text-gray-400 text-sm transition-all duration-300 ease-in-out h-6
              ${shouldCollapse ? "justify-center" : "justify-start"}
            `}
          >
            {!shouldCollapse && <span>© AdiSaputera.</span>}
            {shouldCollapse && <span className="text-xs">©</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full z-30">
        <SidebarContent isMobile={false} />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
          lg:hidden fixed left-0 top-0 h-full z-60 transform transition-transform duration-300
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent isMobile={true} />
      </div>
    </>
  );
};

export default Sidebar;

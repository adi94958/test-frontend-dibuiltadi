import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "../../hooks/useSidebar";

const Sidebar = () => {
  const {
    isCollapsed,
    toggleSidebar,
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
      path: "/transactions",
      icon: CreditCardIcon,
    },
  ];

  const isActiveRoute = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Mobile hamburger button
  const HamburgerButton = () => (
    <button
      onClick={toggleMobileMenu}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors border border-gray-200"
    >
      <Bars3Icon className="w-6 h-6" />
    </button>
  );

  // Sidebar content
  const SidebarContent = () => (
    <div
      className={`
        h-full bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"}
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          <h1 className={`text-lg font-semibold text-white truncate transition-all duration-300 ease-in-out ${
            isCollapsed 
              ? "opacity-0 w-0 overflow-hidden" 
              : "opacity-100 w-auto"
          }`}>
            Admin Panel
          </h1>
          
          {/* Mobile close button - only show on mobile when sidebar is open */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-700 transition-colors text-white ml-auto"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          
          {/* Desktop collapse button */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out group ml-auto"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </button>
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
                    ${isCollapsed ? "justify-center" : "justify-start"}
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />

                  {!isCollapsed && (
                    <span className="ml-3 font-medium transition-all duration-300 ease-in-out truncate">
                      {item.name}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
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
            ${isCollapsed ? "justify-center" : "justify-start"}
          `}
        >
          {!isCollapsed && <span>© AdiSaputera.</span>}
          {isCollapsed && <span className="text-xs">©</span>}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <HamburgerButton />

      {/* Mobile Sidebar Overlay - Removed for full background visibility */}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full z-30">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
          lg:hidden fixed left-0 top-0 h-full z-50 transform transition-transform duration-300
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;

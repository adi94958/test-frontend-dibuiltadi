import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, label, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  );
};

export default NavItem;

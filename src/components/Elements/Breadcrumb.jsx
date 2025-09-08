import { 
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Breadcrumb = ({
  items = [],
  homeUrl = "/",
  className = "",
  size = "md",
}) => {
  
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base",
  };

  return (
    <nav 
      className={`flex items-center space-x-1 ${sizeClasses[size]} ${className}`} 
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        
        <li>
          <Link
            to={homeUrl}
            className="px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 font-medium"
          >
            Dashboard
          </Link>
        </li>

        
        {items.length > 0 && (
          <li className="flex items-center px-1">
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          </li>
        )}


        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`px-2 py-1 rounded-md ${
                    isLast
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-gray-600 font-medium"
                  }`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="px-1 flex items-center">
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

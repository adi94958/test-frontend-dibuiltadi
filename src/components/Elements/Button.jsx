const Button = ({
  children,
  icon,
  size = "md",
  variant = "solid",
  color = "primary",
  rounded = false,
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  
  const baseStyle = `
    inline-flex items-center justify-center font-medium 
    transition-all duration-200 focus:outline-none 
    disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
  `;

  
  const getSize = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "lg":
        return "px-6 py-3 text-lg";
      default:
        return "px-4 py-2 text-base"; // md
    }
  };

  
  const getColorStyle = () => {
    const colors = {
      primary: {
        solid:
          "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
        outline:
          "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 active:bg-blue-100",
      },
      secondary: {
        solid:
          "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",
        outline:
          "border-2 border-gray-600 text-gray-600 hover:bg-gray-50 hover:border-gray-700 active:bg-gray-100",
      },
      success: {
        solid:
          "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
        outline:
          "border-2 border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700 active:bg-green-100",
      },
      danger: {
        solid:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
        outline:
          "border-2 border-red-600 text-red-600 hover:bg-red-50 hover:border-red-700 active:bg-red-100",
      },
    };

    return colors[color]?.[variant] || colors.primary.solid;
  };

  
  const getBorderRadius = () => {
    return rounded ? "rounded-full" : "rounded-lg";
  };

  
  const getIconSize = () => {
    if (icon && !children) {
      switch (size) {
        case "sm":
          return "w-8 h-8"; // Small size
        case "lg":
          return "w-12 h-12"; // Large size
        default:
          return "w-10 h-10"; // Medium size
      }
    }
    return "";
  };

  
  const buttonStyle = `
    ${baseStyle}
    ${getSize()}
    ${getColorStyle()}
    ${getBorderRadius()}
    ${getIconSize()}
    ${icon && children ? "gap-2" : ""}
    ${className}
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <button
      className={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      
      {icon && <span className="flex items-center justify-center">{icon}</span>}


      {children}
    </button>
  );
};

export default Button;

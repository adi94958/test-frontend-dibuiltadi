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
  // Style dasar untuk semua button
  const baseStyle = `
    inline-flex items-center justify-center font-medium 
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
  `;

  // Ukuran button
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

  // Warna dan variant button
  const getColorStyle = () => {
    const colors = {
      primary: {
        solid:
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800",
        outline:
          "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 hover:border-blue-700 active:bg-blue-100",
      },
      secondary: {
        solid:
          "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800",
        outline:
          "border-2 border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500 hover:border-gray-700 active:bg-gray-100",
      },
      success: {
        solid:
          "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800",
        outline:
          "border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500 hover:border-green-700 active:bg-green-100",
      },
      danger: {
        solid:
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800",
        outline:
          "border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500 hover:border-red-700 active:bg-red-100",
      },
    };

    return colors[color]?.[variant] || colors.primary.solid;
  };

  // Border radius
  const getBorderRadius = () => {
    return rounded ? "rounded-full" : "rounded-lg";
  };

  // Gabungkan semua style
  const buttonStyle = `
    ${baseStyle}
    ${getSize()}
    ${getColorStyle()}
    ${getBorderRadius()}
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
      {/* Render icon jika ada */}
      {icon && <span className="flex items-center justify-center">{icon}</span>}

      {/* Render text/children */}
      {children}
    </button>
  );
};

export default Button;

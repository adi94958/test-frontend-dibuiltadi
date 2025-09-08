const Loading = ({
  size = "md",
  className = "",
  color = "primary",
  centered = false,
}) => {
  
  const getSizeStyle = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4 border-2"; // Small - 16px
      case "lg":
        return "w-12 h-12 border-4"; // Large - 48px
      default:
        return "w-8 h-8 border-4"; // Medium - 32px
    }
  };

  
  const getColorStyle = () => {
    const colors = {
      primary: "border-blue-600 border-t-transparent",
      secondary: "border-gray-600 border-t-transparent",
      success: "border-green-600 border-t-transparent",
      danger: "border-red-600 border-t-transparent",
      white: "border-white border-t-transparent",
    };

    return colors[color] || colors.primary;
  };

  
  const spinnerStyle = `
    inline-block rounded-full animate-spin
    ${getSizeStyle()}
    ${getColorStyle()}
    ${className}
  `
    .replace(/\s+/g, " ")
    .trim();


  if (centered) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={spinnerStyle}></div>
      </div>
    );
  }

  return <div className={spinnerStyle}></div>;
};

export default Loading;

const Text = ({
  variant = "body",
  color = "default",
  children,
  className = "",
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "heading":
        return "text-xl sm:text-2xl lg:text-3xl font-bold leading-tight";
      case "subheading":
        return "text-base sm:text-lg lg:text-xl font-semibold leading-snug";
      case "title":
        return "text-sm sm:text-base lg:text-lg font-medium leading-normal";
      case "body":
        return "text-sm sm:text-base font-normal leading-relaxed";
      case "caption":
        return "text-xs sm:text-sm font-light leading-normal";
      default:
        return "text-sm sm:text-base font-normal leading-relaxed";
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return "text-blue-500";
      case "secondary":
        return "text-gray-600";
      case "success":
        return "text-green-500";
      case "danger":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "muted":
        return "text-gray-400";
      case "dark":
        return "text-gray-900";
      case "light":
        return "text-gray-100";
      case "white":
        return "text-white";
      default:
        switch (variant) {
          case "heading":
          case "subheading":
            return "text-gray-900";
          case "body":
            return "text-gray-700";
          case "caption":
            return "text-gray-600";
          default:
            return "text-gray-700";
        }
    }
  };

  const getResponsiveClasses = () => {
    return "break-words overflow-wrap-anywhere";
  };

  const textClasses = `
    ${getVariantClasses()}
    ${getResponsiveClasses()}
    ${className}
    ${getColorClasses()}
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <p className={textClasses} {...props}>
      {children}
    </p>
  );
};

export default Text;

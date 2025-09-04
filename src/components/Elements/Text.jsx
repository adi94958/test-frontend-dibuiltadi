const Text = ({
  variant = "body",
  color = "default",
  children,
  className = "",
  ...props
}) => {
  // Variant untuk ukuran dan font weight
  const getVariantClasses = () => {
    switch (variant) {
      case "heading":
        return "text-3xl font-bold";
      case "subheading":
        return "text-xl font-semibold";
      case "title":
        return "text-lg font-normal";
      case "body":
        return "text-base font-normal";
      case "caption":
        return "text-sm font-light";
      default:
        return "text-base font-normal";
    }
  };

  // Warna untuk text
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
        // Default color berdasarkan variant
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

  // Gabungkan semua classes - pastikan color tidak di-override
  const textClasses = `
    ${getVariantClasses()}
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

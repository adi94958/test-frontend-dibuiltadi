const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  
  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-sm",
    xl: "px-4 py-2 text-base",
  };

  
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-600",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-700",
    dark: "bg-gray-800 text-white",
    light: "bg-white text-gray-800 border border-gray-200",
  };

  
  const outlineVariants = {
    default: "border border-gray-300 text-gray-700 bg-transparent",
    primary: "border border-blue-300 text-blue-700 bg-transparent",
    secondary: "border border-gray-300 text-gray-600 bg-transparent",
    success: "border border-green-300 text-green-700 bg-transparent",
    warning: "border border-yellow-300 text-yellow-700 bg-transparent",
    danger: "border border-red-300 text-red-700 bg-transparent",
    info: "border border-blue-300 text-blue-600 bg-transparent",
    dark: "border border-gray-600 text-gray-700 bg-transparent",
  };

  
  const baseClasses = "inline-flex items-center font-medium rounded-full transition-colors duration-200";

  
  const isOutline = variant.startsWith("outline-");
  const baseVariant = isOutline ? variant.replace("outline-", "") : variant;


  const badgeClasses = [
    baseClasses,
    sizeClasses[size],
    isOutline ? outlineVariants[baseVariant] : variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

export default Badge;

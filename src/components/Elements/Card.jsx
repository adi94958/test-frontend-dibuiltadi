import Text from "./Text";
import Divider from "./Divider";

const Card = ({
  children,
  heading,
  variant = "solid",
  padding = "default",
  rounded = "default",
  className = "",
  onClick,
  ...props
}) => {
  // Base styles yang selalu ada
  const baseStyles = "transition-all duration-200";

  // Variant styles
  const variantStyles = {
    solid: "bg-white border border-gray-100 shadow-sm",
    outline: "bg-transparent border border-gray-300",
  };

  // Padding options
  const paddingStyles = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  // Rounded options
  const roundedStyles = {
    none: "",
    sm: "rounded-md",
    default: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
  };

  // Kombinasi semua styles
  const cardClasses = [
    baseStyles,
    variantStyles[variant],
    roundedStyles[rounded],
    onClick ? "cursor-pointer" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {heading && (
        <>
          <div className={paddingStyles[padding]}>
            <Text variant="subheading" color="dark">
              {heading}
            </Text>
          </div>

          <Divider thickness="1px" />
        </>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
    </div>
  );
};

export default Card;

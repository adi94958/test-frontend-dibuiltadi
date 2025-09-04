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
    solid: "bg-white border border-gray-100 shadow-lg",
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

  // Get padding value untuk divider margin
  const paddingValue = {
    none: "0px",
    sm: "1rem", // 16px
    default: "1.5rem", // 24px
    lg: "2rem", // 32px
    xl: "2.5rem", // 40px
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
    paddingStyles[padding],
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
          <div className="mb-4">
            <Text variant="heading" color="dark">
              {heading}
            </Text>
          </div>
          <div
            className="mb-4"
            style={{
              marginLeft: `-${paddingValue[padding]}`,
              marginRight: `-${paddingValue[padding]}`,
            }}
          >
            <Divider thickness="1px" />
          </div>
        </>
      )}
      {children}
    </div>
  );
};

export default Card;

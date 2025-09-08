const Divider = ({
  orientation = "horizontal",
  className = "",
  thickness = "1px",
  color = "bg-gray-300",
}) => {
  const baseClasses = "border-none";

  const orientationClasses =
    orientation === "horizontal" ? "w-full" : "h-full inline-block";

  const thicknessStyle =
    orientation === "horizontal" ? { height: thickness } : { width: thickness };

  const dividerClasses = [baseClasses, orientationClasses, color, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={dividerClasses} style={thicknessStyle} role="separator" />
  );
};

export default Divider;

const Divider = ({
  orientation = "horizontal",
  className = "",
  thickness = "1px",
  color = "bg-gray-300",
}) => {
  // Base classes
  const baseClasses = "border-none";
  
  // Orientation classes
  const orientationClasses = orientation === "horizontal" 
    ? "w-full" 
    : "h-full inline-block";

  // Style untuk thickness menggunakan inline style
  const thicknessStyle = orientation === "horizontal" 
    ? { height: thickness }
    : { width: thickness };

  // Gabungkan semua classes
  const dividerClasses = [
    baseClasses,
    orientationClasses,
    color,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div 
      className={dividerClasses} 
      style={thicknessStyle}
      role="separator" 
    />
  );
};

export default Divider;

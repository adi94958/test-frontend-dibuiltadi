import { useState, memo } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Text from "./Text";

function TextInput({
  name,
  label,
  type = "text",
  value = "",
  onChange,
  onBlur,
  error,
  touched,
  className = "",
  labelType = "inside", // "inside" | "outside" | "placeholder"
  placeholder = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const hasError = !!(touched && error);
  const hasValue = !!value?.length;
  const shouldFloatLabel = isFocused || hasValue;

  const getLabelColor = () => {
    if (hasError) return "danger";
    if (isFocused) return "primary";
    return "muted";
  };

  const getPadding = () => {
    if (labelType === "inside") return "px-4 pt-6 pb-2";
    return "px-4 py-2.5"; // same for outside and placeholder
  };

  const getInputStyles = () => {
    const padding = getPadding();
    const baseStyles =
      "w-full border-2 rounded-xl outline-none transition-colors duration-150 bg-gray-50/50";
    const stateStyles = hasError
      ? "border-red-400 focus:border-red-500 focus:bg-red-50/30"
      : "border-gray-200 focus:border-blue-500 focus:bg-blue-50/30 hover:bg-gray-50";

    return `${baseStyles} ${padding} ${stateStyles}`;
  };

  const showPlaceholder = labelType !== "inside";
  const hasMarginBottom = labelType !== "placeholder";

  return (
    <div className={`${hasMarginBottom ? "mb-4" : ""} ${className}`}>
      {/* Outside label */}
      {labelType === "outside" && label && (
        <Text
          variant="caption"
          color={getLabelColor()}
          className="block font-medium mb-2"
        >
          {label}
        </Text>
      )}

      <div className="relative">
        <input
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          type={type === "password" && showPassword ? "text" : type}
          className={getInputStyles()}
          placeholder={showPlaceholder ? placeholder : ""}
          {...props}
        />

        {/* Floating label for inside variant */}
        {labelType === "inside" && label && (
          <Text
            variant="body"
            color={getLabelColor()}
            className={`absolute left-4 transition-all duration-150 pointer-events-none font-medium ${
              shouldFloatLabel ? "top-2 text-xs" : "top-1/2 -translate-y-1/2"
            }`}
          >
            {label}
          </Text>
        )}

        {/* Password toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <Text variant="caption" color="danger" className="block mt-2 ml-4">
          {error}
        </Text>
      )}
    </div>
  );
}

export default memo(TextInput);

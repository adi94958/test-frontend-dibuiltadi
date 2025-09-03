import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Text from "../atoms/Text";

const TextInput = ({
  name,
  label,
  type = "text",
  value = "",
  onChange,
  onBlur,
  error,
  touched,
  options = [],
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const hasError = touched && error;
  const hasValue = value && value.length > 0;
  const shouldFloatLabel = isFocused || hasValue;

  const getInputStyle = () => {
    const baseStyle =
      "w-full px-4 pt-6 pb-2 border-2 rounded-xl outline-none transition-colors duration-150 bg-gray-50/50";

    if (hasError) {
      return `${baseStyle} border-red-400 focus:border-red-500 focus:bg-red-50/30`;
    }

    return `${baseStyle} border-gray-200 focus:border-blue-500 focus:bg-blue-50/30 hover:bg-gray-50`;
  };

  const getLabelColor = () => {
    if (hasError) return "danger";
    if (isFocused) return "primary";
    return "muted";
  };

  // Handle focus dan blur
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  // Render untuk select
  if (type === "select") {
    return (
      <div className={`mb-4 ${className}`}>
        <div className="relative">
          <select
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${getInputStyle()} appearance-none bg-white cursor-pointer`}
            {...props}
          >
            <option value="">Pilih {label}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Icon dropdown */}
          <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

          {/* Label yang mengambang */}
          <Text
            variant="caption"
            color={getLabelColor()}
            className={`
              absolute left-4 transition-all duration-150 pointer-events-none font-medium
              ${shouldFloatLabel ? "top-2 text-xs" : "top-1/2 -translate-y-1/2"}
            `}
          >
            {label}
          </Text>
        </div>

        {/* Pesan error */}
        {hasError && <p className="text-red-500 mt-2 ml-4 text-sm">{error}</p>}
      </div>
    );
  }

  // Render untuk input biasa
  return (
    <div className={`mb-4 ${className}`}>
      <div className="relative">
        <input
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type={type === "password" && showPassword ? "text" : type}
          className={getInputStyle()}
          {...props}
        />

        {/* Label yang mengambang */}
        <Text
          variant="body"
          color={getLabelColor()}
          className={`
              absolute left-4 transition-all duration-150 pointer-events-none font-medium
              ${shouldFloatLabel ? "top-2 text-xs" : "top-1/2 -translate-y-1/2"}
            `}
        >
          {label}
        </Text>

        {/* Icon show/hide password */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Pesan error */}
      {hasError && <p className="text-red-500 mt-2 ml-4 text-sm">{error}</p>}
    </div>
  );
};

export default TextInput;

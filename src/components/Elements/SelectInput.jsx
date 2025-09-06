import { useState, memo } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Text from "./Text";

function SelectInput({
  id,
  name,
  label,
  value = "",
  onChange,
  onBlur,
  error,
  touched,
  options = [], // [{ value, label }]
  className = "",
  labelType = "outside", // "outside" | "none"
  placeholder = "",
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const hasError = !!(touched && error);

  const getLabelColor = () =>
    hasError ? "danger" : isFocused ? "primary" : "muted";

  const getPadding = () => {
    if (labelType === "none") return "px-4 py-0"; // Remove padding for flex centering
    return "px-4 py-2.5"; // Default for outside label
  };

  const getFlexStyles = () => {
    if (labelType === "none") return "flex items-center h-14"; // Center content and set height to match pt-6 pb-2
    return "";
  };

  const base =
    `w-full ${getPadding()} ${getFlexStyles()} border-2 rounded-xl outline-none transition-colors duration-150 bg-gray-50/50 appearance-none bg-white cursor-pointer ` +
    (hasError
      ? "border-red-400 focus:border-red-500 focus:bg-red-50/30"
      : "border-gray-200 focus:border-blue-500 focus:bg-blue-50/30 hover:bg-gray-50");

  return (
    <div className={`mb-4 ${className}`}>
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
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            setIsOpen(false);
            onBlur?.(e);
          }}
          onMouseDown={() => setIsOpen(!isOpen)}
          className={base}
          {...props}
        >
          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}

          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* caret icon */}
        <ChevronDownIcon 
          className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`} 
        />
      </div>

      {hasError && <p className="text-red-500 mt-2 ml-4 text-sm">{error}</p>}
    </div>
  );
}

export default memo(SelectInput);

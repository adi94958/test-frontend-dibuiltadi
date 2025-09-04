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
  labelType = "inside", // "inside" | "outside"
  placeholder = "",
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const hasError = !!(touched && error);
  const hasValue = value !== "" && value !== null && value !== undefined;
  const shouldFloatLabel = isFocused || hasValue;

  const getLabelColor = () =>
    hasError ? "danger" : isFocused ? "primary" : "muted";

  const padding = labelType === "inside" ? "px-4 pt-6 pb-2" : "px-4 py-2.5";
  const base =
    `w-full ${padding} border-2 rounded-xl outline-none transition-colors duration-150 bg-gray-50/50 appearance-none bg-white cursor-pointer ` +
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
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={base}
          {...props}
        >
          {(labelType === "outside" && placeholder) ||
          labelType === "inside" ? (
            <option value="">
              {labelType === "outside" ? placeholder : `Select ${label}`}
            </option>
          ) : null}

          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* caret icon */}
        <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

        {/* Floating label */}
        {labelType === "inside" && label && (
          <Text
            variant="caption"
            color={getLabelColor()}
            className={`absolute left-4 transition-all duration-150 pointer-events-none font-medium ${
              shouldFloatLabel ? "top-2 text-xs" : "top-1/2 -translate-y-1/2"
            }`}
          >
            {label}
          </Text>
        )}
      </div>

      {hasError && <p className="text-red-500 mt-2 ml-4 text-sm">{error}</p>}
    </div>
  );
}

export default memo(SelectInput);

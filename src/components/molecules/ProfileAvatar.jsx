import { useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";

const ProfileAvatar = ({
  profileImage,
  name,
  size = "md",
  className = "",
  onClick = null,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Size configurations - lebih sederhana
  const sizes = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20",
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
    "2xl": "w-10 h-10",
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // Base classes
  const baseClasses = `
    ${sizes[size]} 
    rounded-full 
    object-cover 
    border-2 border-gray-200
    ${
      onClick
        ? "cursor-pointer hover:border-gray-300 transition-all duration-200"
        : ""
    }
    ${className}
  `;

  // Jika tidak ada gambar atau error, tampilkan fallback
  if (!profileImage || imageError) {
    return (
      <div
        className={`
          ${sizes[size]} 
          rounded-full 
          bg-gradient-to-br from-blue-400 to-blue-600 
          flex items-center justify-center
          border-2 border-gray-200
          ${
            onClick
              ? "cursor-pointer hover:border-gray-300 transition-all duration-200"
              : ""
          }
          ${className}
        `}
        onClick={onClick}
        title={name || "Profile"}
      >
        <UserIcon className={`${iconSizes[size]} text-white`} />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Loading placeholder */}
      {imageLoading && (
        <div
          className={`
          ${sizes[size]} 
          rounded-full 
          bg-gray-200 
          animate-pulse 
          flex items-center justify-center
          border-2 border-gray-200
        `}
        >
          <UserIcon className={`${iconSizes[size]} text-gray-400`} />
        </div>
      )}

      {/* Actual image */}
      <img
        src={profileImage}
        alt={name || "Profile"}
        className={`
          ${baseClasses}
          ${imageLoading ? "absolute inset-0 opacity-0" : "opacity-100"}
        `}
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={onClick}
        title={name || "Profile"}
      />
    </div>
  );
};

export default ProfileAvatar;

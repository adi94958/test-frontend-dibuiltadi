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

  if (!profileImage || imageError) {
    return (
      <div
        className={`
          ${sizes[size]} 
          rounded-full 
          bg-gradient-to-br from-blue-400 to-blue-600 
          flex items-center justify-center
          border-2 border-gray-200
          ${onClick ? "cursor-pointer hover:border-gray-300" : ""}
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
    <img
      src={profileImage}
      alt={name || "Profile"}
      className={`
        ${sizes[size]} 
        rounded-full 
        object-cover 
        border-2 border-gray-200
        ${onClick ? "cursor-pointer hover:border-gray-300" : ""}
        ${className}
      `}
      onError={() => setImageError(true)}
      onClick={onClick}
      title={name || "Profile"}
    />
  );
};

export default ProfileAvatar;

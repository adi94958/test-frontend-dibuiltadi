import { Header } from "../../components/organisms";
import { Avatar } from "../../components/molecules";
import { Button } from "../../components/molecules";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../redux/slices/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleChangePhoto = () => {
    console.log("Change profile photo");
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Avatar */}
              <div className="relative">
                <Avatar
                  profileImage={user?.profileImage}
                  name={user?.name || "User"}
                  size="2xl"
                />
                <button
                  onClick={handleChangePhoto}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                >
                  <CameraIcon className="w-4 h-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user?.name || "User"}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {user?.roleName || "Role"} • {user?.code || "Code"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Role Code: {user?.roleCode || "-"}
                  </p>
                </div>

                {/* Bio/Description */}
                <div className="mt-4">
                  <p className="text-gray-700">
                    {user?.email
                      ? `Contact: ${user.email}`
                      : "No additional information available."}
                    {user?.phone && ` | Phone: ${user.phone}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <p className="text-gray-900">{user?.name || "-"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900">{user?.email || "-"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <p className="text-gray-900">{user?.phone || "-"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Code
                </label>
                <p className="text-gray-900">{user?.code || "-"}</p>
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Role & Access Information
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Name
                </label>
                <p className="text-gray-900">{user?.roleName || "-"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Code
                </label>
                <p className="text-gray-900">{user?.roleCode || "-"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Access Level
                </label>
                <p className="text-gray-900">
                  {user?.roleCode === "ADM"
                    ? "Administrator"
                    : user?.roleCode === "USR"
                    ? "User"
                    : user?.roleName || "Standard User"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Account Settings
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-center">
                Change Password
              </Button>
              <Button variant="outline" className="justify-center">
                Privacy Settings
              </Button>
              <Button variant="outline" className="justify-center">
                Notification Settings
              </Button>
              <Button
                variant="outline"
                className="justify-center text-red-600 border-red-200 hover:bg-red-50"
              >
                Deactivate Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

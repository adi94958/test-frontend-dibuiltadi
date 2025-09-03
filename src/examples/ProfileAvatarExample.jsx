import { ProfileAvatar } from "../components/molecules";

function ProfileAvatarExample() {
  // Contoh data user
  const user = {
    name: "John Doe",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  };

  const userWithoutImage = {
    name: "Jane Smith",
    profileImage: null,
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Profile Avatar Examples</h2>

      {/* Basic Usage */}
      <div>
        <h3 className="text-lg font-medium mb-4">Basic Usage</h3>
        <div className="flex items-center space-x-4">
          <ProfileAvatar profileImage={user.profileImage} name={user.name} />
          <span>Default size (md)</span>
        </div>
      </div>

      {/* Different Sizes */}
      <div>
        <h3 className="text-lg font-medium mb-4">Different Sizes</h3>
        <div className="flex items-center space-x-4">
          <ProfileAvatar
            profileImage={user.profileImage}
            name={user.name}
            size="xs"
          />
          <ProfileAvatar
            profileImage={user.profileImage}
            name={user.name}
            size="sm"
          />
          <ProfileAvatar
            profileImage={user.profileImage}
            name={user.name}
            size="md"
          />
          <ProfileAvatar
            profileImage={user.profileImage}
            name={user.name}
            size="lg"
          />
          <ProfileAvatar
            profileImage={user.profileImage}
            name={user.name}
            size="xl"
          />
          <ProfileAvatar
            profileImage={user.profileImage}
            name={user.name}
            size="2xl"
          />
        </div>
      </div>

      {/* No Image (Fallback) */}
      <div>
        <h3 className="text-lg font-medium mb-4">No Image - Fallback Icon</h3>
        <div className="flex items-center space-x-4">
          <ProfileAvatar
            profileImage={userWithoutImage.profileImage}
            name={userWithoutImage.name}
          />
          <span>User tanpa foto profile</span>
        </div>
      </div>

      {/* Clickable */}
      <div>
        <h3 className="text-lg font-medium mb-4">Clickable Profile</h3>
        <div className="flex items-center space-x-4">
          <ProfileAvatar
            profileImage={user.profileImage}
            name={user.name}
            onClick={() => alert(`Clicked on ${user.name}'s profile`)}
          />
          <span>Click untuk melihat profile</span>
        </div>
      </div>

      {/* Header Navigation Example */}
      <div>
        <h3 className="text-lg font-medium mb-4">Header Navigation</h3>
        <div className="bg-white border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                Welcome, {user.name}
              </span>
              <ProfileAvatar
                profileImage={user.profileImage}
                name={user.name}
                size="sm"
                onClick={() => console.log("Open user menu")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* User List Example */}
      <div>
        <h3 className="text-lg font-medium mb-4">User List</h3>
        <div className="bg-white border rounded-lg">
          {[
            {
              name: "John Doe",
              profileImage: user.profileImage,
              status: "Online",
            },
            { name: "Jane Smith", profileImage: null, status: "Offline" },
            {
              name: "Bob Wilson",
              profileImage:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
              status: "Away",
            },
          ].map((person, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <ProfileAvatar
                  profileImage={person.profileImage}
                  name={person.name}
                />
                <div>
                  <p className="font-medium">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.status}</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileAvatarExample;

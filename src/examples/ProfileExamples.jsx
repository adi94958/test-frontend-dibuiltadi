import { Profile } from "../molecules";

const ProfileExamples = () => {
  const sampleProfileImage =
    "https://sandbox.dibuiltadi.com/storage/assets/images/user-profiles/13.jpg";
  const sampleName = "John Doe";

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Profile Component Examples</h2>

        {/* Different Sizes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <Profile profileImage={sampleProfileImage} size="xs" />
              <p className="text-xs mt-1">xs</p>
            </div>
            <div className="text-center">
              <Profile profileImage={sampleProfileImage} size="sm" />
              <p className="text-xs mt-1">sm</p>
            </div>
            <div className="text-center">
              <Profile profileImage={sampleProfileImage} size="md" />
              <p className="text-xs mt-1">md</p>
            </div>
            <div className="text-center">
              <Profile profileImage={sampleProfileImage} size="lg" />
              <p className="text-xs mt-1">lg</p>
            </div>
            <div className="text-center">
              <Profile profileImage={sampleProfileImage} size="xl" />
              <p className="text-xs mt-1">xl</p>
            </div>
            <div className="text-center">
              <Profile profileImage={sampleProfileImage} size="2xl" />
              <p className="text-xs mt-1">2xl</p>
            </div>
          </div>
        </div>

        {/* With Name */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">With Name</h3>
          <div className="space-y-4">
            <Profile
              profileImage={sampleProfileImage}
              name={sampleName}
              size="md"
              showName={true}
            />
            <Profile
              profileImage={sampleProfileImage}
              name={sampleName}
              size="lg"
              showName={true}
            />
          </div>
        </div>

        {/* Clickable */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Clickable Profile</h3>
          <Profile
            profileImage={sampleProfileImage}
            name={sampleName}
            size="lg"
            showName={true}
            onClick={() => alert("Profile clicked!")}
          />
        </div>

        {/* Fallback (No Image) */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Fallback (No Image)</h3>
          <div className="flex items-center space-x-4">
            <Profile name="No Image User" size="md" />
            <Profile name="No Image User" size="lg" showName={true} />
          </div>
        </div>

        {/* Different Scenarios */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Real Usage Examples</h3>

          {/* Header Profile */}
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Header Profile</h4>
              <Profile
                profileImage={sampleProfileImage}
                name={sampleName}
                size="sm"
                showName={true}
                onClick={() => console.log("Open user menu")}
              />
            </div>
          </div>

          {/* User Card */}
          <div className="bg-white p-6 rounded-lg shadow mb-4">
            <div className="text-center">
              <Profile
                profileImage={sampleProfileImage}
                name={sampleName}
                size="2xl"
                className="justify-center"
              />
              <h4 className="mt-4 text-xl font-semibold">{sampleName}</h4>
              <p className="text-gray-600">Software Developer</p>
            </div>
          </div>

          {/* Comment/Message Item */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex space-x-3">
              <Profile profileImage={sampleProfileImage} size="md" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h5 className="font-medium">{sampleName}</h5>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <p className="text-gray-700 mt-1">
                  This is a sample comment or message with a profile picture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileExamples;

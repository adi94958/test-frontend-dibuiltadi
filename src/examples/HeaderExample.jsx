import { useState } from "react";
import { Header } from "../components/organisms";

function HeaderExample() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Mock navigation function
  const handleNavigation = (page) => {
    setCurrentPage(page);
    console.log(`Navigating to ${page}`);
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case "profile":
        return "User Profile";
      case "settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Example */}
      <Header title={getPageTitle()} showNotifications={true} />

      {/* Content Area */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            Header Organism Component
          </h2>

          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">
                🎯 Fitur Header Component:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-900">
                    ✨ Visual Features:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Profile avatar dengan dropdown menu</li>
                    <li>Notifikasi dengan badge indicator</li>
                    <li>Responsive design (mobile & desktop)</li>
                    <li>Smooth animations dan hover effects</li>
                    <li>User info tersembunyi di mobile</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-blue-900">
                    ⚡ Functionality:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Click profile avatar untuk dropdown</li>
                    <li>Auto close ketika click di luar</li>
                    <li>Navigate ke halaman Profile</li>
                    <li>Logout dengan Redux dispatch</li>
                    <li>Settings page navigation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">🔗 Dropdown Menu Items:</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm">👤</span>
                    </div>
                    <div>
                      <p className="font-medium">View Profile</p>
                      <p className="text-sm text-gray-500">
                        Navigasi ke halaman /profile
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 text-sm">⚙️</span>
                    </div>
                    <div>
                      <p className="font-medium">Settings</p>
                      <p className="text-sm text-gray-500">
                        Navigasi ke halaman /settings
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-600 text-sm">🚪</span>
                    </div>
                    <div>
                      <p className="font-medium text-red-600">Log out</p>
                      <p className="text-sm text-gray-500">
                        Dispatch logout() dan redirect ke /auth/login
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">🚀 Try it:</h4>
              <p className="text-blue-800 text-sm mb-3">
                Click pada profile avatar di header atas untuk melihat dropdown
                menu dengan opsi Profile dan Log out.
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleNavigation("dashboard")}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === "dashboard"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-blue-200"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavigation("profile")}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === "profile"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-blue-200"
                  }`}
                >
                  Profile Page
                </button>
                <button
                  onClick={() => handleNavigation("settings")}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === "settings"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-blue-200"
                  }`}
                >
                  Settings Page
                </button>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">
                ✅ Implementation:
              </h4>
              <pre className="text-sm text-green-800 bg-green-100 p-3 rounded overflow-x-auto">
                {`// Import Header
import { Header } from '../components/organisms';

// Usage
<Header 
  title="Dashboard" 
  showNotifications={true}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderExample;

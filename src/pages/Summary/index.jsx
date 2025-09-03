const SummaryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-blue-600">1,234</p>
              <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Total Revenue
              </h3>
              <p className="text-3xl font-bold text-green-600">$45,678</p>
              <p className="text-sm text-gray-500 mt-1">+8% from last month</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Orders</h3>
              <p className="text-3xl font-bold text-purple-600">856</p>
              <p className="text-sm text-gray-500 mt-1">+15% from last month</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Growth</h3>
              <p className="text-3xl font-bold text-orange-600">23%</p>
              <p className="text-sm text-gray-500 mt-1">+3% from last month</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500">
                Dashboard content will be implemented here...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;

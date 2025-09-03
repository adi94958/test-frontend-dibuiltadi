import { Header } from "../../components/organisms";

const CustomerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Customer Management</h2>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Customer List
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500">
                Customer management features will be implemented here...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;

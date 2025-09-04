import { MainLayout } from "../../components/Layouts";
import { Card, Text, Avatar, Button, Badge } from "../../components/Elements";
import { useParams } from "react-router-dom";

const CustomerDetailPage = () => {
  const { code } = useParams();

  const breadcrumbItems = [
    { label: "Customer Management", href: "/customers" },
    { label: `Customer ${code}` }
  ];

  // Dummy customer data
  const customerData = {
    code: code,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    joinDate: "2024-01-15",
    status: "Active",
    totalTransactions: 25,
    totalSpent: "Rp 15,250,000"
  };

  return (
    <MainLayout 
      title={`Customer Detail - ${customerData.name}`} 
      breadcrumbItems={breadcrumbItems}
    >
      <div className="space-y-6">
        {/* Customer Profile Card */}
        <Card variant="outline" heading="Customer Profile">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar 
              name={customerData.name} 
              size="2xl"
            />
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text variant="caption" color="gray" className="font-medium">Customer Code</Text>
                  <Text variant="body" color="dark">{customerData.code}</Text>
                </div>
                <div>
                  <Text variant="caption" color="gray" className="font-medium">Status</Text>
                  <Badge variant="success" size="sm">
                    {customerData.status}
                  </Badge>
                </div>
                <div>
                  <Text variant="caption" color="gray" className="font-medium">Email</Text>
                  <Text variant="body" color="dark">{customerData.email}</Text>
                </div>
                <div>
                  <Text variant="caption" color="gray" className="font-medium">Phone</Text>
                  <Text variant="body" color="dark">{customerData.phone}</Text>
                </div>
                <div className="md:col-span-2">
                  <Text variant="caption" color="gray" className="font-medium">Address</Text>
                  <Text variant="body" color="dark">{customerData.address}</Text>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Customer Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="outline" heading="Join Date">
            <Text variant="title" color="dark" className="font-bold">
              {new Date(customerData.joinDate).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </Card>

          <Card variant="outline" heading="Total Transactions">
            <Text variant="title" color="dark" className="font-bold">
              {customerData.totalTransactions}
            </Text>
          </Card>

          <Card variant="outline" heading="Total Spent">
            <Text variant="title" color="dark" className="font-bold text-green-600">
              {customerData.totalSpent}
            </Text>
          </Card>
        </div>

        {/* Actions */}
        <Card variant="outline" heading="Actions">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">
              Edit Customer
            </Button>
            <Button variant="outline">
              View Transactions
            </Button>
            <Button variant="outline">
              Send Message
            </Button>
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
              Deactivate Customer
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CustomerDetailPage;

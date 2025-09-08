import { Text, Badge } from "../../../components/Elements";
import { DataTable } from "../../../components/Fragments";
import { formatCurrency } from "../../../utils/formatHelpers";

const TopCustomersTable = ({ data, loading }) => {
  const columns = [
    {
      key: "rank",
      title: "Rank",
      width: "80px",
      render: (value, row, index) => (
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {index + 1}
        </div>
      ),
    },
    {
      key: "customerCode",
      title: "Customer Code",
      width: "150px",
      render: (value, row) => (
        <Text variant="body" className="font-medium text-blue-600">
          {row.customer.code}
        </Text>
      ),
    },
    {
      key: "customerName",
      title: "Customer Name",
      render: (value, row) => (
        <Text variant="body" className="font-medium">
          {row.customer.name}
        </Text>
      ),
    },
    {
      key: "companyType",
      title: "Type",
      width: "120px",
      render: (value, row) => (
        <Badge
          variant={
            row.customer.companyType === "company" ? "success" : "primary"
          }
          size="sm"
        >
          {row.customer.companyType === "company" ? "Company" : "Person"}
        </Badge>
      ),
    },
    {
      key: "amount",
      title: "Total Amount",
      width: "200px",
      render: (value, row) => (
        <Text variant="body" className="font-bold text-green-600">
          {formatCurrency(row.amount)}
        </Text>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data || []}
      loading={loading}
      emptyMessage="No customers data found"
      showPagination={false}
    />
  );
};

export default TopCustomersTable;

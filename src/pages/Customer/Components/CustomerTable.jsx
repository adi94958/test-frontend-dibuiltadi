import { Button, Text } from "../../../components/Elements";
import { DataTable } from "../../../components/Fragments";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formatHelpers";

const CustomerTable = ({
  customers,
  loading,
  pagination,
  onPageChange,
  onPerPageChange,
}) => {
  const navigate = useNavigate();

  const columns = [
    {
      key: "code",
      title: "Code",
      width: "15%",
      render: (value) => (
        <Text variant="body" color="primary">
          {value}
        </Text>
      ),
    },
    {
      key: "name",
      title: "Name",
      width: "25%",
      render: (value) => <Text variant="body">{value || "-"}</Text>,
    },
    {
      key: "city",
      title: "City",
      width: "20%",
      render: (value) => <Text variant="caption">{value || "-"}</Text>,
    },
    {
      key: "province",
      title: "Province",
      width: "20%",
      render: (value) => <Text variant="caption">{value || "-"}</Text>,
    },
    {
      key: "createdAt",
      title: "Created At",
      width: "12%",
      render: (value) => <Text variant="caption">{formatDate(value)}</Text>,
    },
    {
      key: "actions",
      title: "Actions",
      width: "8%",
      render: (value, row) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            color="primary"
            icon={<EyeIcon className="w-4 h-4" />}
            onClick={() => navigate(`/customers/detail/${row.code}`)}
          />
          <Button
            variant="outline"
            size="sm"
            color="success"
            icon={<PencilIcon className="w-4 h-4" />}
            onClick={() => navigate(`/customers/edit/${row.code}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={customers}
      loading={loading}
      emptyMessage="No customers found. Try adjusting your filters."
      pagination={pagination}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      showPagination={true}
    />
  );
};

export default CustomerTable;

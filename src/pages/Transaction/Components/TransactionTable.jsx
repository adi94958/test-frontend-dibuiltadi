import React from "react";
import { Button, Text } from "../../../components/Elements";
import { DataTable } from "../../../components/Fragments";
import { formatCurrency, formatDate } from "../../../utils/formatHelpers";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const TransactionTable = ({ transactions, loading, pagination, onPageChange, onPerPageChange }) => {
  const navigate = useNavigate();

  const columns = [
    {
      key: "referenceNo",
      title: "Reference No",
      width: "15%",
      render: (value) => (
        <Text variant="body" color="primary">
          {value}
        </Text>
      ),
    },
    {
      key: "customer",
      title: "Customer",
      width: "25%",
      render: (customer) => (
        <div>
          <Text variant="body">{customer?.name || "-"}</Text>
          <Text variant="caption">{customer?.code || "-"}</Text>
        </div>
      ),
    },
    {
      key: "sales",
      title: "Sales",
      width: "15%",
      render: (value) => <Text variant="caption">{value}</Text>,
    },
    {
      key: "amountTotal",
      title: "Amount Total",
      width: "15%",
      render: (value) => <Text variant="body">{formatCurrency(value)}</Text>,
    },
    {
      key: "dateOrder",
      title: "Order Date",
      width: "12%",
      render: (value) => <Text variant="caption">{formatDate(value)}</Text>,
    },
    {
      key: "dateDue",
      title: "Due Date",
      width: "12%",
      render: (value) => <Text variant="caption">{formatDate(value)}</Text>,
    },
    {
      key: "action",
      title: "Action",
      width: "6%",
      render: (value, row) => (
        <Button
          variant="outline"
          size="sm"
          color="primary"
          icon={<EyeIcon className="w-4 h-4" />}
          onClick={() => navigate(`/transaction/detail/${row.referenceNo}`)}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={transactions}
      loading={loading}
      emptyMessage="No transactions found. Try adjusting your filters."
      pagination={pagination}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      showPagination={true}
    />
  );
};

export default TransactionTable;

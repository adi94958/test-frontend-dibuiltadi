import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactionDetail,
  clearTransactionDetail,
  clearError,
} from "../../redux/slices/transactionSlice";
import { MainLayout } from "../../components/Layouts";
import {
  Card,
  Text,
  Button,
  Loading,
  Divider,
} from "../../components/Elements";
import { DataTable } from "../../components/Fragments";
import {
  formatCurrency,
  formatDate,
  formatNumber,
} from "../../utils/formatHelpers";

const DetailTransactionPage = () => {
  const { referenceNo } = useParams();
  const dispatch = useDispatch();

  const { transactionDetail, loading, error } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    if (referenceNo) {
      dispatch(getTransactionDetail(referenceNo));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearTransactionDetail());
      dispatch(clearError());
    };
  }, [dispatch, referenceNo]);

  // Table columns for items
  const itemColumns = [
    {
      key: "productName",
      title: "Product Name",
      width: "30%",
      render: (value) => <Text variant="body">{value}</Text>,
    },
    {
      key: "quantity",
      title: "Quantity",
      width: "10%",
      render: (value) => <Text variant="body">{formatNumber(value)}</Text>,
    },
    {
      key: "price",
      title: "Price",
      width: "15%",
      render: (value) => <Text variant="body">{formatCurrency(value)}</Text>,
    },
    {
      key: "discount",
      title: "Discount",
      width: "10%",
      render: (value) => <Text variant="body">{formatNumber(value)}%</Text>,
    },
    {
      key: "priceSubtotal",
      title: "Subtotal",
      width: "15%",
      render: (value) => <Text variant="body">{formatCurrency(value)}</Text>,
    },
    {
      key: "marginSubtotal",
      title: "Margin",
      width: "15%",
      render: (value) => <Text variant="body">{formatNumber(value)}%</Text>,
    },
  ];

  const breadcrumbItems = [
    { label: "Transaction Management", href: "/transaction" },
    { label: "Detail Transaction", href: `/transaction/detail/${referenceNo}` },
  ];

  if (loading) {
    return (
      <MainLayout title="Transaction Detail" breadcrumbItems={breadcrumbItems}>
        <div className="flex items-center justify-center py-12">
          <Loading size="md" />
          <Text variant="body" className="ml-3">
            Loading transaction detail...
          </Text>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Transaction Detail" breadcrumbItems={breadcrumbItems}>
        <Card variant="outline" className="p-6">
          <Text variant="subheading" color="danger" className="mb-4">
            Error Loading Transaction Detail
          </Text>
          <Text variant="body" color="secondary" className="mb-4">
            {typeof error === "string"
              ? error
              : "Failed to load transaction detail"}
          </Text>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => dispatch(getTransactionDetail(referenceNo))}
            >
              Retry
            </Button>
          </div>
        </Card>
      </MainLayout>
    );
  }

  if (!transactionDetail) {
    return (
      <MainLayout title="Transaction Detail" breadcrumbItems={breadcrumbItems}>
        <Card variant="outline" className="p-6">
          <Text variant="subheading" className="mb-4">
            Transaction Not Found
          </Text>
          <Text variant="body" color="secondary" className="mb-4">
            The transaction with reference number "{referenceNo}" could not be
            found.
          </Text>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Transaction Detail" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Header Information */}
        <Card variant="outline" className="p-6">
          <div className="mb-6">
            <div>
              <Text variant="subheading" className="mb-2">
                Transaction #{transactionDetail.referenceNo}
              </Text>
              <Text variant="caption" color="secondary">
                Created on {formatDate(transactionDetail.createdAt)}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Customer Information */}
            <div>
              <Text
                variant="caption"
                color="secondary"
                className="mb-2 uppercase font-semibold"
              >
                Customer
              </Text>
              <Text variant="body" className="mb-1">
                {transactionDetail.customer?.name || "-"}
              </Text>
              <Text variant="caption" color="secondary">
                Code: {transactionDetail.customer?.code || "-"}
              </Text>
            </div>

            {/* Sales Information */}
            <div>
              <Text
                variant="caption"
                color="secondary"
                className="mb-2 uppercase font-semibold"
              >
                Sales Representative
              </Text>
              <Text variant="body">{transactionDetail.sales || "-"}</Text>
            </div>

            {/* Order Date */}
            <div>
              <Text
                variant="caption"
                color="secondary"
                className="mb-2 uppercase font-semibold"
              >
                Order Date
              </Text>
              <Text variant="body">
                {formatDate(transactionDetail.dateOrder)}
              </Text>
            </div>

            {/* Due Date */}
            <div>
              <Text
                variant="caption"
                color="secondary"
                className="mb-2 uppercase font-semibold"
              >
                Due Date
              </Text>
              <Text variant="body">
                {formatDate(transactionDetail.dateDue)}
              </Text>
            </div>

            {/* Paid Date */}
            <div>
              <Text
                variant="caption"
                color="secondary"
                className="mb-2 uppercase font-semibold"
              >
                Paid Date
              </Text>
              <Text variant="body">
                {transactionDetail.paidAt
                  ? formatDate(transactionDetail.paidAt)
                  : "Not paid yet"}
              </Text>
            </div>
          </div>
        </Card>

        {/* Items List */}
        <Card variant="outline" className="p-6">
          <Text variant="subheading" className="mb-4">
            Order Items
          </Text>

          <DataTable
            columns={itemColumns}
            data={transactionDetail.items || []}
            loading={false}
            emptyMessage="No items found"
            showPagination={false}
          />
        </Card>

        {/* Summary */}
        <Card variant="outline" className="p-6">
          <Text variant="subheading" className="mb-4">
            Order Summary
          </Text>

          <div className="space-y-3 max-w-md ml-auto">
            <div className="flex justify-between">
              <Text variant="body" color="secondary">
                Amount Untaxed:
              </Text>
              <Text variant="body">
                {formatCurrency(transactionDetail.amountUntaxed)}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text variant="body" color="secondary">
                Amount Due:
              </Text>
              <Text variant="body">
                {formatCurrency(transactionDetail.amountDue)}
              </Text>
            </div>
            <Divider />
            <div className="flex justify-between">
              <Text variant="body" className="font-semibold">
                Total Amount:
              </Text>
              <Text variant="body" className="font-semibold text-lg">
                {formatCurrency(transactionDetail.amountTotal)}
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DetailTransactionPage;

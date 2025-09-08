import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "../../components/Layouts";
import {
  Card,
  Text,
  Divider,
  Loading,
  Button,
} from "../../components/Elements";
import {
  getCustomerDetail,
  clearCustomerDetail,
  clearError,
} from "../../redux/slices/customerSlice";
import { formatDate } from "../../utils/formatHelpers";

const DetailCustomerPage = () => {
  const { code } = useParams();
  const dispatch = useDispatch();
  const { customerDetail, loading, error } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    if (code) {
      dispatch(getCustomerDetail(code));
    }
    return () => {
      dispatch(clearCustomerDetail());
    };
  }, [dispatch, code]);

  const breadcrumbItems = [
    { label: "Customer Management", href: "/customers" },
    { label: `Detail Customer`, href: `/customer/detail/${code}` },
  ];

  if (loading) {
    return (
      <MainLayout title="Customer Detail" breadcrumbItems={breadcrumbItems}>
        <div className="flex items-center justify-center py-12">
          <Loading size="md" />
          <Text variant="body" className="ml-3">
            Loading customer detail...
          </Text>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Customer Detail" breadcrumbItems={breadcrumbItems}>
        <div className="flex items-center justify-center py-12">
          <Text variant="body" color="danger">
            {typeof error === "string" ? error : "Something went wrong"}
          </Text>
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(clearError())}
            className="ml-4"
          >
            Dismiss
          </Button>
        </div>
      </MainLayout>
    );
  }

  if (!customerDetail) {
    return (
      <MainLayout title="Customer Detail" breadcrumbItems={breadcrumbItems}>
        <div className="flex items-center justify-center py-12">
          <Text variant="body">No customer data found.</Text>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Customer Detail" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <Card variant="outline" className="p-6">
          <div className="mb-6">
            <Text variant="subheading" className="mb-2">
              Customer #{customerDetail.code}
            </Text>
            <Text variant="caption" color="secondary">
              Created on {formatDate(customerDetail.createdAt)}
            </Text>
          </div>
          <Divider />

          {/* Informasi Utama */}
          <div className="mt-6">
            <Text
              variant="caption"
              color="secondary"
              className="uppercase font-semibold mb-2 block"
            >
              Main Information
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text variant="caption" color="secondary">
                  Name
                </Text>
                <Text variant="body">{customerDetail.name || "-"}</Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  Type
                </Text>
                <Text variant="body">{customerDetail.type || "-"}</Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  Company Type
                </Text>
                <Text variant="body">{customerDetail.companyType || "-"}</Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  Identity No
                </Text>
                <Text variant="body">{customerDetail.identityNo || "-"}</Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  NPWP
                </Text>
                <Text variant="body">{customerDetail.npwp || "-"}</Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  Group
                </Text>
                <Text variant="body">{customerDetail.group.name || "-"}</Text>
              </div>
            </div>
          </div>

          <Divider className="my-6" />

          {/* Kontak */}
          <div>
            <Text
              variant="caption"
              color="secondary"
              className="uppercase font-semibold mb-2 block"
            >
              Contact
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text variant="caption" color="secondary">
                  Email
                </Text>
                <Text variant="body">{customerDetail.email || "-"}</Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  Phone
                </Text>
                <Text variant="body">{customerDetail.phone || "-"}</Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  Mobile Phone
                </Text>
                <Text variant="body">{customerDetail.mobilePhone || "-"}</Text>
              </div>
            </div>
          </div>

          <Divider className="my-6" />

          {/* Alamat */}
          <div>
            <Text
              variant="caption"
              color="secondary"
              className="uppercase font-semibold mb-2 block"
            >
              Address
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text variant="caption" color="secondary">
                  Area
                </Text>
                <Text variant="body">{customerDetail.area || "-"}</Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  Province
                </Text>
                <Text variant="body">
                  {customerDetail.province?.name || "-"}
                </Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  City
                </Text>
                <Text variant="body">{customerDetail.city?.name || "-"}</Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  Address
                </Text>
                <Text variant="body">{customerDetail.address || "-"}</Text>
              </div>
            </div>
          </div>

          <Divider className="my-6" />

          {/* Status & Target */}
          <div>
            <Text
              variant="caption"
              color="secondary"
              className="uppercase font-semibold mb-2 block"
            >
              Status & Target
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text variant="caption" color="secondary">
                  Status
                </Text>
                <Text variant="body">{customerDetail.status || "-"}</Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  Target
                </Text>
                <Text variant="body">{customerDetail.target || "-"}</Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  Achievement
                </Text>
                <Text variant="body">{customerDetail.achievement || "-"}</Text>
              </div>
              <div>
                <Text variant="caption" color="secondary">
                  Percentage
                </Text>
                <Text variant="body">{customerDetail.percentage || "-"}</Text>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DetailCustomerPage;

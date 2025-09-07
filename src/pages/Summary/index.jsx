import {
  Button,
  Card,
  SelectInput,
  Text,
  TextInput,
} from "../../components/Elements";
import { MainLayout } from "../../components/Layouts";
import { formatCurrency } from "../../utils/formatHelpers";

const SummaryPage = () => {
  const breadcrumbItems = [];

  return (
    <MainLayout
      title="Dashboard Overview"
      caption="Transaction Summary"
      breadcrumbItems={breadcrumbItems}
    >
      <div className="space-y-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <Card variant="solid">
            <Text variant="subheading" className="text-gray-900 mb-2">
              Daily Total
            </Text>
            <Text variant="heading" className="truncate">
              {formatCurrency("10000000000000")}
            </Text>
            <Text variant="body" color="secondary" className="mt-1">
              +1% from last day
            </Text>
          </Card>
          <Card variant="solid">
            <Text variant="subheading" className="mb-2">
              Monthly Total
            </Text>
            <Text variant="heading" color="primary" className="truncate">
              {formatCurrency("10000000000000")}
            </Text>
            <Text variant="body" color="secondary" className="mt-1">
              +1% from last month
            </Text>
          </Card>
          <Card variant="solid">
            <Text variant="subheading" className="mb-2">
              Yearly Total
            </Text>
            <Text
              variant="heading"
              color="danger"
              className="font-bold truncate"
            >
              {formatCurrency("10000000000000")}
            </Text>
            <Text variant="body" color="secondary" className="mt-1">
              +1% from last day
            </Text>
          </Card>
          <Card variant="solid">
            <Text variant="subheading" className="mb-2">
              YoY Growth
            </Text>
            <Text
              variant="heading"
              color="success"
              className="font-bold text-blue-600 truncate"
            >
              120%
            </Text>
            <Text variant="body" color="secondary" className="mt-1">
              +1% from last day
            </Text>
          </Card>
        </div>

        {/* Grafik Chart */}
        <Card variant="solid" heading="Daily Transactions">
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            <TextInput type="date" label="Start date" labelType="outside" />
            <TextInput type="date" label="End date" labelType="outside" />
            <Button variant="solid" className="mt-3">
              Reset
            </Button>
          </div>
          <div>
            <Text variant="body" color="secondary">
              Disini berupa grafik chart
            </Text>
          </div>
        </Card>
        <Card variant="solid" heading="Monthly Transactions">
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            <TextInput type="month" label="Start month" labelType="outside" />
            <TextInput type="month" label="End month" labelType="outside" />
            <Button variant="solid" className="mt-3">
              Reset
            </Button>
          </div>
          <Text variant="body" color="secondary">
            Disini berupa grafik chart
          </Text>
        </Card>
        <Card variant="solid" heading="Yearly Transactions">
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            <TextInput type="year" label="Start year" labelType="outside" />
            <TextInput type="year" label="End year" labelType="outside" />
            <Button variant="solid" className="mt-3">
              Reset
            </Button>
          </div>
          <Text variant="body" color="secondary">
            Disini berupa grafik chart
          </Text>
        </Card>
        <Card variant="solid" heading="Top Customers">
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            <TextInput type="month" label="Start date" labelType="outside" />
            <TextInput type="month" label="End date" labelType="outside" />
            <SelectInput
              id="limit"
              name="limit"
              label="Limit"
              labelType="outside"
              options={[
                { value: "", label: "All" },
                { value: "5", label: "5" },
                { value: "10", label: "10" },
                { value: "20", label: "20" },
              ]}
              className="sm:w-24"
            />
            <Button variant="solid" className="mt-3">
              Reset
            </Button>
          </div>
          <Text variant="body" color="secondary">
            Disini berupa grafik chart
          </Text>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SummaryPage;

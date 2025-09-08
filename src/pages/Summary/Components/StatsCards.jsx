import { Card, Text } from "../../../components/Elements";
import { formatCurrency } from "../../../utils/formatHelpers";

const StatsCards = ({ statsCards }) => {
  const cards = [
    {
      title: "Daily Total",
      value: formatCurrency(statsCards.daily.total),
      growth: statsCards.daily.dateRange || "No date range selected",
      growthColor: "secondary",
      valueColor: "default",
    },
    {
      title: "Monthly Total",
      value: formatCurrency(statsCards.monthly.total),
      growth: statsCards.monthly.monthlyPeriod || "No period selected",
      growthColor: "secondary",
      valueColor: "primary",
    },
    {
      title: "Yearly Total",
      value: formatCurrency(statsCards.yearly.total),
      growth: statsCards.yearly.selectedYear || "No year selected",
      growthColor: "secondary",
      valueColor: "success",
      valueClass: "font-bold",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} variant="solid">
          <Text variant="subheading" className="text-gray-900 mb-2">
            {card.title}
          </Text>
          <Text
            variant="heading"
            color={card.valueColor}
            className={`truncate ${card.valueClass || ""}`}
          >
            {card.value}
          </Text>
          <Text variant="body" color={card.growthColor} className="mt-1">
            {card.growth}
          </Text>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;

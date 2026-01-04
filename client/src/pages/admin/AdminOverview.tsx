import OrdersChart from "@/components/charts/OrdersChart";
import OrdersStatusPieChart from "@/components/charts/OrdersStatusPieChart";
import ProductsChart from "@/components/charts/ProductsChart";
import OverviewCard from "@/components/dashboards/admin/OverviewCard";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { MdInventory, MdPeople, MdShoppingCart, MdStore } from "react-icons/md";

const overviewCards = [
  {
    label: "Total Users",
    value: 1240,
    icon: MdPeople,
  },
  {
    label: "Total Vendors",
    value: 1240,
    icon: MdStore,
  },
  {
    label: "Total Products",
    value: 1240,
    icon: MdInventory,
  },
  {
    label: "Total Orders",
    value: 1240,
    icon: MdShoppingCart,
  },
];

export default function AdminOverview() {
  return (
    <>
      <Heading fontWeight={700} mb={4} fontSize="3xl">
        Dashboard Overview
      </Heading>
      <SimpleGrid gap={4} mb={4} columns={{ base: 1, md: 2, lg: 4 }}>
        {overviewCards.map((v) => (
          <OverviewCard {...v} />
        ))}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
        <OrdersStatusPieChart />
        <ProductsChart />
      </SimpleGrid>
      <OrdersChart />
    </>
  );
}

import OrdersCounts from "@/components/dashboards/vendor/OrdersCounts";
import RecentOrdersTable from "@/components/dashboards/vendor/RecentOrdersTable";
import VendorStats from "@/components/dashboards/vendor/VendorStats";

export default function VendorOverview() {
  return (
    <>
      <VendorStats />
      <RecentOrdersTable />
      <OrdersCounts />
    </>
  );
}

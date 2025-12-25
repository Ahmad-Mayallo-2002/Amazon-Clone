import { vendorDashboardLinks } from "@/assets/assets";
import Sidebar from "@/components/dashboards/sidebars/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function VendorDashboard() {
  return (
    <Flex gap={4} p={4}>
      <Sidebar links={vendorDashboardLinks} />
      <Box className="content panel" flexGrow={1}>
        <Outlet />
      </Box>
    </Flex>
  );
}

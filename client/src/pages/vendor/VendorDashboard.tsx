import { vendorDashboardLinks } from "@/assets/assets";
import AuthFooter from "@/components/common/authCenter/AuthFooter";
import AuthHeader from "@/components/common/authCenter/AuthHeader";
import Sidebar from "@/components/dashboards/sidebars/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function VendorDashboard() {
  return (
    <>
      <AuthHeader />
      <Flex gap={4} p={4}>
        <Sidebar links={vendorDashboardLinks} />
        <Box className="content panel" flexGrow={1}>
          <Outlet />
        </Box>
      </Flex>
      <AuthFooter />
    </>
  );
}

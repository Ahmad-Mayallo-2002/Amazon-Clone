import UserSidebar from "@/components/dashboards/sidebars/UserSidebar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function UserDashboard() {
  return (
    <Flex p={4} gap={4}>
      <UserSidebar />
      <Box className="content panel" flexGrow={1}>
        <Outlet />
      </Box>
    </Flex>
  );
}

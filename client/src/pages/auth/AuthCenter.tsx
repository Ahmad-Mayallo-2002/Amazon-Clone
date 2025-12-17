import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import AuthHeader from "@/components/common/authCenter/AuthHeader";
import AuthFooter from "@/components/common/authCenter/AuthFooter";

export default function AuthCenter() {
  return (
    <>
      <Box bgColor="#fff" minH="100vh">
        <AuthHeader />
        <Outlet />
        <AuthFooter />
      </Box>
    </>
  );
}

import type { DashboardLinks } from "@/assets/assets";
import { removeCookie } from "@/utils/payloadCookie";
import { Box, Button, Heading, Icon, Link, List, Span } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ links }: { links: DashboardLinks[] }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie("payload");
    navigate("/auth/login");
  };
  return (
    <Box
      w={{ base: "fit", lg: "300px" }}
      as="aside"
      className="user-sidebar panel"
    >
      <Heading
        as="h2"
        writingMode={{ base: "vertical-rl", lg: "horizontal-tb" }}
        fontWeight={700}
        m={{ base: "0 auto 16px", lg: "0 0 16px" }}
        fontSize="3xl"
      >
        My Profile
      </Heading>
      <List.Root>
        {links.map((link) => (
          <List.Item mb={4} asChild key={link.label}>
            <Link
              bgColor={pathname === link.href ? "orange" : "transparent"}
              rounded={6}
              display="flex"
              justifyContent={{ base: "center", lg: "start" }}
              p={2}
              color={pathname === link.href ? "#fff" : "initial"}
              _hover={{ color: "#fff", bgColor: "orange" }}
              href={link.href}
              transition="background 300ms ease, color 300ms ease"
            >
              <Icon size="lg" as={link.icon} me={{ base: 0, lg: 1.5 }} />
              <Span display={{ base: "none", lg: "inline" }}>{link.label}</Span>
            </Link>
          </List.Item>
        ))}
      </List.Root>
      <Button onClick={handleLogout} colorPalette="red" rounded={6} w="full">
        <MdLogout />
        <Span display={{ base: "none", lg: "inline" }}>Logout</Span>
      </Button>
    </Box>
  );
}

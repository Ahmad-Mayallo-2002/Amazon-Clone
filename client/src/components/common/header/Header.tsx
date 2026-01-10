import { Box, Container, Flex, Image, Link, VStack } from "@chakra-ui/react";
import logo from "@/assets/images/logo.png";
import CountryList from "./CountryList";
import SearchBox from "./SearchBox";
import AccountList from "./AccountList";
import Cart from "./Cart";
import OrderAndReturn from "./OrderAndReturn";
import MobileHeaderActions from "./MobileHeaderActions";
import { getPayload, removeCookie } from "@/utils/payloadCookie";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const payload = getPayload();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie("payload");
    navigate("/auth/login");
  };
  return (
    <>
      <Box as="header" py={3} bgColor="var(--color-neutral-900)">
        <Container>
          <Flex gap={3} alignItems="center">
            <Link href="/">
              <Image w="45px" src={logo} />
            </Link>
            <CountryList />
            <SearchBox />
            <Box display={{ base: "none", lg: "flex" }}>
              <OrderAndReturn />
            </Box>

            <Box display={{ base: "none", lg: "flex" }}>
              {payload ? (
                <VStack gap={0} alignItems="flex-start">
                  <button
                    onClick={handleLogout}
                    style={{ color: "#fff", fontSize: "13px" }}
                  >
                    Logout
                  </button>
                  <Link
                    color="#fff"
                    href="/user-dashboard"
                    _hover={{ textDecor: "underline" }}
                    fontWeight={700}
                  >
                    Profile
                  </Link>
                </VStack>
              ) : (
                <AccountList />
              )}
            </Box>

            <Box display={{ base: "none", lg: "flex" }}>
              <Cart />
            </Box>

            <MobileHeaderActions />
          </Flex>
        </Container>
      </Box>
    </>
  );
}

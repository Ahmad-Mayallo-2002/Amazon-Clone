import { Box, Container, Flex, Image, Link, VStack } from "@chakra-ui/react";
import logo from "@/assets/images/logo.png";
import CountryList from "./CountryList";
import SearchBox from "./SearchBox";
import AccountList from "./AccountList";
import Cart from "./Cart";
import OrderAndReturn from "./OrderAndReturn";
import MobileHeaderActions from "./MobileHeaderActions";
import { getPayload, removeCookie } from "@/utils/payloadCookie";

export default function Header() {
  const payload = getPayload();
  const handleRemovePayload = () => removeCookie("payload");
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
                  <Link
                    color="#fff"
                    href="/"
                    onClick={handleRemovePayload}
                    _hover={{ textDecor: "underline" }}
                    fontSize="sm"
                  >
                    Logout
                  </Link>
                  <Link
                    color="#fff"
                    href="/profile"
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

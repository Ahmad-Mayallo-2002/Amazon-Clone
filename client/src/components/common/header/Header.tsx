import { Box, Container, Flex, Image, Link } from "@chakra-ui/react";
import logo from "@/assets/images/logo.png";
import CountryList from "./CountryList";
import SearchBox from "./SearchBox";
import AccountList from "./AccountList";
import Cart from "./Cart";
import OrderAndReturn from "./OrderAndReturn";
import MobileHeaderActions from "./MobileHeaderActions";

export default function Header() {
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
              <AccountList />
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

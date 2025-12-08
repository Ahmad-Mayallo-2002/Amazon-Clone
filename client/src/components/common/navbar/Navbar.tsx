import { Box, Container, Link, List } from "@chakra-ui/react";

export default function Navbar() {
  const { Root, Item } = List;
  return (
    <>
      <Box as="nav" color="#fff" py={3} bgColor="var(--color-neutral-800)">
        <Container>
          <Root flexDir="row" gapX={4}>
            <Item asChild>
              <Link
                color="#fff"
                _hover={{ textDecor: "underline" }}
                href="/products"
              >
                All
              </Link>
            </Item>
            <Item asChild>
              <Link
                href="/contact"
                color="#fff"
                _hover={{ textDecor: "underline" }}
              >
                Customer Service
              </Link>
            </Item>
            <Item asChild>
              <Link
                href="/about"
                color="#fff"
                _hover={{ textDecor: "underline" }}
              >
                About
              </Link>
            </Item>
          </Root>
        </Container>
      </Box>
    </>
  );
}

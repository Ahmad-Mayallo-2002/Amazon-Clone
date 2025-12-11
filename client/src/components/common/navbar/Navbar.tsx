import { Box, Container, Link, List } from "@chakra-ui/react";
import { navLinks } from "../../../assets/data/navItems";

export default function Navbar() {
  const { Root, Item } = List;
  return (
    <>
      <Box as="nav" color="#fff" py={3} bgColor="var(--color-neutral-800)">
        <Container>
          <Root flexDir="row" gapX={4}>
            {navLinks.map((link) => (
              <Item asChild key={link.label}>
                <Link
                  color="#fff"
                  _hover={{ textDecor: "underline" }}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </Item>
            ))}
          </Root>
        </Container>
      </Box>
    </>
  );
}

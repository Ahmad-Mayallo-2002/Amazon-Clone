import { userAccountLinks, userListLinks } from "@/assets/assets";
import {
  Button,
  GridItem,
  Heading,
  Link,
  List,
  Popover,
  Portal,
  Separator,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function MobileHeaderActions() {
  const { Root, Trigger, Arrow, Body, Content, Positioner } = Popover;
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Trigger display={{ base: "flex", lg: "none" }} asChild>
          <Button size="sm" colorPalette="yellow">
            <FaBars />
          </Button>
        </Trigger>

        <Portal>
          <Positioner>
            <Content>
              <Arrow />
              <Body p={4}>
                <Button colorPalette="yellow" w="full">
                  Sign In
                </Button>{" "}
                <Text mt={3} textAlign="center" fontSize="xs">
                  New Customer ?{" "}
                  <Link
                    href="/sign-up"
                    color="blue.700"
                    _hover={{ color: "blue.600" }}
                  >
                    Start Here
                  </Link>
                </Text>
                <Separator my={3} w="calc(100% + 32px)" ms={-4} />
                <SimpleGrid columns={2} gap={4}>
                  <GridItem>
                    <Heading fontSize="md" fontWeight={700} color="gray.800">
                      Your List
                    </Heading>
                    <List.Root>
                      {userListLinks.map((item) => (
                        <List.Item key={item.href} asChild>
                          <Link
                            _hover={{
                              color: "orange",
                              textDecor: "underline",
                            }}
                            href={item.href}
                          >
                            {item.label}
                          </Link>
                        </List.Item>
                      ))}
                    </List.Root>
                  </GridItem>
                  <GridItem>
                    <Heading fontSize="md" fontWeight={700} color="gray.800">
                      Your Account
                    </Heading>
                    <List.Root>
                      {userAccountLinks.map((item) => (
                        <List.Item key={item.href} asChild>
                          <Link
                            _hover={{
                              color: "orange",
                              textDecor: "underline",
                            }}
                            href={item.href}
                          >
                            {item.label}
                          </Link>
                        </List.Item>
                      ))}
                    </List.Root>
                  </GridItem>
                </SimpleGrid>
                <Separator my={3} w="calc(100% + 32px)" ms={-4} />
                <Link
                  href="/orders"
                  _hover={{
                    color: "orange",
                    textDecor: "underline",
                  }}
                >
                  Orders
                </Link>
              </Body>
            </Content>
          </Positioner>
        </Portal>
      </Root>
    </>
  );
}

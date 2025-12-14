import { userAccountLinks, userListLinks } from "@/assets/data/navItems";
import {
  Button,
  GridItem,
  Heading,
  Icon,
  Link,
  List,
  Popover,
  Portal,
  Separator,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa";

export default function AccountList() {
  const { Root, Trigger, Positioner, Content, Arrow, Body } = Popover;
  return (
    <>
      <div className="account-list">
        <Root>
          <Trigger cursor="pointer" asChild>
            <button>
              <Text as="small" color="#fff">
                Hello, Sign in
              </Text>
              <Heading
                mt={-1}
                color="#fff"
                fontWeight={700}
                fontSize="sm"
                as="h5"
              >
                Account &amp; Lists{" "}
                <Icon fontSize="sm">
                  <FaAngleDown />
                </Icon>
              </Heading>
            </button>
          </Trigger>
          <Portal>
            <Positioner>
              <Content>
                <Arrow />
                <Body p={4}>
                  <Button asChild className="main-button" w="full">
                    <Link href="auth/login">Login</Link>
                  </Button>
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
                </Body>
              </Content>
            </Positioner>
          </Portal>
        </Root>
      </div>
    </>
  );
}

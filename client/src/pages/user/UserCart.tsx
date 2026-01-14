import CartItemCard from "@/components/dashboards/user/CartItemCard";
import MainSpinner from "@/components/ui/MainSpinner";
import { useFetch } from "@/hooks/useFetch";
import type { Cart } from "@/interfaces/cart";
import type { CustomError, Response } from "@/interfaces/responses";
import { getPayload } from "@/utils/payloadCookie";
import {
  Box,
  Button,
  Center,
  Heading,
  Separator,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";

export default function UserCart() {
  const payload = getPayload();
  const queryCartKey = ["user-cart"];
  const { data, isLoading, error } = useFetch<Response<Cart>>({
    queryKey: queryCartKey,
    url: `get-user-cart/${payload?.id}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  if (isLoading)
    return (
      <Center h="400px">
        <MainSpinner w="100px" h="100px" />
      </Center>
    );

  if (data) {
    if (!data.data.cartItems.length)
      return (
        <Center h="400px">
          <Heading fontSize="3xl" fontWeight={700}>
            Cart is Empty
          </Heading>
        </Center>
      );

    return (
      <>
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6} p={6}>
          {/* Cart data.data */}
          <GridItem>
            <Stack gap={4}>
              {data.data.cartItems.map((item) => (
                <CartItemCard
                  queryCartKey={queryCartKey}
                  cartId={item.cartId}
                  key={item.id}
                  item={item}
                />
              ))}
            </Stack>
          </GridItem>

          {/* Summary */}
          <GridItem>
            <Box
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              position="sticky"
              top="80px"
            >
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                Order Summary
              </Text>

              <HStack justify="space-between" mb={2}>
                <Text>Total: </Text>
                <Text>{data.data.cartItems.length}</Text>
              </HStack>

              <Separator my={3} />

              <HStack justify="space-between" mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Total
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  ${(+data.data.totalPrice).toFixed(2)}
                </Text>
              </HStack>

              <Button
                colorPalette="yellow"
                size="lg"
                w="100%"
                asChild
                onClick={() => {}}
                disabled={!data.data.cartItems.length}
              >
                <Link href="/checkout">Buy Now</Link>
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </>
    );
  }

  return (
    <Center h="400px">
      <Heading fontSize="2xl" fontWeight={700}>
        {(error as CustomError).response.data.message}
      </Heading>
    </Center>
  );
}

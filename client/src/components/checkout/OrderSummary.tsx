import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import ProductSummary from "./ProductSummary";
import { useFetch } from "@/hooks/useFetch";
import type { Response } from "@/interfaces/responses";
import type { Cart } from "@/interfaces/cart";
import { getPayload } from "@/utils/payloadCookie";

export default function OrderSummary() {
  const payload = getPayload();
  const { data } = useFetch<Response<Cart>>({
    queryKey: ["use-cart"],
    url: `get-user-cart/${payload?.id}?take=10`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  return (
    <Box
      borderWidth="1px"
      className="panel order-summary"
      position="sticky"
      top="4"
    >
      <Heading size="md" mb={4}>
        3. Order Summary
      </Heading>

      <VStack align="stretch" gap={4}>
        {/* Products Summary */}
        <Box
          display="flex"
          flexDir="column"
          className="products"
          overflowY="auto"
          gap={2}
          h="300px"
          pe={4}
        >
          {data &&
            data.data.cartItems.map((item) => (
              <ProductSummary key={item.id} item={item} />
            ))}
        </Box>
        <HStack justify="space-between" fontWeight="bold" fontSize="lg">
          <Text>Order Total: </Text>
          <Text color="orange.500">
            ${Number(data?.data.totalPrice ?? 0).toFixed(3)}
          </Text>
        </HStack>
        <Button
          className="main-button"
          size="lg"
          form="make-order"
          width="full"
          type="submit"
        >
          Place Your Order
        </Button>
        <Text fontSize="sm" color="gray.600">
          By placing your order, you agree to our Terms & Conditions
        </Text>
        <Stack gap={2} fontSize="sm" color="gray.600">
          <Text>• Secure checkout with SSL encryption</Text>
          <Text>• 30-day return policy</Text>
          <Text>• 24/7 customer support</Text>
        </Stack>
      </VStack>
    </Box>
  );
}

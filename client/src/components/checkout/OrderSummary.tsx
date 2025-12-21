import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  VStack,
  HStack,
  Separator,
} from "@chakra-ui/react";
import ProductSummary from "./ProductSummary";

export default function OrderSummary() {
  return (
    <Box
      borderWidth="1px"
      className="panel order-summary"
      position="sticky"
      top="4"
    >
      <Heading size="md" mb={4}>
        Order Summary
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
          <ProductSummary />
          <Separator />
          <ProductSummary />
          <Separator />
          <ProductSummary />
          <Separator />
          <ProductSummary />
          <Separator />
        </Box>
        <HStack justify="space-between" fontWeight="bold" fontSize="lg">
          <Text>Order Total:</Text>
          <Text color="orange.500">$205.17</Text>
        </HStack>
        <Button className="main-button" size="lg" width="full">
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

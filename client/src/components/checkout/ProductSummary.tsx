import type { CartItem } from "@/interfaces/cart";
import { HStack, Image, Text, VStack } from "@chakra-ui/react";

export default function ProductSummary({ item }: { item: CartItem }) {
  const { amount, priceAtPayment, product } = item;
  return (
    <HStack gap={4} flexDir={{ base: "column", md: "row" }}>
      <Image
        boxSize="80px"
        h="100%"
        objectFit="contain"
        src={product.image.url} // Replace with actual image URL
        alt={product.title}
      />
      <VStack align="start" flex="1">
        <Text fontWeight="semibold">{product.title}</Text>
        <Text fontSize="sm" color="gray.600">
          Qty: {amount}
        </Text>
      </VStack>
      <Text fontWeight="bold">${(+priceAtPayment).toFixed(3)}</Text>
    </HStack>
  );
}

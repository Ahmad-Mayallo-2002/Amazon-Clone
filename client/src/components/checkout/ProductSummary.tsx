import { HStack, Image, Text, VStack } from "@chakra-ui/react";

export default function ProductSummary() {
  return (
    <HStack>
      <Image
        boxSize="80px"
        objectFit="contain"
        src="https://via.placeholder.com/80?text=Headphones" // Replace with actual image URL
        alt="Premium Wireless Noise Cancelling Headphones"
      />
      <VStack align="start" flex="1">
        <Text fontWeight="semibold">
          Premium Wireless Noise Cancelling Headphones
        </Text>
        <Text fontSize="sm" color="gray.600">
          Qty: 1
        </Text>
      </VStack>
      <Text fontWeight="bold">$89.99</Text>
    </HStack>
  );
}

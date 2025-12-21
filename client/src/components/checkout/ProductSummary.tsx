import { HStack, Image, Text, VStack } from "@chakra-ui/react";

export default function ProductSummary() {
  return (
    <HStack gap={4} flexDir={{ base: "column", md: "row" }}>
      <Image
        boxSize="80px"
        h="100%"
        objectFit="contain"
        src="https://placehold.co/600x400/EEE/31343C" // Replace with actual image URL
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

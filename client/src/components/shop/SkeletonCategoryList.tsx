import { HStack, SkeletonCircle, SkeletonText, VStack } from "@chakra-ui/react";

export default function SkeletonCategoryList() {
  return (
    <>
      <VStack gap={10}>
        <HStack width="full" gap={4} mb={3}>
          <SkeletonCircle size="5" />
          <SkeletonText noOfLines={1} />
        </HStack>
      </VStack>
    </>
  );
}

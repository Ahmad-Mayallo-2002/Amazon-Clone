import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
export default function SkeletonLoadingProducts() {
  return (
    <>
      <Stack>
        <Skeleton h="200px" />
        <SkeletonText noOfLines={5} />
      </Stack>
    </>
  );
}

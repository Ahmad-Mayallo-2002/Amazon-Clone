import MainSpinner from "@/components/ui/MainSpinner";
import { VStack, Center, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center h="100vh">
      <VStack>
        <MainSpinner w="100px" h="100px" />
        <Text color="orange">Loading...</Text>
      </VStack>
    </Center>
  );
}

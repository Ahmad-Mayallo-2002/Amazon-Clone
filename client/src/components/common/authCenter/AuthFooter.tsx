import { Box, Link, Text, HStack, Center, Separator } from "@chakra-ui/react";

function AuthFooter() {
  return (
    <Box as="footer" py={4} bg="#fff" width="full">
      <Separator borderColor="gray.300" />

      <Center mt={8} flexDirection="column">
        <HStack gap={6} fontSize="xs" color="blue.500" mb={2}>
          <Link href="/">Conditions of Use</Link>
          <Link href="/">Privacy Notice</Link>
          <Link href="/">Help</Link>
        </HStack>

        <Text fontSize="xs" color="gray.600">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </Text>
      </Center>
    </Box>
  );
}

export default AuthFooter;

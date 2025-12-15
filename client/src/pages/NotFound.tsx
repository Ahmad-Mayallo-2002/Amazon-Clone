import { Center, Box, Heading, Link } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Heading fontWeight={800} fontSize="4xl" mb={4}>
          404 Page not Found
        </Heading>
        <Link href="/" color="blue.500" _hover={{ textDecor: "underline" }}>
          Return to Home Page
        </Link>
      </Box>
    </Center>
  );
}

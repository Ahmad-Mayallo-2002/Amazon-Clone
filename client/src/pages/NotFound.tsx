import { Center, Box, Heading, Link } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Center h={400}>
      <Box textAlign="center">
        <Heading fontWeight={700} fontSize="3xl" mb={4}>
          404 Page not Found
        </Heading>
        <Link href="/" color="blue.500" _hover={{ textDecor: "underline" }}>
          Return to Home Page
        </Link>
      </Box>
    </Center>
  );
}

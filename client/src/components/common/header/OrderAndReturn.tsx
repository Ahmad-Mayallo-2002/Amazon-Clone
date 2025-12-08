import { Box, Heading, Link, Text } from "@chakra-ui/react";

export default function OrderAndReturn() {
  return (
    <Box className="orders">
      <Link href="/orders" flexDir="column" alignItems="start">
        <Text as="small" color="#fff">
          Returns
        </Text>
        <Heading fontWeight={700} fontSize="md" as="h5" mt={-2} color="#fff">
          &amp; Orders
        </Heading>
      </Link>
    </Box>
  );
}

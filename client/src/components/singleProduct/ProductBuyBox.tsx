import {
  Box,
  Text,
  Badge,
  Button,
  Stack,
  Icon,
  Flex,
  Separator,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

function ProductBuyBox() {
  return (
    <Box className="panel" pos="sticky" top={4} left={0} w="full" h="fit">
      {/* Price */}
      <Stack gap={1}>
        <Text fontSize="2xl" fontWeight="bold" color="red.500">
          $100
        </Text>

        {100 && (
          <Text fontSize="sm" color="gray.500">
            List Price:{" "}
            <Text as="span" textDecoration="line-through">
              $100
            </Text>
          </Text>
        )}
      </Stack>

      {/* Delivery */}
      <Box mt={3}>
        <Badge colorScheme="blue" mb={1}>
          Prime
        </Badge>
        <Text fontSize="sm">
          FREE delivery <b>Tomorrow</b>
        </Text>
      </Box>

      {/* Stock */}
      <Text
        mt={3}
        fontSize="md"
        fontWeight="semibold"
        color={true ? "green.500" : "red.500"}
      >
        {true ? "In Stock" : "Out of Stock"}
      </Text>

      {/* Quantity */}
      <Box mt={3}>
        <Text fontSize="sm" mb={1}>
          Quantity:
        </Text>
      </Box>

      {/* Buttons */}
      <Stack mt={4} gap={2}>
        <Button className="main-button" size="sm">
          Add to Cart
        </Button>
        <Button colorPalette="orange" size="sm">
          Buy Now
        </Button>
        <Button colorPalette="red" size="sm">
          Add to wish
        </Button>
      </Stack>

      <Separator my={4} />

      {/* Seller Info */}
      <Stack gap={2} fontSize="sm">
        <Flex align="center">
          <Icon as={FaCheckCircle} color="green.500" mr={2} />
          Secure transaction
        </Flex>

        <Text>
          Ships from <b>Amazon.com</b>
        </Text>

        <Text>
          Sold by <b>vendor</b>
        </Text>

        <Text color="blue.600" cursor="pointer">
          Return policy: 30-day return
        </Text>
      </Stack>
    </Box>
  );
}

export default ProductBuyBox;

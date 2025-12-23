import { usePost } from "@/hooks/usePost";
import type { Product } from "@/interfaces/product";
import type { CustomError, Response } from "@/interfaces/responses";
import { createToaster } from "@/utils/createToaster";
import { isLogged } from "@/utils/isLogged";
import { getPayload } from "@/utils/payloadCookie";
import {
  Box,
  Text,
  Badge,
  Button,
  Stack,
  Icon,
  Flex,
  Separator,
  NumberInput,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import RateProduct from "./RateProduct";

function ProductBuyBox({ product }: { product: Product }) {
  const payload = getPayload();
  const [amount, setAmount] = useState<number>(1);
  const discountedPrice: number = +(
    (1 - product.discount) *
    product.price
  ).toFixed(2);

  const handleAmount = (value: number) => setAmount(value);

  const mutationAddToCart = usePost<{ amount: number }, Response<string>>({
    url: `add-to-cart/${product.id}`,
    onSuccess: (data) => createToaster("Done", data.data, "success"),
    onError: (error) => {
      const customError = error as CustomError;
      createToaster("Error", customError.response.data.message, "error");
    },
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const mutationAddToWish = usePost<{}, Response<string>>({
    url: `add-to-wish/${product.id}`,
    onSuccess: (data) => createToaster("Done", data.data, "success"),
    onError: (error) => {
      const customError = error as CustomError;
      createToaster("Error", customError.response.data.message, "error");
    },
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const handleAddToCart = () => {
    if (!isLogged(payload)) return;
    mutationAddToCart.mutate({ amount });
  };

  const handleAddToWish = () => {
    if (!isLogged(payload)) return;
    mutationAddToWish.mutate({});
  };
  return (
    <Box
      as="aside"
      className="panel"
      pos={{ base: "static", lg: "sticky" }}
      top={4}
      left={0}
      w="full"
      h="fit"
    >
      {/* Price */}
      <Stack gap={1}>
        <Text fontSize="2xl" fontWeight="bold" color="red.500">
          ${discountedPrice}
        </Text>

        {product.discount > 0 && (
          <Text fontSize="sm" color="gray.500">
            List Price:{" "}
            <Text as="span" textDecoration="line-through">
              ${product.price}
            </Text>
          </Text>
        )}
      </Stack>

      {/* Delivery */}
      <Box mt={3}>
        <Badge colorPalette="blue" mb={1}>
          Prime
        </Badge>
        <Text color="gray.500" fontSize="sm">
          FREE delivery <b>Tomorrow</b>
        </Text>
      </Box>

      {/* Stock */}
      <Text
        mt={3}
        fontSize="md"
        fontWeight="semibold"
        color={product.stock > 0 ? "green.500" : "red.500"}
      >
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </Text>

      {/* Quantity */}
      <Flex alignItems="center" gap={4} mt={3}>
        <Text fontSize="sm" mb={1}>
          Quantity:
        </Text>
        <NumberInput.Root
          onValueChange={(details) => handleAmount(details.valueAsNumber)}
          size="xs"
          min={1}
          defaultValue="1"
        >
          <NumberInput.Control />
          <NumberInput.Input placeholder="Enter Quantity" />
        </NumberInput.Root>
      </Flex>

      {/* Buttons */}
      <Stack mt={4} gap={2}>
        <Button onClick={handleAddToCart} className="main-button" size="sm">
          Add to Cart
        </Button>
        <Button onClick={handleAddToWish} colorPalette="red" size="sm">
          Add to wish
        </Button>
      </Stack>

      <Separator my={4} />

      {/* Seller Info */}
      <Stack gap={2} fontSize="sm">
        <Flex color="gray.500" align="center">
          <Icon as={FaCheckCircle} color="green.500" mr={2} />
          Secure transaction
        </Flex>

        <Flex color="gray.500" align="center">
          <Icon as={FaCheckCircle} color="green.500" mr={2} />
          Ships from&nbsp;<b>Amazon.com</b>
        </Flex>

        <Flex color="gray.500" align="center">
          <Icon as={FaCheckCircle} color="green.500" mr={2} />
          Sold by&nbsp;<b>vendor</b>
        </Flex>

        <Text color="blue.600" cursor="pointer">
          Return policy: 30-day return
        </Text>
      </Stack>

      <RateProduct productId={product.id} payload={payload} />
    </Box>
  );
}

export default ProductBuyBox;

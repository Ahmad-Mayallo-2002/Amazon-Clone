import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import type { CartItem } from "@/interfaces/cart";
import { useDelete } from "@/hooks/useDelete";
import type { CustomError, Response } from "@/interfaces/responses";
import { createToaster } from "@/utils/createToaster";
import { getPayload } from "@/utils/payloadCookie";
import { queryClient } from "@/main";

interface CartItemCardProps {
  item: CartItem;
  cartId: string;
  queryCartKey: string[];
}

export default function CartItemCard({
  item,
  cartId,
  queryCartKey,
}: CartItemCardProps) {
  const payload = getPayload();
  const mutationDeleteFromCart = useDelete<Response<string>>({
    url: `remove-from-cart/${item.productId}`,
    onSuccess: (data) => {
      createToaster("Done", data.data, "success");
      queryClient.invalidateQueries({ queryKey: queryCartKey });
    },
    onError(error) {
      const customError = error as CustomError;
      createToaster("Error", customError.response.data.message, "error");
    },
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
        cartId,
      },
    },
  });

  const handleRemoveFromCart = () => mutationDeleteFromCart.mutate();

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <HStack gap={4}>
        <Image
          src={item.product.image.url}
          alt={item.product.title}
          boxSize="80px"
          objectFit="cover"
          borderRadius="md"
        />

        <Box flex="1">
          <Text fontWeight="semibold">{item.product.title}</Text>

          <Text fontSize="sm" color="gray.500">
            ${(item.product.price * (1 - item.product.discount)).toFixed(2)} ×{" "}
            {item.amount}
          </Text>
        </Box>

        <Text fontWeight="bold">${Number(item.priceAtPayment).toFixed(2)}</Text>
      </HStack>

      <Button
        mt={3}
        size="xs"
        colorPalette="red"
        onClick={handleRemoveFromCart}
      >
        Remove From Cart
      </Button>
    </Box>
  );
}

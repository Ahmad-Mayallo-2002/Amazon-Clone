import { useDelete } from "@/hooks/useDelete";
import type { Product } from "@/interfaces/product";
import type { CustomError, Response } from "@/interfaces/responses";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import {
  Box,
  Image,
  Text,
  Badge,
  Stack,
  HStack,
  Button,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

interface WishItemProps {
  item: Product;
  wishId: string;
  token: string;
  queryWishKey: string[];
}

function WishItemCartd({ item, wishId, token, queryWishKey }: WishItemProps) {
  const discountedPrice: number = +(item.price * (1 - item.discount)).toFixed(
    2
  );

  const mutationRemoveFromWish = useDelete<Response<string>>({
    url: `remove-from-wish/${item.id}`,
    onSuccess: (data) => {
      createToaster("Done", data.data, "success");
      queryClient.invalidateQueries({ queryKey: queryWishKey });
    },
    onError: (error: any) => {
      const customError = error as CustomError;
      createToaster("Error", customError.response.data.message, "error");
    },
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
        wishId,
      },
    },
  });

  const handleRemoveFromWish = () => mutationRemoveFromWish.mutate();
  return (
    <Box borderWidth="1px" borderRadius="xl" boxShadow="md" position="relative">
      <IconButton
        size="xs"
        colorPalette="red"
        position="absolute"
        top="2"
        right="2"
        zIndex="1"
        onClick={handleRemoveFromWish}
      >
        <FaTrash />
      </IconButton>

      {/* Product Image */}
      <Image
        src={item.image.url}
        alt={item.title}
        objectFit="cover"
        borderTopRadius="xl"
        height={{ base: "200px", md: "250px" }}
        width="100%"
      />

      <Stack p={4} gap={3}>
        {/* Title */}
        <Text fontWeight="semibold" fontSize="lg">
          {item.title}
        </Text>

        {/* Price Section */}
        <HStack align="center">
          <Text fontSize="xl" fontWeight="bold">
            ${+(+item.price).toFixed(2)}
          </Text>
          {item.discount > 0 && (
            <>
              <Text
                fontSize="md"
                color="gray.500"
                textDecoration="line-through"
              >
                ${discountedPrice}
              </Text>
              <Badge colorPalette="red">{item.discount * 100}% OFF</Badge>
            </>
          )}
        </HStack>

        {/* Stock Status */}
        {!item.stock && (
          <Badge colorPalette="red" alignSelf="flex-start">
            Out of Stock
          </Badge>
        )}

        {/* Actions */}
        <Button className="main-button" color="#fff" asChild>
          <Link href={`/product/${item.id}`}>Show More</Link>
        </Button>
      </Stack>
    </Box>
  );
}

export default WishItemCartd;

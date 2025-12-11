import { Box, Flex, Image, Text, Badge, Button } from "@chakra-ui/react";

import type { Product } from "@/interfaces/product";

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { title, price, discount, stock, image, category } = product;
  const finalPrice = discount > 0 ? price * (1 - discount) : price;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={3}
      cursor="pointer"
      _hover={{ shadow: "md", transform: "scale(1.02)" }}
      transition="all 0.2s ease-in-out"
      onClick={() => onClick?.(product)}
    >
      {/* Image */}
      <Image
        src={image.url}
        alt={title}
        w="100%"
        h="200px"
        objectFit="cover"
        borderRadius="md"
      />

      {/* Title */}
      <Text mt={3} fontWeight="semibold">
        {title}
      </Text>

      {/* Category */}
      <Badge mt={2} colorPalette="blue">
        {category?.name}
      </Badge>

      {/* Price section */}
      <Flex mt={3} align="center" gap={2}>
        <Text fontWeight="bold" fontSize="lg">
          ${Number(finalPrice).toFixed(2)}
        </Text>

        {discount > 0 && (
          <>
            <Text
              as="span"
              color="gray.500"
              fontSize="sm"
              textDecor="line-through"
            >
              ${+price}
            </Text>

            <Badge colorPalette="red">{(discount * 100).toFixed(1)}% OFF</Badge>
          </>
        )}
      </Flex>

      {/* Stock */}
      <Text mt={2} color={stock > 0 ? "green.500" : "red.500"} fontSize="sm">
        {stock > 0 ? `${stock} in stock` : "Out of stock"}
      </Text>

      {/* Button */}
      <Button mt={3} w="full" colorPalette="blue" variant="outline" size="sm">
        View Product
      </Button>
    </Box>
  );
}

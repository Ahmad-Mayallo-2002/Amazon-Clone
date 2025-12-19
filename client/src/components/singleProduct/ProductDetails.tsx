import type { Product } from "@/interfaces/product";
import {
  Flex,
  Heading,
  Link,
  Span,
  RatingGroup,
  Separator,
  List,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export default function ProductDetails({ product }: { product: Product }) {
  const discountedPrice: number = +((1 - product.discount) * product.price).toFixed(2);
  return (
    <div className="panel">
      {/* Header */}
      <Link href="/brand" color="blue.500" _hover={{ color: "blue.600" }}>
        Visit Store
      </Link>
      <Heading fontWeight={700} fontSize="3xl" my={2}>
        {product.title}
      </Heading>
      <Flex alignItems="center" gap={2} color="#777">
        <Span>({product.rating})</Span>
        <RatingGroup.Root
          count={5}
          defaultValue={product.rating}
          readOnly
          size="sm"
          colorPalette="orange"
        >
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
        <Span color="blue.500">1000 Ratings</Span>
      </Flex>

      <Separator w="calc(100% + 40px)" my={4} ms={-5} />

      {/* Price */}
      <p>
        <Span color="#777" me={1}>
          Price:{" "}
        </Span>
        <Span color="orange.700" fontSize="3xl" fontWeight={500}>
          ${discountedPrice}
        </Span>
      </p>
      {product.discount > 0 && (
        <p>
          <Span color="#777">List Price:</Span>
          <Span mx={2.5} color="#777" textDecor="line-through">
            ${product.price}
          </Span>
          <Span color="green.600">
            ({(product.discount * 100).toFixed(1)}% off)
          </Span>
        </p>
      )}

      <Separator w="calc(100% + 40px)" my={4} ms={-5} />

      {/* About Product */}
      <Heading fontWeight={700} mb={2} fontSize="2xl">
        About this product
      </Heading>
      <List.Root>
        {Array.from({ length: 6 }).map((_v, i) => (
          <List.Item mb={i < 5 ? 3 : 0} key={i}>
            <Flex alignItems="center" gap={2}>
              <Icon as={FaCheckCircle} color="green.600" />
              <Span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </Span>
            </Flex>
          </List.Item>
        ))}
      </List.Root>

      <Separator w="calc(100% + 40px)" my={4} ms={-5} />

      {/* Product Description */}
      <Heading fontWeight={700} mb={2} fontSize="2xl">
        Product Description
      </Heading>
      <Text color="#777">{product.description}</Text>
    </div>
  );

}

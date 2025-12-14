import { useFetch } from "@/hooks/useFetch";
import type { Product } from "@/interfaces/product";
import type { Response } from "@/interfaces/responses";
import { Heading, SimpleGrid, GridItem, Box, Center } from "@chakra-ui/react";
import MainSpinner from "../ui/MainSpinner";
import { ProductCard } from "../shop/ProductCard";

export default function ProductCategorySlide({
  category,
}: {
  category: string;
}) {
  const { data, error, isLoading } = useFetch<Response<Product[]>>({
    queryKey: [`${category}-slide`],
    url: `get-products-by-category?category=${category}&take=4`,
  });
  return (
    <>
      <Box
        className="products-box"
        as="section"
        bgColor="#fff"
        p={8}
        rounded={"xl"}
        my={6}
      >
        {data && (
          <>
            <Heading
              textTransform="capitalize"
              fontWeight={700}
              mb={6}
              fontSize="4xl"
            >
              {category}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
              {data.data.map((p, i) => (
                <GridItem className={`${category}`} key={i}>
                  <ProductCard product={p} />
                </GridItem>
              ))}
            </SimpleGrid>
          </>
        )}
        {error && (
          <Heading my={12} fontWeight={700} fontSize="3xl">
            {error.message}
          </Heading>
        )}
        {isLoading && (
          <Center h={150}>
            <MainSpinner w={70} h={70} />
          </Center>
        )}
      </Box>
    </>
  );
}

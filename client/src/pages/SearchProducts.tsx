import MainPagination from "@/components/common/MainPagination";
import { ProductCard } from "@/components/shop/ProductCard";
import MainSpinner from "@/components/ui/MainSpinner";
import { useFetch } from "@/hooks/useFetch";
import type { Product } from "@/interfaces/product";
import type { CustomError, PaginatedDate } from "@/interfaces/responses";
import { useSearchProducts } from "@/zustand/searchProducts";
import { useCategory } from "@/zustand/selectCategory";
import { Box, Center, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

export default function SearchProducts() {
  const TAKE: number = 12;
  const [skip, setSkip] = useState<number>(0);
  const search = useSearchProducts((state) => state.search);
  const category = useCategory((state) => state.category);
  const { data, error, isLoading } = useFetch<PaginatedDate<Product[]>>({
    queryKey: ["search-products", search, category, skip],
    url: `search-products?search=${search}&category=${category}&take=${TAKE}&skip=${
      skip * TAKE
    }`,
  });

  if (isLoading)
    return (
      <Center h="400px">
        <MainSpinner h="150px" w="150px" />
      </Center>
    );

  if (data)
    return (
      <>
        <Box className="search-products" py={24}>
          <Container>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
              {data.data.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </SimpleGrid>
            <MainPagination
              count={data.pagination.totalPages}
              defaultPage={data.pagination.currentPage}
              onPageChange={(details) => {
                const { totalPages, currentPage } = data.pagination;
                setSkip(
                  (totalPages === currentPage + 1 ? totalPages : details.page) -
                    1
                );
              }}
            />
          </Container>
        </Box>
      </>
    );

  return (
    <Center h="400px">
      <Heading>{(error as CustomError).response.data.message}</Heading>
    </Center>
  );
}

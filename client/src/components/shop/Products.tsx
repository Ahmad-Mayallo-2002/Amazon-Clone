import {
  Box,
  Pagination,
  ButtonGroup,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import SortBy from "./SortBy";
import { useFetch } from "@/hooks/useFetch";
import type { PaginatedDate } from "@/interfaces/responses";
import type { Product } from "@/interfaces/product";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { useFilters } from "@/zustand/filters";
import { usePriceRange } from "@/zustand/priceRange";
import { useProductSort } from "@/zustand/productSort";
import SkeletonLoadingProducts from "./SkeletonLoadingProducts";
export default function Products() {
  const TAKE = 12;

  const filter = useFilters((state) => state.filters);
  const priceRange = usePriceRange((state) => state);
  const keyValue = useProductSort((state) => state.sortBy);
  const [skip, setSkip] = useState(0);

  // Build query params cleanly
  const params = new URLSearchParams({
    take: TAKE.toString(),
    skip: ((skip || 0) * TAKE).toString(),
  });

  // optional filters
  if (filter.category) params.append("category", filter.category);
  if (filter.rating) params.append("rating", filter.rating.toString());
  if (priceRange.min > 0) params.append("minPrice", priceRange.min.toString());
  if (priceRange.max) params.append("maxPrice", priceRange.max.toString());
  if (keyValue.key) {
    params.append("sortBy", keyValue.key.toString());
    params.append("orderBy", keyValue.value.toString());
  }
  const { data, isLoading } = useFetch<PaginatedDate<Product[]>>({
    queryKey: ["products", TAKE, skip, filter, priceRange, keyValue],
    url: `get-products?${params.toString()}`,
  });
  const { Root, PrevTrigger, Items, NextTrigger } = Pagination;
  return (
    <>
      <SortBy count={data?.data.length || 0} />
      <Box as="section" mt={4} className="products panel">
        {data && (
          <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
              {data.data.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </SimpleGrid>

            <Root
              mt={4}
              count={data.pagination.totalPages}
              pageSize={1}
              defaultPage={data.pagination.currentPage}
              className="products-pagination"
              colorPalette="blue"
              onPageChange={(e) => {
                let totalPages = data.pagination.totalPages;
                let currentPage = data.pagination.currentPage;
                setSkip(
                  (totalPages === currentPage + 1 ? totalPages : e.page) - 1
                );
              }}
            >
              <ButtonGroup
                justify="center"
                w="full"
                mx="auto"
                attached
                size="sm"
              >
                <PrevTrigger asChild>
                  <IconButton>
                    <LuChevronLeft />
                  </IconButton>
                </PrevTrigger>

                <Items
                  render={(page) => (
                    <IconButton
                      variant={{ base: "ghost", _selected: "outline" }}
                    >
                      {page.value}
                    </IconButton>
                  )}
                />

                <NextTrigger asChild>
                  <IconButton>
                    <LuChevronRight />
                  </IconButton>
                </NextTrigger>
              </ButtonGroup>
            </Root>
          </>
        )}
        {isLoading && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {Array.from({ length: TAKE }).map((_v, i) => (
              <SkeletonLoadingProducts key={i} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
}

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
import type { PaginatedDate, Response } from "@/interfaces/responses";
import type { Product } from "@/interfaces/product";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
export default function Products() {
  const TAKE: number = 12;
  const [skip, setSkip] = useState<number>(0);
  const { data } = useFetch<PaginatedDate<Product[]>>({
    queryKey: ["products", TAKE, skip],
    url: `get-products?take=${TAKE}&skip=${skip ? (skip - 1) * TAKE : 0}`,
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
                <ProductCard
                  product={product}
                  key={product.id}
                  onClick={() => {}}
                />
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
                if (totalPages === currentPage + 1) {
                  setSkip(totalPages);
                } else {
                  setSkip(e.page);
                }
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
      </Box>
    </>
  );
}

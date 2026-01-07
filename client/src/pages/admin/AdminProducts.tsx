import { Heading, Center, Table, Flex, Image, Span } from "@chakra-ui/react";
import MainSpinner from "@/components/ui/MainSpinner";
import { getPayload } from "@/utils/payloadCookie";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import type { CustomError, PaginatedDate } from "@/interfaces/responses";
import type { Product } from "@/interfaces/product";
import MainPagination from "@/components/common/MainPagination";
import ProductsActionsMenu from "@/components/dashboards/admin/ProductsActionsMenu";

export default function AdminProducts() {
  const TAKE: number = 10;
  const [skip, setSkip] = useState<number>(0);
  const payload = getPayload();
  const { Root, ScrollArea, Body, Cell, Footer, ColumnHeader, Header, Row } =
    Table;

  const { data, isLoading, error } = useFetch<PaginatedDate<Product[]>>({
    queryKey: ["products", skip],
    url: `get-products?take=${TAKE}&skip=${(skip || 0) * TAKE}`,
  });
  if (!data) {
    return (
      <>
        <Center h="400px">
          {isLoading && <MainSpinner w="100px" h="100px" />}
          {error && (
            <Heading fontWeight={700} fontSize="2xl">
              {(error as CustomError).response.data.message}
            </Heading>
          )}
        </Center>
      </>
    );
  }
  return (
    <>
      <Heading mb={4} fontSize="2xl" fontWeight={700}>
        All Products
      </Heading>
      <ScrollArea
        maxW={{ base: "calc(100vw - 12rem)", lg: "calc(100vw - 15rem)" }}
      >
        <Root
          showColumnBorder
          borderWidth={1}
          w={{ base: "150%", md: "125%", lg: "100%" }}
        >
          <Header>
            <Row>
              <ColumnHeader>No.</ColumnHeader>
              <ColumnHeader>Title</ColumnHeader>
              <ColumnHeader>Category</ColumnHeader>
              <ColumnHeader>Stock</ColumnHeader>
              <ColumnHeader>Price</ColumnHeader>
              <ColumnHeader>Discount</ColumnHeader>
              <ColumnHeader>Actions</ColumnHeader>
            </Row>
          </Header>
          <Body>
            {data.data.map((product, index) => (
              <Row key={product.id}>
                <Cell>{index + 1}</Cell>
                <Cell>
                  <Flex alignItems="center" gapX={4}>
                    <Image
                      src={product.image.url}
                      boxSize="54px"
                      rounded="lg"
                    />
                    <Span>{product.title}</Span>
                  </Flex>
                </Cell>
                <Cell>{product.category.name}</Cell>
                <Cell>{product.stock}</Cell>
                <Cell>${product.price}</Cell>
                <Cell>%{(product.discount * 100).toFixed(1)}</Cell>
                <Cell>
                  <ProductsActionsMenu
                    payload={payload}
                    productId={product.id}
                    vendorId={product.vendorId}
                  />
                </Cell>
              </Row>
            ))}
          </Body>
          <Footer>
            <Row>
              <Cell colSpan={6}>Total Vendors</Cell>
              <Cell>{data.pagination.counts}</Cell>
            </Row>
          </Footer>
        </Root>
      </ScrollArea>
      <MainPagination
        count={data.pagination.totalPages}
        defaultPage={data.pagination.currentPage}
        onPageChange={(details) => {
          const { totalPages, currentPage } = data.pagination;
          setSkip(
            (totalPages === currentPage + 1 ? totalPages : details.page) - 1
          );
        }}
      />
    </>
  );
}

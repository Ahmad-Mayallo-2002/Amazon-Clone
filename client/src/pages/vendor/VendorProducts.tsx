import CreateProductDialog from "@/components/dashboards/vendor/CreateProductDialog";
import VendorProductsActions from "@/components/dashboards/vendor/VendorProductsActions";
import MainSpinner from "@/components/ui/MainSpinner";
import { useFetch } from "@/hooks/useFetch";
import type { Product } from "@/interfaces/product";
import type { CustomError, PaginatedDate } from "@/interfaces/responses";
import { getPayload } from "@/utils/payloadCookie";
import {
  Box,
  HStack,
  Table,
  Text,
  Badge,
  Image,
  Heading,
  Center,
} from "@chakra-ui/react";

export default function VendorProducts() {
  const { ScrollArea, Root, Header, Body, Footer, Row, Cell, ColumnHeader } =
    Table;
  const payload = getPayload();
  const { data, error, isLoading } = useFetch<PaginatedDate<Product[]>>({
    queryKey: ["vendor-products"],
    url: `get-products-by-vendorId/${payload?.vendorId}?take=10`,
  });
  return (
    <Box className="panel" overflow="hidden" boxShadow="sm">
      {/* Header */}
      <HStack justify="space-between" mb={4}>
        <Heading fontSize="2xl" fontWeight="bold">
          Product Management
        </Heading>

        <CreateProductDialog />
      </HStack>
      {data ? (
        <>
          {/* Table */}
          <ScrollArea maxW="calc(100vw - 15rem)">
            <Root
              showColumnBorder
              borderWidth={1}
              w={{ base: "150%", md: "125%", lg: "100%" }}
            >
              <Header>
                <Row>
                  <ColumnHeader>Product</ColumnHeader>
                  <ColumnHeader>Category</ColumnHeader>
                  <ColumnHeader>Price</ColumnHeader>
                  <ColumnHeader>Discount</ColumnHeader>
                  <ColumnHeader>Stock</ColumnHeader>
                  <ColumnHeader>Status</ColumnHeader>
                  <ColumnHeader>Actions</ColumnHeader>
                </Row>
              </Header>

              <Body>
                {data.data?.map((product) => (
                  <Row key={product.id}>
                    <Cell>
                      <HStack gap={3}>
                        <Image
                          src={product.image.url}
                          alt={product.title}
                          boxSize="40px"
                          borderRadius="md"
                          objectFit="cover"
                        />
                        <Text fontWeight="medium">{product.title}</Text>
                      </HStack>
                    </Cell>

                    <Cell>{product.category.name}</Cell>

                    <Cell fontWeight="semibold">${product.price}</Cell>

                    <Cell fontWeight="semibold">%{product.discount * 100}</Cell>

                    <Cell color={product.stock === 0 ? "red.500" : "inherit"}>
                      {product.stock}
                    </Cell>

                    <Cell>
                      <Badge colorPalette={product.stock > 0 ? "green" : "red"}>
                        {product.stock > 0 ? "In Stock" : "Out Stock"}
                      </Badge>
                    </Cell>

                    <Cell>
                      <VendorProductsActions
                        productId={product.id}
                        token={`${payload?.token}`}
                        vendorId={`${payload?.vendorId}`}
                      />
                    </Cell>
                  </Row>
                ))}
              </Body>
              <Footer>
                <Row>
                  <Cell colSpan={6}>Total Products</Cell>
                  <Cell>{data.data?.length}</Cell>
                </Row>
              </Footer>
            </Root>
          </ScrollArea>
        </>
      ) : (
        <Center h="200px">
          <Heading fontWeight={700} fontSize="2xl">
            {error && (error as CustomError).response.data.message}
          </Heading>
        </Center>
      )}
      {isLoading && (
        <Center h="200px">
          <MainSpinner w="100px" h="100px" />
        </Center>
      )}
    </Box>
  );
}

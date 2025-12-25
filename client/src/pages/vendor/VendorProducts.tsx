import {
  Box,
  Button,
  HStack,
  Table,
  Text,
  Badge,
  IconButton,
  Image,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

type ProductStatus = "Active" | "Out of Stock";

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
}

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds Pro",
    image: "/images/earbuds.png",
    category: "Wireless Earbuds",
    price: 159.99,
    stock: 47,
    status: "Active",
  },
  {
    id: "2",
    name: "Noise Cancelling Headphones",
    image: "/images/headphones.png",
    category: "Headphones",
    price: 249.99,
    stock: 23,
    status: "Active",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    image: "/images/speaker.png",
    category: "Speakers",
    price: 89.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "4",
    name: "USB-C Charging Cable",
    image: "/images/cable.png",
    category: "Accessories",
    price: 19.99,
    stock: 156,
    status: "Active",
  },
];
export default function VendorProducts() {
  const { ScrollArea, Root, Header, Body, Footer, Row, Cell, ColumnHeader } =
    Table;
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
      {/* Header */}
      <HStack justify="space-between" mb={4}>
        <Heading fontSize="2xl" fontWeight="bold">
          Product Management
        </Heading>

        <Button colorPalette="orange">
          <Icon as={FiPlus} />
          Add New Product
        </Button>
      </HStack>

      {/* Table */}
      <ScrollArea maxW="calc(100vw - 15rem)">
        <Root borderWidth={1}>
          <Header>
            <Row>
              <ColumnHeader>Product</ColumnHeader>
              <ColumnHeader>Category</ColumnHeader>
              <ColumnHeader>Price</ColumnHeader>
              <ColumnHeader>Stock</ColumnHeader>
              <ColumnHeader>Status</ColumnHeader>
              <ColumnHeader>Actions</ColumnHeader>
            </Row>
          </Header>

          <Body>
            {products.map((product) => (
              <Row key={product.id}>
                <Cell>
                  <HStack gap={3}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      boxSize="40px"
                      borderRadius="md"
                      objectFit="cover"
                    />
                    <Text fontWeight="medium">{product.name}</Text>
                  </HStack>
                </Cell>

                <Cell>{product.category}</Cell>

                <Cell fontWeight="semibold">${product.price.toFixed(2)}</Cell>

                <Cell color={product.stock === 0 ? "red.500" : "inherit"}>
                  {product.stock}
                </Cell>

                <Cell>
                  <Badge
                    colorPalette={product.status === "Active" ? "green" : "red"}
                  >
                    {product.status}
                  </Badge>
                </Cell>

                <Cell>
                  <HStack gap={2}>
                    <IconButton
                      aria-label="Edit product"
                      size="sm"
                      variant="ghost"
                      colorPalette="blue"
                    >
                      <FiEdit2 />
                    </IconButton>
                    <IconButton
                      aria-label="Delete product"
                      size="sm"
                      variant="ghost"
                      colorPalette="red"
                    >
                      <FiTrash2 />
                    </IconButton>
                  </HStack>
                </Cell>
              </Row>
            ))}
          </Body>
          <Footer>
            <Row>
              <Cell colSpan={5}>Total Products</Cell>
              <Cell>{products.length}</Cell>
            </Row>
          </Footer>
        </Root>
      </ScrollArea>
    </Box>
  );
}

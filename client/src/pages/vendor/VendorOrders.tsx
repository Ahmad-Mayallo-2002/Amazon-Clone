import { Table, Badge, Text, HStack, Box, Heading } from "@chakra-ui/react";

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  product: string;
  amount: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  time: string;
}

export const mockOrders: Order[] = [
  {
    id: "ORD-2025-001234",
    customerName: "John Doe",
    customerEmail: "john@email.com",
    product: "Wireless Earbuds Pro",
    amount: "$159.99",
    status: "Processing",
    date: "Jan 20, 2025",
    time: "10:30 AM",
  },
  {
    id: "ORD-2025-001233",
    customerName: "Sarah Smith",
    customerEmail: "sarah@email.com",
    product: "Smart Watch Series 7",
    amount: "$399.99",
    status: "Shipped",
    date: "Jan 20, 2025",
    time: "09:15 AM",
  },
  {
    id: "ORD-2025-001232",
    customerName: "Mike Johnson",
    customerEmail: "mike@email.com",
    product: "Gaming Keyboard",
    amount: "$129.99",
    status: "Delivered",
    date: "Jan 19, 2025",
    time: "03:45 PM",
  },
  {
    id: "ORD-2025-001234",
    customerName: "John Doe",
    customerEmail: "john@email.com",
    product: "Wireless Earbuds Pro",
    amount: "$159.99",
    status: "Processing",
    date: "Jan 20, 2025",
    time: "10:30 AM",
  },
  {
    id: "ORD-2025-001233",
    customerName: "Sarah Smith",
    customerEmail: "sarah@email.com",
    product: "Smart Watch Series 7",
    amount: "$399.99",
    status: "Shipped",
    date: "Jan 20, 2025",
    time: "09:15 AM",
  },
  {
    id: "ORD-2025-001232",
    customerName: "Mike Johnson",
    customerEmail: "mike@email.com",
    product: "Gaming Keyboard",
    amount: "$129.99",
    status: "Delivered",
    date: "Jan 19, 2025",
    time: "03:45 PM",
  },
];

const statusColors = {
  Processing: "orange",
  Shipped: "blue",
  Delivered: "green",
  Cancelled: "red",
};

export default function VendorOrders() {
  const { Root, Body, Cell, ColumnHeader, Header, Footer, Row, ScrollArea } =
    Table;
  return (
    <>
      <HStack
        mb={4}
        justify="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Heading>Orders Management</Heading>
        <Box>Filters</Box>
      </HStack>
      <Box className="panel" boxShadow="sm">
        <ScrollArea maxW="calc(100vw - 15rem)">
          <Root showColumnBorder borderWidth={1} variant="outline">
            <Header bg="gray.50">
              <Row>
                <ColumnHeader>No.</ColumnHeader>
                <ColumnHeader>Customer</ColumnHeader>
                <ColumnHeader>Product</ColumnHeader>
                <ColumnHeader>Amount</ColumnHeader>
                <ColumnHeader>Status</ColumnHeader>
                <ColumnHeader>Date</ColumnHeader>
              </Row>
            </Header>
            <Body>
              {mockOrders.map((order, index) => (
                <Row key={index}>
                  <Cell fontWeight="medium" fontSize="sm">
                    {index + 1}
                  </Cell>
                  <Cell>
                    <Text fontWeight="bold" fontSize="sm">
                      {order.customerName}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {order.customerEmail}
                    </Text>
                  </Cell>
                  <Cell fontSize="sm">{order.product}</Cell>
                  <Cell fontWeight="bold" fontSize="sm">
                    {order.amount}
                  </Cell>
                  <Cell>
                    <Badge
                      colorPalette={
                        statusColors[order.status as keyof typeof statusColors]
                      }
                      variant="subtle"
                      borderRadius="full"
                      px={3}
                    >
                      {order.status}
                    </Badge>
                  </Cell>
                  <Cell>
                    <Text fontSize="sm">{order.date}</Text>
                    <Text fontSize="xs" color="gray.400">
                      {order.time}
                    </Text>
                  </Cell>
                </Row>
              ))}
            </Body>
            <Footer>
              <Row>
                <Cell colSpan={5}>Total Orders:</Cell>
                <Cell>{mockOrders.length}</Cell>
              </Row>
            </Footer>
          </Root>
        </ScrollArea>
      </Box>
    </>
  );
}

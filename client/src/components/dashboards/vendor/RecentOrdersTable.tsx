import { Box, Table, Text, Badge, HStack, Link } from "@chakra-ui/react";

type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Failed";

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: OrderStatus;
  date: string;
}

const orders: Order[] = [
  {
    id: "ORD-2025-001234",
    customer: "John Doe",
    product: "Wireless Earbuds Pro",
    amount: "$159.99",
    status: "Processing",
    date: "Jan 20, 2025",
  },
  {
    id: "ORD-2025-001233",
    customer: "Sarah Smith",
    product: "Smart Watch Series 7",
    amount: "$399.99",
    status: "Shipped",
    date: "Jan 20, 2025",
  },
  {
    id: "ORD-2025-001232",
    customer: "Mike Johnson",
    product: "Gaming Keyboard",
    amount: "$129.99",
    status: "Delivered",
    date: "Jan 19, 2025",
  },
  {
    id: "ORD-2025-001234",
    customer: "Mike Johnson",
    product: "Gaming Keyboard",
    amount: "$129.99",
    status: "Failed",
    date: "Jan 19, 2025",
  },
];

const statusColor = (status: OrderStatus) => {
  switch (status) {
    case "Processing":
      return "orange";
    case "Shipped":
      return "blue";
    case "Delivered":
      return "green";
    case "Failed":
      return "red";
  }
};

const RecentOrdersTable = () => {
  const { Root, Body, Cell, ColumnHeader, Header, Footer, Row, ScrollArea } =
    Table;

  return (
    <Box mt={4} boxShadow="sm" className="panel">
      <HStack justify="space-between" flexWrap="wrap" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Recent Orders
        </Text>
        <Link color="teal.500" href="/vendor-dashboard/orders" fontSize="sm">
          View all
        </Link>
      </HStack>

      <ScrollArea maxW="calc(100vw - 15rem)">
        <Root borderWidth="1px">
          <Header>
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
            {orders.map((order, index) => (
              <Row key={order.id}>
                <Cell fontWeight="medium">{index + 1}</Cell>
                <Cell>{order.customer}</Cell>
                <Cell>{order.product}</Cell>
                <Cell fontWeight="semibold">{order.amount}</Cell>
                <Cell>
                  <Badge colorPalette={statusColor(order.status)}>
                    {order.status}
                  </Badge>
                </Cell>
                <Cell>{order.date}</Cell>
              </Row>
            ))}
          </Body>
          <Footer>
            <Row>
              <Cell colSpan={5}>Total Orders:</Cell>
              <Cell>{orders.length}</Cell>
            </Row>
          </Footer>
        </Root>
      </ScrollArea>
    </Box>
  );
};

export default RecentOrdersTable;

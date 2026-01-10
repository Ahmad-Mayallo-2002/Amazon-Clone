import { useFetch } from "@/hooks/useFetch";
import {
  Box,
  Table,
  Text,
  Badge,
  HStack,
  Link,
  Center,
  Heading,
} from "@chakra-ui/react";
import { getPayload } from "@/utils/payloadCookie";
import type { CustomError } from "@/interfaces/responses";
import type { Order } from "@/interfaces/order";
import type { PaginatedDate } from "@/interfaces/responses";
import { PaymentStatusColorMap } from "@/enums/payment-status";
import { OrderStatusColorMap } from "@/enums/order-status";
import MainSpinner from "@/components/ui/MainSpinner";

function RecentOrdersTable() {
  const { Root, Body, Cell, ColumnHeader, Header, Footer, Row, ScrollArea } =
    Table;

  const payload = getPayload();

  const { data, error, isLoading } = useFetch<PaginatedDate<Order[]>>({
    url: `get-vendor-orders/${payload?.vendorId}?take=4`,
    queryKey: ["recent-orders"],
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  if (isLoading)
    return (
      <Center h="400px">
        <MainSpinner w="100px" h="100px" />
      </Center>
    );

  if (data) {
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
          <Root borderWidth="1px" showColumnBorder>
            <Header>
              <Row>
                <ColumnHeader>No.</ColumnHeader>
                <ColumnHeader>User ID</ColumnHeader>
                <ColumnHeader>Address</ColumnHeader>
                <ColumnHeader>Total Price</ColumnHeader>
                <ColumnHeader>Payment Status</ColumnHeader>
                <ColumnHeader>Order Status</ColumnHeader>
              </Row>
            </Header>

            <Body>
              {data.data.map((order, index) => (
                <Row key={order.id}>
                  <Cell>{index + 1}</Cell>
                  <Cell>{order.userId}</Cell>
                  <Cell>
                    <Text>Country: {order.address.country}</Text>
                    <Text>State: {order.address.state}</Text>
                    <Text>City: {order.address.city}</Text>
                    <Text>Street: {order.address.street}</Text>
                    <Text>Postal Code: {order.address.postalCode}</Text>
                  </Cell>
                  <Cell>{order.totalPrice}</Cell>
                  <Cell>
                    <Badge
                      colorPalette={PaymentStatusColorMap[order.payment.status]}
                    >
                      {order.payment.status}
                    </Badge>
                  </Cell>
                  <Cell>
                    <Badge colorPalette={OrderStatusColorMap[order.status]}>
                      {order.status}
                    </Badge>
                  </Cell>
                </Row>
              ))}
            </Body>
            <Footer>
              <Row>
                <Cell colSpan={5}>Total Orders:</Cell>
                <Cell>{data.pagination.counts}</Cell>
              </Row>
            </Footer>
          </Root>
        </ScrollArea>
      </Box>
    );
  }

  return (
    <Center h="400px">
      <Heading fontSize="2xl" fontWeight={700}>
        {(error as CustomError).response.data.message}
      </Heading>
    </Center>
  );
}

export default RecentOrdersTable;

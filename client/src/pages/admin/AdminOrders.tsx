import MainPagination from "@/components/common/MainPagination";
import OrdersActions from "@/components/dashboards/admin/OrdersActions";
import MainSpinner from "@/components/ui/MainSpinner";
import { OrderStatusColorMap } from "@/enums/order-status";
import { PaymentStatusColorMap } from "@/enums/payment-status";
import { useFetch } from "@/hooks/useFetch";
import type { Order } from "@/interfaces/order";
import type { CustomError, PaginatedDate } from "@/interfaces/responses";
import { getPayload } from "@/utils/payloadCookie";
import { Badge, Center, Heading, Table, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function AdminOrders() {
  const payload = getPayload();
  const TAKE: number = 10;
  const [skip, setSkip] = useState<number>(0);
  const { data, error, isLoading } = useFetch<PaginatedDate<Order[]>>({
    queryKey: ["orders"],
    url: `get-orders?take=${TAKE}&skip=${skip}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const { Root, ScrollArea, Body, Cell, Footer, ColumnHeader, Header, Row } =
    Table;

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

  console.log(data.data);

  return (
    <>
      <Heading mb={4} fontWeight={700} fontSize="2xl">
        All Orders
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
              <ColumnHeader>User ID</ColumnHeader>
              <ColumnHeader>Address</ColumnHeader>
              <ColumnHeader>Total Price</ColumnHeader>
              <ColumnHeader>Payment Status</ColumnHeader>
              <ColumnHeader>Order Status</ColumnHeader>
              <ColumnHeader>Actions</ColumnHeader>
            </Row>
          </Header>
          <Body>
            {data?.data?.map((order, index) => (
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
                <Cell>{(+order.totalPrice).toFixed(3)}</Cell>
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
                <Cell>
                  <OrdersActions
                    payload={payload}
                    paymentId={order.payment.id}
                    orderId={order.id}
                    userId={order.userId}
                  />
                </Cell>
              </Row>
            ))}
          </Body>
          <Footer>
            <Row>
              <Cell colSpan={6}>Total Orders</Cell>
              <Cell>{data?.pagination?.counts}</Cell>
            </Row>
          </Footer>
        </Root>
      </ScrollArea>
      <MainPagination
        count={data?.pagination?.totalPages}
        defaultPage={data?.pagination?.currentPage}
        onPageChange={(details) => {
          const { totalPages, currentPage } = data?.pagination;
          setSkip(
            (totalPages === currentPage + 1 ? totalPages : details.page) - 1
          );
        }}
      />
    </>
  );
}

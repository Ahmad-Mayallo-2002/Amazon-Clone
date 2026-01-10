import MainPagination from "@/components/common/MainPagination";
import MainSpinner from "@/components/ui/MainSpinner";
import { OrderStatusColorMap } from "@/enums/order-status";
import { PaymentStatusColorMap } from "@/enums/payment-status";
import { useFetch } from "@/hooks/useFetch";
import type { Order } from "@/interfaces/order";
import type { CustomError, PaginatedDate } from "@/interfaces/responses";
import { getPayload } from "@/utils/payloadCookie";
import { Badge, Center, Heading, Table, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function UserOrders() {
  const TAKE: number = 10;
  const payload = getPayload();
  const [skip, setSkip] = useState<number>(0);
  const { data, isLoading, error } = useFetch<PaginatedDate<Order[]>>({
    queryKey: ["user-orders"],
    url: `get-user-orders/${payload?.id}?take=${TAKE}&skip=${skip}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const { Body, Cell, Footer, Header, Root, Row, ScrollArea, ColumnHeader } =
    Table;

  if (!data) {
    return (
      <Center h="400px">
        {isLoading && <MainSpinner w="100px" h="100px" />}
        {error && (
          <Heading fontSize="3xl" fontWeight={700}>
            {(error as CustomError).response.data.message}
          </Heading>
        )}
      </Center>
    );
  }

  return (
    <>
      <Heading mb={4} fontWeight={700} fontSize="2xl">
        All Orders
      </Heading>
      <ScrollArea
        maxW={{ base: "calc(100vw - 15rem)", lg: "calc(100vw - 12rem)" }}
      >
        <Root showColumnBorder borderWidth={1}>
          <Header>
            <Row>
              <ColumnHeader>No.</ColumnHeader>
              <ColumnHeader>Total Price</ColumnHeader>
              <ColumnHeader>Address</ColumnHeader>
              <ColumnHeader>Payment Status</ColumnHeader>
              <ColumnHeader>Order Status</ColumnHeader>
            </Row>
          </Header>
          <Body>
            {data.data.map((order, index) => (
              <Row key={order.id}>
                <Cell>{index + 1}</Cell>
                <Cell>${(+order.totalPrice).toFixed(3)}</Cell>
                <Cell>
                  <Text>Country: {order.address.country}</Text>
                  <Text>State: {order.address.state}</Text>
                  <Text>Street: {order.address.street}</Text>
                  <Text>Postal Code: {order.address.postalCode}</Text>
                </Cell>
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
              <Cell colSpan={4}>Total Orders: </Cell>
              <Cell>{data.pagination.counts}</Cell>
            </Row>
          </Footer>
        </Root>
      </ScrollArea>

      <MainPagination
        count={data.pagination.counts}
        defaultPage={data.pagination.currentPage}
        onPageChange={(details) => {
          const { currentPage, totalPages } = data.pagination;
          setSkip(
            (totalPages === currentPage + 1 ? totalPages : details.page) - 1
          );
        }}
      />
    </>
  );
}

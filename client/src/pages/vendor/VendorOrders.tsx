import MainPagination from "@/components/common/MainPagination";
import MainSpinner from "@/components/ui/MainSpinner";
import { OrderStatusColorMap } from "@/enums/order-status";
import { PaymentStatusColorMap } from "@/enums/payment-status";
import { useFetch } from "@/hooks/useFetch";
import type { Order } from "@/interfaces/order";
import type { CustomError, PaginatedDate } from "@/interfaces/responses";
import { getPayload } from "@/utils/payloadCookie";
import {
  Table,
  Badge,
  Text,
  HStack,
  Box,
  Heading,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";

export default function VendorOrders() {
  const TAKE: number = 12;
  const [skip, setSkip] = useState<number>(0);
  const { Root, Body, Cell, ColumnHeader, Header, Footer, Row, ScrollArea } =
    Table;

  const payload = getPayload();

  const { data, error, isLoading } = useFetch<PaginatedDate<Order[]>>({
    url: `get-vendor-orders/${payload?.vendorId}?take=${TAKE}&skip=${
      skip * TAKE
    }`,
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
      <>
        <HStack
          mb={4}
          justify="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Heading>Orders Management</Heading>
        </HStack>
        <Box className="panel" boxShadow="sm">
          <ScrollArea maxW="calc(100vw - 15rem)">
            <Root showColumnBorder borderWidth={1}>
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
                        colorPalette={
                          PaymentStatusColorMap[order.payment.status]
                        }
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
        </Box>
      </>
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

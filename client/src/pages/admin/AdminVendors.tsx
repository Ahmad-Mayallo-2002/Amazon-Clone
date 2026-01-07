import MainPagination from "@/components/common/MainPagination";
import VendorsActionsMenu from "@/components/dashboards/admin/VendorsActionsMenu";
import MainSpinner from "@/components/ui/MainSpinner";
import { useFetch } from "@/hooks/useFetch";
import type { CustomError, PaginatedDate } from "@/interfaces/responses";
import type { Vendor } from "@/interfaces/user";
import { getPayload } from "@/utils/payloadCookie";
import { Badge, Center, Heading, Table } from "@chakra-ui/react";
import { useState } from "react";

export default function AdminVendors() {
  const TAKE: number = 10;
  const [skip, setSkip] = useState<number>(0);
  const payload = getPayload();
  const { Root, ScrollArea, Body, Cell, Footer, ColumnHeader, Header, Row } =
    Table;

  const { data, isLoading, error } = useFetch<PaginatedDate<Vendor[]>>({
    queryKey: ["vendors", skip],
    url: `get-vendors?take=${TAKE}&skip=${(skip || 0) * TAKE}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
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
      <Heading fontWeight={700} fontSize="2xl" mb={4}>
        All Vendors
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
              <ColumnHeader>Username</ColumnHeader>
              <ColumnHeader>Email</ColumnHeader>
              <ColumnHeader>Phone</ColumnHeader>
              <ColumnHeader>Store Name</ColumnHeader>
              <ColumnHeader>Status</ColumnHeader>
              <ColumnHeader>Actions</ColumnHeader>
            </Row>
          </Header>
          <Body>
            {data.data.map((vendor, index) => (
              <Row key={vendor.id}>
                <Cell>{index + 1}</Cell>
                <Cell>{vendor.user.username}</Cell>
                <Cell>{vendor.user.email}</Cell>
                <Cell>{vendor.user.phone}</Cell>
                <Cell>{vendor.storeName}</Cell>
                <Cell>
                  <Badge colorPalette={vendor.isVerified ? "blue" : "red"}>
                    {vendor.isVerified ? "Verified" : "Not verified"}
                  </Badge>
                </Cell>
                <Cell>
                  <VendorsActionsMenu
                    currentState={vendor.isVerified}
                    payload={payload}
                    vendorId={vendor.id}
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

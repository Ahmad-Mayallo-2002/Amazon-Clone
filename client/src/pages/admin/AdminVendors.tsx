import MainPagination from "@/components/common/MainPagination";
import MainSpinner from "@/components/ui/MainSpinner";
import { useDelete } from "@/hooks/useDelete";
import { useFetch } from "@/hooks/useFetch";
import { usePatch } from "@/hooks/usePatch";
import type {
  CustomError,
  PaginatedDate,
  Response,
} from "@/interfaces/responses";
import type { Vendor } from "@/interfaces/user";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import { getPayload } from "@/utils/payloadCookie";
import {
  Badge,
  Button,
  ButtonGroup,
  Center,
  Heading,
  Table,
} from "@chakra-ui/react";
import { useState } from "react";

export default function AdminVendors() {
  const TAKE: number = 10;
  const [skip, setSkip] = useState<number>(0);
  const [targetId, setTargetId] = useState<string>("");
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

  const mutationUpdateVendorStatus = usePatch<
    {
      status: boolean;
    },
    Response<string>
  >({
    url: `verify-vendor/${targetId}`,
    onSuccess: (data) => {
      createToaster("Success", data.data, "success"),
        queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
    onError: (error) =>
      createToaster(
        "Error",
        (error as CustomError).response.data.error,
        "error"
      ),
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const handleUpdateVendorStatus = (id: string, currentStatus: boolean) => {
    setTargetId(id);
    mutationUpdateVendorStatus.mutate({
      status: currentStatus ? false : true,
    });
  };

  const mutationDeleteVendor = useDelete<Response<string>>({
    url: `delete-vendor/${targetId}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
    onSuccess: (data) => {
      createToaster("Success", data.data, "success"),
        queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
    onError: (error) => {
      createToaster(
        "Error",
        (error as CustomError).response.data.error,
        "error"
      );
      console.log(error);
    },
  });

  const handleDeleteVendor = (id: string) => {
    setTargetId(id);
    mutationDeleteVendor.mutate();
  };

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
      <ScrollArea maxW="calc(100vw - 15rem)">
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
                  <ButtonGroup attached size="xs">
                    <Button
                      onClick={() => handleDeleteVendor(vendor.id)}
                      colorPalette="red"
                      variant="outline"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        handleUpdateVendorStatus(vendor.id, vendor.isVerified);
                      }}
                      colorPalette="blue"
                      variant="outline"
                    >
                      Change Status
                    </Button>
                  </ButtonGroup>
                </Cell>
              </Row>
            ))}
          </Body>
          <Footer>
            <Row>
              <Cell colSpan={6}>Total Vendors</Cell>
              <Cell>{data.data.length}</Cell>
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

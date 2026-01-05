import MainPagination from "@/components/common/MainPagination";
import MainSpinner from "@/components/ui/MainSpinner";
import { useDelete } from "@/hooks/useDelete";
import { useFetch } from "@/hooks/useFetch";
import type {
  CustomError,
  PaginatedDate,
  Response,
} from "@/interfaces/responses";
import type { User } from "@/interfaces/user";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import { getPayload } from "@/utils/payloadCookie";
import { Button, Center, Heading, Table } from "@chakra-ui/react";
import { useState } from "react";

export default function AdminUsers() {
  const payload = getPayload();
  const TAKE: number = 10;
  const [skip, setSkip] = useState<number>(0);
  const [targetId, setTargetId] = useState<string>("");
  const { data, isLoading, error } = useFetch<PaginatedDate<User[]>>({
    url: `get-users?take=${TAKE}&skip=${(skip || 0) * TAKE}`,
    queryKey: ["users", skip],
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });
  const { Root, ScrollArea, Body, Cell, Footer, ColumnHeader, Header, Row } =
    Table;

  const mutationDeleteUser = useDelete<Response<string>>({
    url: `delete-user/${targetId}`,
    onSuccess: (data) => {
      createToaster("Done", data.data, "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) =>
      createToaster(
        "Error",
        (error as CustomError).response.data.message,
        "error"
      ),
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const handleDeleteUser = (id: string) => {
    setTargetId(id);
    mutationDeleteUser.mutate();
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
      <Heading mb={4} fontSize="2xl" fontWeight={700}>
        All Users
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
              <ColumnHeader>Actions</ColumnHeader>
            </Row>
          </Header>
          <Body>
            {data.data.map((user, index) => (
              <Row key={user.id}>
                <Cell>{index + 1}</Cell>
                <Cell>{user.username}</Cell>
                <Cell>{user.email}</Cell>
                <Cell>{user.phone}</Cell>
                <Cell>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    size="xs"
                    colorPalette="red"
                    variant="outline"
                  >
                    Delete
                  </Button>
                </Cell>
              </Row>
            ))}
          </Body>
          <Footer>
            <Row>
              <Cell colSpan={4}>Total Users</Cell>
              <Cell>{data.data.length}</Cell>
            </Row>
          </Footer>
        </Root>
      </ScrollArea>

      <MainPagination
        onPageChange={(details) => {
          let totalPages = data.pagination.totalPages;
          let currentPage = data.pagination.currentPage;
          setSkip(
            (totalPages === currentPage + 1 ? totalPages : details.page) - 1
          );
        }}
        defaultPage={data.pagination.currentPage}
        count={data.pagination.totalPages}
      />

    </>
  );
}

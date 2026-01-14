import WishItemCartd from "@/components/dashboards/user/WishItemCartd";
import MainSpinner from "@/components/ui/MainSpinner";
import { useFetch } from "@/hooks/useFetch";
import type { CustomError, Response } from "@/interfaces/responses";
import type { Wish } from "@/interfaces/wish";
import { getPayload } from "@/utils/payloadCookie";
import { Center, Heading, SimpleGrid } from "@chakra-ui/react";

export default function UserWish() {
  const payload = getPayload();
  const queryWishKey = ["user-wish"];
  const { data, isLoading, error } = useFetch<Response<Wish>>({
    queryKey: queryWishKey,
    url: `get-wish-user-items/${payload?.id}`,
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
    if (data.data.wishItems.length === 0)
      return (
        <Center h="400px">
          <Heading fontSize="3xl" fontWeight={700}>
            Wish List is Empty
          </Heading>
        </Center>
      );

    return (
      <>
        <Heading mb={4} fontSize="3xl" fontWeight={700}>
          My Wish List
        </Heading>
        <SimpleGrid gap={4} columns={{ base: 1, md: 2, lg: 3 }}>
          {data.data.wishItems.map((item) => (
            <WishItemCartd
              item={item.product}
              key={item.id}
              wishId={item.wishId}
              token={`${payload?.token}`}
              queryWishKey={queryWishKey}
            />
          ))}
        </SimpleGrid>
      </>
    );
  }

  return (
    <Center h="400px">
      <Heading fontWeight={700} fontSize="2xl">
        {(error as CustomError).response.data.message}
      </Heading>
    </Center>
  );
}

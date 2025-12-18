import MainSpinner from "@/components/ui/MainSpinner";
import { useFetch } from "@/hooks/useFetch";
import type { CustomError } from "@/interfaces/responses";
import { getPayload } from "@/utils/payloadCookie";
import { Center, Heading } from "@chakra-ui/react";

export default function UserCart() {
  const payload = getPayload();
  const { data, isLoading, error } = useFetch({
    queryKey: ["user-cart"],
    url: `get-user-cart/${payload?.id}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

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

  return <div>Cart</div>;
}

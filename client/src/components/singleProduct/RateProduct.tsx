import { useFetch } from "@/hooks/useFetch";
import { usePatch } from "@/hooks/usePatch";
import type { AvgAndCountReview } from "@/interfaces/avgAndCountReview";
import type { Response } from "@/interfaces/responses";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import type { PayloadCookie } from "@/utils/payloadCookie";
import { Box, Heading, RatingGroup } from "@chakra-ui/react";

interface Props {
  productId: string;
  payload: PayloadCookie | null;
}

export default function RateProduct({ productId, payload }: Props) {
  const { Root, HiddenInput, Control } = RatingGroup;
  const { data } = useFetch<Response<AvgAndCountReview>>({
    queryKey: ["user-rating"],
    url: `get-user-product-avg-review/${productId}/${payload?.id}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const { mutate } = usePatch<{ value: number }, Response<string>>({
    url: `add-review/${productId}`,
    onSuccess(data) {
      createToaster("Done", data.data, "success");
    },
    onError(error) {
      createToaster("Error", error.response.data.message, "error");
    },
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const handleAddReview = (value: number) => {
    mutate({ value });
    queryClient.invalidateQueries({
      queryKey: ["avg-count-review"],
    });
  };

  return (
    <Box mt={4} className="rating-box">
      <Heading mb={4} fontSize="xl" fontWeight={700}>
        Rate Product
      </Heading>
      {data && (
        <Root
          onValueChange={(e) => {
            handleAddReview(e.value);
          }}
          count={5}
          size="md"
          colorPalette="orange"
          defaultValue={data.data.avg}
          allowHalf
          _focus={{ outline: "none", border: "none" }}
        >
          <HiddenInput />
          <Control />
        </Root>
      )}
    </Box>
  );
}

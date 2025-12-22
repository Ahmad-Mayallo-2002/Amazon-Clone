import { useForm } from "react-hook-form";
import { usePost } from "@/hooks/usePost";
import type { Response } from "@/interfaces/responses";
import { createToaster } from "@/utils/createToaster";
import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { getPayload } from "@/utils/payloadCookie";
import { MdError } from "react-icons/md";
import { queryClient } from "@/main";

interface FormValues {
  content: string;
}

export default function ProductCommentForm({
  productId,
}: {
  productId: string;
}) {
  const payload = getPayload();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { isPending, mutate } = usePost<FormValues, Response<string>>({
    url: `create-comment/${productId}`,
    onSuccess: (_data) => {
      createToaster("Done", "Comment is posted", "success");
      queryClient.invalidateQueries({
        queryKey: ["product-comments", productId],
      });
      reset();
    },
    onError: (error: any) =>
      createToaster("Error", error.response.data.message, "error"),
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const onSubmit = (data: FormValues) => mutate(data);

  return (
    <Box className="panel" mt={4} mb={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={4}>
          <div style={{ flexGrow: 1 }}>
            <Input
              bgColor="#fff"
              {...register("content", {
                required: "Comment content is required",
              })}
              placeholder="Write your comment..."
              resize="none"
            />
            {errors.content && (
              <Text
                as="small"
                display="flex"
                alignItems="center"
                gap={1}
                mt={1}
                color="red.500"
              >
                <Icon as={MdError} />
                {errors.content.message}
              </Text>
            )}
          </div>

          <Button colorPalette="yellow" type="submit" disabled={isPending}>
            {isPending ? "Posting..." : "Post Comment"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

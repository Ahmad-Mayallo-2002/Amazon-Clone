import { useFetch } from "@/hooks/useFetch";
import type { Comment } from "@/interfaces/comments";
import type { Response } from "@/interfaces/responses";
import { Box, Heading } from "@chakra-ui/react";
import MainSpinner from "../ui/MainSpinner";
import ProductComment from "./ProductComment";
import { getPayload } from "@/utils/payloadCookie";

interface Props {
  productId: string;
}

export default function ProductCommentsList({ productId }: Props) {
  const { data, isLoading, error } = useFetch<Response<Comment[]>>({
    url: `get-product-comments/${productId}?take=10`,
    queryKey: ["product-comments", productId],
  });
  const payload = getPayload();

  if (error) console.log(error);

  if (isLoading) return <MainSpinner w="50px" h="50px" />;

  if (!data || !data?.data.length) {
    return <p>No comments yet.</p>;
  }

  return (
    <>
      <Heading mb={4} fontWeight={700} fontSize="3xl">
        All Comments ({data.data.length})
      </Heading>
      <Box className="comments-list" display="grid" gap={4}>
        {data.data.map((comment) => (
          <ProductComment
            payload={payload}
            comment={comment}
            key={comment.id}
          />
        ))}
      </Box>
    </>
  );
}

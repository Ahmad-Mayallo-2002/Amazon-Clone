import type { Comment } from "@/interfaces/comments";
import {
  Box,
  Editable,
  Heading,
  HStack,
  Icon,
  Text,
  Button,
} from "@chakra-ui/react";
import { FaRegUserCircle } from "react-icons/fa";
import CommentMenu from "./CommentMenu";
import type { PayloadCookie } from "@/utils/payloadCookie";
import { useState } from "react";
import { usePatch } from "@/hooks/usePatch";
import { createToaster } from "@/utils/createToaster";
import type { Response } from "@/interfaces/responses";

interface Props {
  payload: PayloadCookie | null;
  comment: Comment;
}

interface UpdateComment {
  content: string;
}

export default function ProductComment({ comment, payload }: Props) {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [originalContent, setOriginalContent] = useState(comment.content);

  const mutationUpdateComment = usePatch<UpdateComment, Response<string>>({
    url: `update-comment/${comment.id}`,
    onSuccess: (data) => {
      createToaster("Done", data.data, "success");
      setOriginalContent(content);
      setEdit(false);
    },
    onError: (error: any) =>
      createToaster("Error", error.response.data.data, "error"),
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`
      }
    }
  });

  const handleSave = () => {
    mutationUpdateComment.mutate({ content });
  };

  const handleCancel = () => {
    setContent(originalContent);
    setEdit(false);
  };

  const { Root, Preview, Input } = Editable;

  return (
    <Box borderWidth={1.5} className="comment panel">
      <HStack mb={2} justify="space-between">
        <div>
          <HStack gap={2}>
            <Icon as={FaRegUserCircle} boxSize="40px" />
            <Heading>{comment.user.username}</Heading>
          </HStack>
          <Text as="small" color="gray.500">
            {new Date(comment.createdAt).toLocaleTimeString()}
          </Text>
        </div>

        {payload && payload.id === comment.userId && (
          <CommentMenu
            setEdit={setEdit}
            commentId={comment.id}
            payload={payload}
            queryKey={["product-comments", comment.productId]}
          />
        )}
      </HStack>

      <Root
        value={content}
        onValueChange={(e) => setContent(e.value)}
        edit={edit}
        onSubmit={handleSave}
        display="flex"
        alignItems="center"
        className="update-comment"
      >
        <Preview _hover={{ bgColor: "transparent" }} />
        <Input />

        {edit && (
          <HStack>
            <Button
              size="sm"
              colorPalette="green"
              onClick={handleSave}
              loading={mutationUpdateComment.isPending}
            >
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </HStack>
        )}
      </Root>
    </Box>
  );
}

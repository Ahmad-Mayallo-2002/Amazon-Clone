import { useDelete } from "@/hooks/useDelete";
import type { Response } from "@/interfaces/responses";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import type { PayloadCookie } from "@/utils/payloadCookie";
import { Icon, IconButton, Menu, Portal } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  commentId: string;
  payload: PayloadCookie;
  queryKey: any[];
  setEdit: Dispatch<SetStateAction<boolean>>;
}

export default function CommentMenu({
  commentId,
  payload,
  queryKey,
  setEdit,
}: Props) {
  const { Root, Content, Item, Trigger, Positioner, Separator } = Menu;
  const mutationDeleteComment = useDelete<Response<string>>({
    url: `delete-comment/${commentId}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    },
    onSuccess: (data) => {
      createToaster("Done", data.data, "success");
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: any) =>
      createToaster("Error", error.response.data.data, "error"),
  });
  const handleDeleteComment = () => mutationDeleteComment.mutate();
  const handleEdit = (value: boolean) => setEdit(value);
  return (
    <Root>
      <Trigger asChild alignSelf="flex-start">
        <IconButton variant="outline" size="sm">
          <Icon as={BsThreeDotsVertical} />
        </IconButton>
      </Trigger>
      <Portal>
        <Positioner>
          <Content>
            <Item value="update" onClick={() => handleEdit(true)}>
              <Icon as={FaEdit} />
              Update
            </Item>
            <Separator />
            <Item onClick={handleDeleteComment} value="delete" color="red.500">
              <Icon as={FaTrash} />
              Delete
            </Item>
          </Content>
        </Positioner>
      </Portal>
    </Root>
  );
}

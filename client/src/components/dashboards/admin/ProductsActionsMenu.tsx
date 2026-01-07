import { useDelete } from "@/hooks/useDelete";
import type { CustomError, Response } from "@/interfaces/responses";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import type { PayloadCookie } from "@/utils/payloadCookie";
import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import UpdateProductDialog from "../vendor/UpdateProductDialog";
import { useState } from "react";

interface ActionsProps {
  productId: string;
  vendorId: string;
  payload: PayloadCookie | null;
}

export default function ProductsActionsMenu({
  payload,
  productId,
  vendorId,
}: ActionsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { Root, Trigger, Content, Item, Positioner } = Menu;

  const mutationDeleteVendor = useDelete<Response<string>>({
    url: `delete-product/${productId}/${vendorId}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
    onSuccess: (data) => {
      createToaster("Success", data.data, "success"),
        queryClient.invalidateQueries({ queryKey: ["products"] });
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

  const handleDeleteVendor = () => mutationDeleteVendor.mutate();
  return (
    <>
      <Root>
        <Trigger asChild>
          <IconButton colorPalette="gray" variant="outline" size="xs">
            <BsThreeDotsVertical />
          </IconButton>
        </Trigger>
        <Portal>
          <Positioner>
            <Content>
              <Item
                bgColor="#fff"
                color="fg.error"
                _hover={{ bgColor: "bg.error" }}
                value="delete-product"
                onClick={handleDeleteVendor}
              >
                Delete
              </Item>
              <Item
                value="update-product"
                onClick={() => setOpen(true)}
                closeOnSelect={false}
              >
                Update
              </Item>
            </Content>
          </Positioner>
        </Portal>
      </Root>
      <UpdateProductDialog
        open={open}
        setOpen={setOpen}
        productId={productId}
        vendorId={vendorId}
      />
    </>
  );
}

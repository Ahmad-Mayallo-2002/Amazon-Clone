import { useDelete } from "@/hooks/useDelete";
import { usePatch } from "@/hooks/usePatch";
import type { CustomError, Response } from "@/interfaces/responses";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import type { PayloadCookie } from "@/utils/payloadCookie";
import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ActionsProps {
  payload: PayloadCookie | null;
  vendorId: string;
  currentState: boolean;
}

interface PatchVendorStatus {
  status: boolean;
}

export default function VendorsActionsMenu({
  payload,
  vendorId,
  currentState,
}: ActionsProps) {
  const { Root, Item, Positioner, Content, Trigger } = Menu;

  const mutationUpdateVendorStatus = usePatch<
    PatchVendorStatus,
    Response<string>
  >({
    url: `verify-vendor/${vendorId}`,
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

  const handleUpdateVendorStatus = () =>
    mutationUpdateVendorStatus.mutate({
      status: currentState ? false : true,
    });

  const mutationDeleteVendor = useDelete<Response<string>>({
    url: `delete-vendor/${vendorId}`,
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
                onClick={handleDeleteVendor}
                color="red.500"
                value="delete-vendor"
              >
                Delete
              </Item>
              <Item onClick={handleUpdateVendorStatus} value="change-state">
                Change State
              </Item>
            </Content>
          </Positioner>
        </Portal>
      </Root>
    </>
  );
}

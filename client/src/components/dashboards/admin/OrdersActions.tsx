import { OrderStatus } from "@/enums/order-status";
import { PaymentStatus } from "@/enums/payment-status";
import { useDelete } from "@/hooks/useDelete";
import { usePatch } from "@/hooks/usePatch";
import type { CustomError, Response } from "@/interfaces/responses";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import type { PayloadCookie } from "@/utils/payloadCookie";
import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface OrdersProps {
  orderId: string;
  paymentId: string;
  userId: string;
  payload: PayloadCookie | null;
}

export default function OrdersActions({
  orderId,
  paymentId,
  payload,
}: OrdersProps) {
  const {
    Root,
    Trigger,
    Content,
    Item,
    Positioner,
    Separator,
    ItemGroup,
    ItemGroupLabel,
  } = Menu;

  const mutationDeleteOrder = useDelete<Response<string>>({
    url: `delete-order/${orderId}`,
    onSuccess: (data) => {
      createToaster("Done", data.data, "success");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      createToaster(
        "Error",
        (error as CustomError).response.data.message,
        "error"
      );
    },
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const mutationUpdatePaymentStatus = usePatch<
    { status: PaymentStatus },
    Response<string>
  >({
    url: `update-payment-status/${paymentId}`,
    onSuccess: (data) => {
      createToaster("Done", data.data, "success");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      createToaster(
        "Error",
        (error as CustomError).response.data.message,
        "error"
      );
    },
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const mutationUpdateOrderStatus = usePatch<
    { status: OrderStatus },
    Response<string>
  >({
    url: `update-order-status/${orderId}`,
    onSuccess: (data) => {
      createToaster("Done", data.data, "success");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      createToaster(
        "Error",
        (error as CustomError).response.data.message,
        "error"
      );
    },
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  return (
    <Root>
      <Trigger asChild>
        <IconButton variant="ghost" size="sm">
          <BsThreeDotsVertical />
        </IconButton>
      </Trigger>

      <Portal>
        <Positioner>
          <Content>
            <ItemGroup>
              <ItemGroupLabel>Order Status</ItemGroupLabel>
              {Object.values(OrderStatus).map((status) => (
                <Item
                  onClick={() => mutationUpdateOrderStatus.mutate({ status })}
                  key={"order-" + status}
                  value={"order-" + status}
                >
                  {status}
                </Item>
              ))}
            </ItemGroup>

            <Separator />

            <ItemGroup>
              <ItemGroupLabel>Payment Status</ItemGroupLabel>
              {Object.values(PaymentStatus).map((status) => (
                <Item
                  onClick={() => mutationUpdatePaymentStatus.mutate({ status })}
                  key={"payment-" + status}
                  value={"payment-" + status}
                >
                  {status}
                </Item>
              ))}
            </ItemGroup>

            <Separator />

            <Item
              value="delete-order"
              color="fg.error"
              _hover={{ bgColor: "bg.error" }}
              onClick={() => mutationDeleteOrder.mutate()}
            >
              Delete
            </Item>
          </Content>
        </Positioner>
      </Portal>
    </Root>
  );
}

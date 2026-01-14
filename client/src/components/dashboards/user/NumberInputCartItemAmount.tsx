import { usePost } from "@/hooks/usePost";
import type { CustomError, Response } from "@/interfaces/responses";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import type { PayloadCookie } from "@/utils/payloadCookie";
import { HStack, IconButton, NumberInput } from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";

interface NumberInputProps {
  defaultAmount: number;
  payload: PayloadCookie | null;
  productId: string;
}

export default function NumberInputCartItemAmount({
  defaultAmount,
  payload,
  productId,
}: NumberInputProps) {
  const { Root, DecrementTrigger, ValueText, IncrementTrigger } = NumberInput;
  const { mutate } = usePost<{ amount: number }, Response<string>>({
    url: `add-to-cart/${productId}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
    onError: (error) =>
      createToaster(
        "Error",
        (error as CustomError).response.data.message,
        "error"
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
    },
  });

  return (
    <Root
      defaultValue={`${defaultAmount}`}
      min={1}
      unstyled
      spinOnPress={false}
      onValueChange={(details) => mutate({ amount: details.valueAsNumber })}
    >
      <HStack gap="2">
        <DecrementTrigger asChild>
          <IconButton variant="outline" size="xs">
            <LuMinus />
          </IconButton>
        </DecrementTrigger>
        <ValueText textAlign="center" fontSize="lg" minW="3ch" />
        <IncrementTrigger asChild>
          <IconButton variant="outline" size="xs">
            <LuPlus />
          </IconButton>
        </IncrementTrigger>
      </HStack>
    </Root>
  );
}

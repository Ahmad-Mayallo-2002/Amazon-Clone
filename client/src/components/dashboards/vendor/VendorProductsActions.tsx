import { useDelete } from "@/hooks/useDelete";
import type { Response } from "@/interfaces/responses";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import { HStack, IconButton } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import UpdateProductDialog from "./UpdateProductDialog";

interface ActionsProps {
  token: string;
  productId: string;
  vendorId: string;
}

export default function VendorProductsActions({
  token,
  productId,
  vendorId,
}: ActionsProps) {
  const mutationDeleteProduct = useDelete<Response<string>>({
    url: `delete-product/${productId}/${vendorId}`,
    onSuccess: (data) => {
      createToaster("Done", data.data, "success");
      queryClient.invalidateQueries({
        queryKey: ["vendor-products"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const handleDeleteProduct = () => {
    mutationDeleteProduct.mutate();
  };

  return (
    <HStack gap={2}>
      <UpdateProductDialog productId={productId} />
      <IconButton
        size="sm"
        variant="ghost"
        colorPalette="red"
        onClick={handleDeleteProduct}
      >
        <FiTrash2 />
      </IconButton>
    </HStack>
  );
}

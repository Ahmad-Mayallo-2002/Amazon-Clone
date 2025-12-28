import { useDelete } from "@/hooks/useDelete";
import type { Response } from "@/interfaces/responses";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import { HStack, IconButton } from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function VendorProductsActions({
  token,
  productId,
  vendorId,
}: {
  token: string;
  productId: string;
  vendorId: string;
}) {
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
      <IconButton
        aria-label="Edit product"
        size="sm"
        variant="ghost"
        colorPalette="blue"
      >
        <FiEdit2 />
      </IconButton>
      <IconButton
        aria-label="Delete product"
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

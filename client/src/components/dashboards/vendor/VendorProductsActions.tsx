import { useDelete } from "@/hooks/useDelete";
import type { Response } from "@/interfaces/responses";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import { HStack, IconButton } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import UpdateProductDialog from "./UpdateProductDialog";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

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
  const [open, setOpen] = useState<boolean>(false);
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
      <UpdateProductDialog
        open={open}
        setOpen={setOpen}
        trigger={
          <IconButton
            onClick={() => setOpen(true)}
            size="sm"
            variant="ghost"
            colorPalette="blue"
          >
            <FaEdit />
          </IconButton>
        }
        vendorId={vendorId}
        productId={productId}
      />
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

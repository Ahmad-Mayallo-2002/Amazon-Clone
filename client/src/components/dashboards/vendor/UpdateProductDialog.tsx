import SelectCategory from "@/components/common/selects/SelectCategory";
import { usePatch } from "@/hooks/usePatch";
import type { CustomError, Response } from "@/interfaces/responses";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import { getPayload } from "@/utils/payloadCookie";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  IconButton,
  Image,
  Input,
  Portal,
  Span,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";

export interface FormProps {
  title: string;
  description: string;
  categoryId: string;
  price: string;
  stock: number;
  discount?: number;
  image: File;
}

export default function UpdateProductDialog({
  productId,
}: {
  productId: string;
}) {
  const payload = getPayload();
  const {
    Root,
    Trigger,
    CloseTrigger,
    Body,
    Content,
    Footer,
    Header,
    Title,
    Backdrop,
    Positioner,
  } = Dialog;

  const { ErrorIcon, ErrorText, Label, Root: FRoot } = Field;
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const mutationUpdateProduct = usePatch<{}, Response<string>>({
    url: `update-product/${productId}/${payload?.vendorId}`,
    onSuccess: (data) => {
      createToaster("Done", data.data, "success");
      queryClient.invalidateQueries({
        queryKey: ["vendor-products"],
      });
      setLoading(false);
    },
    onError: (error) => {
      console.log(error);
      createToaster(
        "Error",
        (error as CustomError).response.data.message,
        "error"
      );
      setLoading(false);
    },
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const file = input.files?.[0];
    const fileReader = new FileReader();
    if (file) fileReader.readAsDataURL(file);
    fileReader.onload = () => setImage(fileReader.result as string);
  };
  const onSubmit = (_data: FormProps, event: any) => {
    setLoading(true);
    const rawForm = new FormData(event.target);
    const filteredForm = new FormData();
    rawForm.forEach((value, key) => {
      if (value instanceof FileList) {
        if (value.length) filteredForm.append(key, value);
        return;
      }
      if (value) filteredForm.append(key, value);
    });
    mutationUpdateProduct.mutate(filteredForm);
  };

  return (
    <Root>
      <Trigger asChild>
        <IconButton size="sm" variant="ghost" colorPalette="blue">
          <FiEdit2 />
        </IconButton>
      </Trigger>
      <Portal>
        <Backdrop />
        <Positioner>
          <Content>
            <Header>
              <Title>Update Product</Title>
            </Header>
            <Body>
              <form onSubmit={handleSubmit(onSubmit)} id="update-product">
                <VStack gap={4}>
                  {/* Image */}
                  <FRoot invalid={!!errors.image}>
                    <Label
                      bgColor="#f1f1f1"
                      rounded="md"
                      w="full"
                      htmlFor="image"
                      h="200px"
                      cursor="pointer"
                    >
                      {image ? (
                        <Image src={image} rounded="md" w="100%" h="100%" />
                      ) : (
                        <Span mx="auto">Select Image</Span>
                      )}
                    </Label>
                    <Input
                      type="file"
                      id="image"
                      hidden
                      accept="image/*"
                      {...register("image", {
                        onChange: handleChangeImage,
                      })}
                    />
                    {errors.image && (
                      <ErrorText>
                        <ErrorIcon />
                        {errors.image.message}
                      </ErrorText>
                    )}
                  </FRoot>
                  {/* Title */}
                  <FRoot invalid={!!errors.title}>
                    <Label>Title</Label>
                    <Input placeholder="Product Title" {...register("title")} />
                    {errors.title && (
                      <ErrorText>
                        <ErrorIcon />
                        {errors.title.message}
                      </ErrorText>
                    )}
                  </FRoot>
                  {/* Flex Price and Stock */}
                  <Flex w="full" gap={4}>
                    {/* Price */}
                    <FRoot invalid={!!errors.price}>
                      <Label>Price</Label>
                      <Input
                        placeholder="Product Price"
                        {...register("price", {
                          validate: (value) =>
                            !isNaN(+value) || "Price must be a number",
                        })}
                      />
                      {errors.price && (
                        <ErrorText>
                          <ErrorIcon />
                          {errors.price.message}
                        </ErrorText>
                      )}
                    </FRoot>
                    {/* Stock */}
                    <FRoot invalid={!!errors.stock}>
                      <Label>Stock</Label>
                      <Input
                        placeholder="Product Stock"
                        {...register("stock", {
                          validate: (value) =>
                            Number.isInteger(+value) ||
                            "Stock must be a number",
                        })}
                      />
                      {errors.stock && (
                        <ErrorText>
                          <ErrorIcon />
                          {errors.stock.message}
                        </ErrorText>
                      )}
                    </FRoot>
                  </Flex>
                  {/* Flex Category and Discount */}
                  <Flex w="full" gap={4}>
                    {/* Category */}
                    <FRoot invalid={!!errors.categoryId}>
                      <SelectCategory required={false} register={register} />
                      {errors.categoryId && (
                        <ErrorText>
                          <ErrorIcon />
                          {errors.categoryId.message}
                        </ErrorText>
                      )}
                    </FRoot>
                    {/* Discount */}
                    <FRoot invalid={!!errors.discount}>
                      <Label>Discount</Label>
                      <Input
                        placeholder="Product Discount"
                        {...register("discount", {
                          pattern: {
                            value: /\d/,
                            message: "Discount must be numeric",
                          },
                          min: {
                            value: 0,
                            message: "Discount cannot be negative",
                          },
                        })}
                      />
                      {errors.discount && (
                        <ErrorText>
                          <ErrorIcon />
                          {errors.discount.message}
                        </ErrorText>
                      )}
                    </FRoot>
                  </Flex>
                  {/* Description */}
                  <FRoot invalid={!!errors.description}>
                    <Label>Description</Label>
                    <Textarea
                      h="200px"
                      resize="none"
                      placeholder="Product Description"
                      {...register("description")}
                    />
                    {errors.description && (
                      <ErrorText>
                        <ErrorIcon />
                        {errors.description.message}
                      </ErrorText>
                    )}
                  </FRoot>
                </VStack>
              </form>
            </Body>
            <Footer>
              <Button colorPalette="red">Cancel</Button>
              <Button
                loading={loading}
                loadingText="Loading..."
                form="update-product"
                type="submit"
                colorPalette="blue"
              >
                Update
              </Button>
            </Footer>
            <CloseTrigger asChild>
              <CloseButton size="md" />
            </CloseTrigger>
          </Content>
        </Positioner>
      </Portal>
    </Root>
  );
}

import SelectCategory from "@/components/common/selects/SelectCategory";
import { usePost } from "@/hooks/usePost";
import type { Product } from "@/interfaces/product";
import type { Response } from "@/interfaces/responses";
import { queryClient } from "@/main";
import { createToaster } from "@/utils/createToaster";
import { getPayload } from "@/utils/payloadCookie";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  Icon,
  Image,
  Input,
  Portal,
  Span,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";

export interface FormProps {
  title: string;
  description: string;
  categoryId: string;
  price: string;
  stock: number;
  discount?: number;
  image: File;
}

export default function CreateProductDialog() {
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
  } = useForm<FormProps>({
    defaultValues: {
      discount: 0,
    },
  });

  const mutationAddProduct = usePost<{}, Response<Product>>({
    url: "create-product",
    onSuccess: (data) => {
      createToaster("Done", data.message, "success");
      queryClient.invalidateQueries({
        queryKey: ["vendor-products"],
      });
      setLoading(false);
    },
    onError: (error) => {
      console.log(error);
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
    const form = new FormData(event.target);
    mutationAddProduct.mutate(form);
  };

  return (
    <Root>
      <Trigger asChild>
        <Button colorPalette="orange">
          <Icon as={FiPlus} />
          Add New Product
        </Button>
      </Trigger>
      <Portal>
        <Backdrop />
        <Positioner>
          <Content>
            <Header>
              <Title>Create Product</Title>
            </Header>
            <Body>
              <form onSubmit={handleSubmit(onSubmit)} id="create-product">
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
                        required: "Image is required",
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
                    <Input
                      placeholder="Product Title"
                      {...register("title", {
                        required: "Title is required",
                      })}
                    />
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
                          required: "Price is required",
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
                          required: "Stock is required",
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
                      <SelectCategory register={register} />
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
                      {...register("description", {
                        required: "Description is required",
                      })}
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
                form="create-product"
                type="submit"
                colorPalette="blue"
              >
                Create
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

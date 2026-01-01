import MainSpinner from "@/components/ui/MainSpinner";
import { useFetch } from "@/hooks/useFetch";
import { usePatch } from "@/hooks/usePatch";
import type { CustomError, Response } from "@/interfaces/responses";
import type { Vendor } from "@/interfaces/user";
import { createToaster } from "@/utils/createToaster";
import { getPayload } from "@/utils/payloadCookie";
import {
  Button,
  Center,
  Circle,
  Editable,
  Heading,
  HStack,
  Icon,
  Separator,
  SimpleGrid,
  Span,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function VendorProfile() {
  const payload = getPayload();
  const [edit, setEdit] = useState<boolean>(false);
  const [user, setUser] = useState({});
  const [vendor, setVendor] = useState({});

  const { data, error, isLoading } = useFetch<Response<Vendor>>({
    queryKey: ["get-vendor"],
    url: `get-vendors/${payload?.vendorId}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
  });

  const { Root, Label, Input, Textarea, Preview } = Editable;
  const handleEdit = () => setEdit(!edit);

  const mutationUpdateUser = usePatch<{}, Response<string>>({
    url: `update-user/${payload?.id}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
    onSuccess: (data) => createToaster("Done", data.data, "success"),
    onError: (error) => {
      const errors = error.response.data.error;
      for (const key in errors)
        createToaster("Error", errors[key].errors[0], "error");
    },
  });

  const mutationUpdateVendor = usePatch<{}, Response<string>>({
    url: `update-vendor/${payload?.vendorId}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
    onSuccess: (data) => createToaster("Done", data.data, "success"),
    onError: (error) => {
      const errors = error.response.data.error;
      if (Array.isArray(errors)) {
        for (const key in errors)
          createToaster("Error", errors[key].errors[0], "error");
      } else {
        createToaster("Error", error.response.data.message, "error");
      }
    },
  });

  const handleUpdate = () => {
    if (Object.keys(user).length) mutationUpdateUser.mutate(user);
    if (Object.keys(vendor).length) mutationUpdateVendor.mutate(vendor);
    setEdit(false);
  };

  if (isLoading)
    return (
      <Center h="400px">
        <MainSpinner h="100px" w="100px" />
      </Center>
    );

  if (error)
    return <Heading>{(error as CustomError).response.data.message}</Heading>;

  return (
    <>
      <HStack
        justify="space-between"
        alignItems="center"
        flexWrap="wrap"
        gapY={3}
        mb={2}
      >
        <Heading fontSize="2xl" fontWeight="bold">
          Store Profile
        </Heading>
        {edit ? (
          <>
            <HStack>
              <Button colorPalette="blue" onClick={handleUpdate}>
                Save
              </Button>
              <Button colorPalette="red" onClick={handleEdit}>
                Cancel
              </Button>
            </HStack>
          </>
        ) : (
          <Button onClick={handleEdit} className="main-button" color="#fff">
            <Icon as={FaEdit} boxSize="20px" />
            <Span display={{ base: "none", md: "inline" }}>Edit Profile</Span>
          </Button>
        )}
      </HStack>

      <HStack>
        <Circle bgColor="orange" h="80px" w="80px">
          <Heading color="#fff" fontWeight={700} fontSize="3xl">
            {data?.data.storeName.slice(0, 2).toUpperCase()}
          </Heading>
        </Circle>
        <Heading fontWeight={700}>
          {data?.data.storeName.replace("-", " ")}
        </Heading>
      </HStack>

      <Separator my={6} />

      <SimpleGrid gap={4} columns={{ base: 1, lg: 2 }}>
        {/* Email */}
        <Root
          defaultValue={data?.data.user.email}
          className="edit-vendor-root"
          edit={edit}
          onValueChange={(d) =>
            setUser((prev) => ({ ...prev, email: d.value }))
          }
        >
          <Label className="edit-vendor-label">Email</Label>
          <Preview _hover={{ bgColor: "transparent" }} />
          <Input className="field" p={2} outline="none" />
        </Root>
        {/* Username */}
        <Root
          defaultValue={data?.data.user.username}
          className="edit-vendor-root"
          edit={edit}
          onValueChange={(d) =>
            setUser((prev) => ({ ...prev, username: d.value }))
          }
        >
          <Label className="edit-vendor-label">Username</Label>
          <Preview _hover={{ bgColor: "transparent" }} />
          <Input className="field" p={2} outline="none" />
        </Root>
        {/* Phone */}
        <Root
          defaultValue={data?.data.user.phone}
          className="edit-vendor-root"
          edit={edit}
          onValueChange={(d) =>
            setUser((prev) => ({ ...prev, phone: d.value }))
          }
        >
          <Label className="edit-vendor-label">Phone</Label>
          <Preview _hover={{ bgColor: "transparent" }} />
          <Input className="field" p={2} outline="none" />
        </Root>
        {/* Store Name */}
        <Root
          defaultValue={data?.data.storeName}
          className="edit-vendor-root"
          edit={edit}
          onValueChange={(d) =>
            setVendor((prev) => ({ ...prev, storeName: d.value }))
          }
        >
          <Label className="edit-vendor-label">Store Name</Label>
          <Preview _hover={{ bgColor: "transparent" }} />
          <Input className="field" p={2} outline="none" />
        </Root>
        {/* Store Description */}
        <Root
          defaultValue={data?.data.storeDescription}
          className="edit-vendor-root"
          gridColumn="1 / -1"
          edit={edit}
          onValueChange={(d) =>
            setVendor((prev) => ({ ...prev, storeDescription: d.value }))
          }
        >
          <Label className="edit-vendor-label">Store Description</Label>
          <Preview _hover={{ bgColor: "transparent" }} />
          <Textarea
            className="field"
            p={2}
            outline="none"
            maxLength={255}
            h="100px"
            resize="none"
          />
        </Root>
      </SimpleGrid>
    </>
  );
}

import { usePatch } from "@/hooks/usePatch";
import type { CustomError, Response } from "@/interfaces/responses";
import { createToaster } from "@/utils/createToaster";
import { getPayload } from "@/utils/payloadCookie";
import { Button, Field, Heading, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface UserForm {
  username: string;
  email: string;
  phone: string;
}

export default function UserProfile() {
  const payload = getPayload();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>();

  const { Root, Label, ErrorText, ErrorIcon } = Field;

  const updateProfile = usePatch<UserForm, Response<string>>({
    url: `update-user/${payload?.id}`,
    config: {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    },
    onSuccess: (data) => {
      createToaster("Done", data.data, "success");
    },
    onError: (error) => {
      const customError = error as CustomError;
      const err = customError.response.data.error;
      for (const key in err)
        createToaster("Error", err[key].errors[0], "error");
    },
  });

  const onSubmit = async (data: UserForm) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );
    updateProfile.mutate(cleanedData as UserForm);
  };

  return (
    <>
      <Heading className="dashboard-heading" mb={6}>
        User Profile Data
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4} align="stretch">
          {/* Username */}
          <Root invalid={!!errors.username}>
            <Label>Username</Label>
            <Input
              placeholder="Enter username"
              {...register("username", {
                // minLength: {
                //   value: 5,
                //   message: "Username must be at least 5 characters",
                // },
              })}
            />
            {errors.username && (
              <ErrorText>
                <ErrorIcon boxSize="15px" />
                {errors.username?.message}
              </ErrorText>
            )}
          </Root>

          {/* Email */}
          <Root invalid={!!errors.email}>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                pattern: {
                  value: /^[A-Za-z0-9][A-Za-z0-9._%+-]*@gmail\.com$/i,
                  message: "Invalid email syntax.",
                },
              })}
            />
            {errors.email && (
              <ErrorText>
                <ErrorIcon boxSize="15px" />
                {errors.email?.message}
              </ErrorText>
            )}
          </Root>

          {/* Phone */}
          <Root invalid={!!errors.phone}>
            <Label>Phone</Label>
            <Input
              placeholder="Enter phone number"
              {...register("phone", {
                pattern: {
                  value: /^\+[1-9]\d{1,14}$/,
                  message: "Invalid Phone Number Syntax",
                },
              })}
            />
            {errors.phone && (
              <ErrorText>
                <ErrorIcon boxSize="15px" />
                {errors.phone?.message}
              </ErrorText>
            )}
          </Root>

          {/* Submit Button */}
          <Button colorPalette="yellow" type="submit" loading={isSubmitting}>
            Update
          </Button>
        </VStack>
      </form>
    </>
  );
}

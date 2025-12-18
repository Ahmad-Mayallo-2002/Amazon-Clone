import { PasswordInput } from "@/components/ui/password-input";
import { usePatch } from "@/hooks/usePatch";
import type { Response } from "@/interfaces/responses";
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Link,
  Text,
  VStack,
  Field,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface IResetPassword {
  password: string;
  confirmPassword: string;
}

function ResetPassword() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IResetPassword>();
  const navigate = useNavigate();
  const password = watch("password");
  const resetPasswordMutation = usePatch<IResetPassword, Response<string>>({
    url: "reset-password",
    onSuccess: (data) => {
      console.log(data);
      navigate("/auth/login");
    },
    onError: (error) => console.log(error),
  });

  const onSubmit = (data: IResetPassword) => resetPasswordMutation.mutate(data);

  const { Root, Label, RequiredIndicator, ErrorIcon, ErrorText } = Field;

  return (
    <Center px={6} py={12} minH="100vh" bg="#fff">
      <VStack gap={3} w="100%">
        <Box p={6} rounded="md" shadow="md" w="100%" maxW="400px">
          <VStack gap={3}>
            {/* Icon */}
            <Center bg="yellow.400" rounded="full" boxSize={12}>
              <Icon as={FaLock} color="white" fontSize="3xl" />
            </Center>

            {/* Title */}
            <Heading size="2xl" fontWeight={700}>
              Create new password
            </Heading>

            {/* Subtitle */}
            <Text fontSize="sm" color="gray.600" textAlign="center">
              Your new password must be different from previously used
              passwords.
            </Text>

            {/* Form */}
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              {/* New Password */}
              <Root invalid={!!errors.password}>
                <Label fontSize="sm">
                  New password <RequiredIndicator>*</RequiredIndicator>
                </Label>
                <PasswordInput
                  placeholder="Enter new password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must not exceed 20 characters",
                    },
                  })}
                />
                {errors.password && (
                  <ErrorText>
                    <ErrorIcon size="sm" />
                    {errors.password.message}
                  </ErrorText>
                )}
              </Root>

              {/* Confirm Password */}
              <Root mt={4} invalid={!!errors.confirmPassword}>
                <Label fontSize="sm">
                  Confirm new password <RequiredIndicator>*</RequiredIndicator>
                </Label>
                <PasswordInput
                  placeholder="Re-enter new password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <ErrorText>
                    <ErrorIcon size="sm" /> {errors.confirmPassword.message}
                  </ErrorText>
                )}
              </Root>

              {/* Reset Button */}
              <Button
                w="100%"
                mt={6}
                type="submit"
                loading={isSubmitting}
                colorPalette="yellow"
              >
                Reset password
              </Button>
            </form>

            {/* Back */}
            <Link
              fontSize="sm"
              href="/login"
              _hover={{ color: "blue.600" }}
              color="blue.500"
            >
              Back to Sign in
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Center>
  );
}

export default ResetPassword;

import { PasswordInput } from "@/components/ui/password-input";
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

  const password = watch("password");

  const onSubmit = (data: IResetPassword) => {
    console.log("Reset password:", data.password);
  };

  const { Root, Label, RequiredIndicator, ErrorIcon, ErrorText } = Field;

  return (
    <Center px={6} py={24} minH="100vh" bg="gray.50">
      <VStack gap={6} w="100%">
        <Box bg="white" p={8} rounded="md" shadow="md" w="100%" maxW="420px">
          <VStack gap={6}>
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
                className="main-button"
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

import { PasswordInput } from "@/components/ui/password-input";
import { usePost } from "@/hooks/usePost";
import type { CustomError, Response } from "@/interfaces/responses";
import type { SignUpUserRequest } from "@/interfaces/signUp";
import type { User } from "@/interfaces/user";
import { createToaster } from "@/utils/createToaster";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  Field,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpUserRequest>();
  const navigate = useNavigate();
  const { Root, Label, ErrorIcon, ErrorText, HelperText } = Field;

  const password = watch("password");

  const signUpMutation = usePost<SignUpUserRequest, Response<User>>({
    url: "register",
    onSuccess: (_data) => createToaster("Done", "Sign Up is Done", "success"),
    onError: (error) => {
      const errorReason = (error as CustomError).response.data.error;
      if (typeof errorReason !== "string") {
        for (const key in errorReason)
          for (const validationMessage in errorReason[key])
            createToaster("Error", validationMessage, "error");
      } else {
        createToaster("Error", errorReason, "error");
      }
    },
  });
  const onSubmit = (data: SignUpUserRequest) => {
    try {
      signUpMutation.mutate(data);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center minH="100vh" py={12} bg="#fff">
      <Box
        p={6}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <VStack gap={3} as="form" onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h1" size="2xl" fontWeight={700} mb={4}>
            Create account
          </Heading>

          {/* 1. Name Input */}
          <Root invalid={!!errors.username}>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("username", {
                required: "Your username is required.",
              })}
            />
            <ErrorText>
              <ErrorIcon size="sm" />
              {errors.username && errors.username.message}
            </ErrorText>
          </Root>

          {/* 2. Email Input */}
          <Root invalid={!!errors.email}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[A-Za-z0-9][A-Za-z0-9._%+-]*@gmail\.com$/i,
                  message: "Invalid email syntax.",
                },
              })}
            />
            <ErrorText>
              <ErrorIcon size="sm" />
              {errors.email && errors.email.message}
            </ErrorText>
          </Root>

          {/* 3. Phone Input */}
          <Root invalid={!!errors.phone}>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...register("phone", {
                required: "Your Phone Number is required.",
                pattern: {
                  value: /^\+[1-9]\d{1,14}$/,
                  message: "Invalid Phone Number Syntax",
                },
              })}
            />
            <ErrorText>
              <ErrorIcon size="sm" />
              {errors.phone && errors.phone.message}
            </ErrorText>
          </Root>

          {/* 4. Password Input */}
          <Root invalid={!!errors.password}>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              {...register("password", {
                required: "Password is required.",
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
            {/* Custom help text below password field */}
            {!errors.password ? (
              <HelperText>Passwords must be at least 8 characters.</HelperText>
            ) : (
              <ErrorText>
                <ErrorIcon size="sm" />
                {errors.password.message}
              </ErrorText>
            )}
          </Root>

          {/* 4. Re-enter Password Input */}
          <Root invalid={!!errors.reEnterPassword}>
            <Label htmlFor="reEnterPassword">Re-enter password</Label>
            <PasswordInput
              id="reEnterPassword"
              {...register("reEnterPassword", {
                required: "Please re-enter your password.",
                validate: (value) =>
                  value === password || "Passwords do not match.",
              })}
            />
            {errors.reEnterPassword && (
              <ErrorText>
                <ErrorIcon size="sm" />
                {errors.reEnterPassword.message}
              </ErrorText>
            )}
          </Root>

          {/* Submit Button */}
          <Button
            type="submit"
            loading={isSubmitting}
            colorPalette="yellow"
            width="full"
            mt={4}
            py={2}
          >
            Sign Up
          </Button>

          {/* Terms and Privacy Text */}
          <Text fontSize="sm" color="gray.600" textAlign="center" mt={4}>
            By creating an account, you agree to Amazon's{" "}
            <Link color="blue.500" href="#">
              Conditions of Use
            </Link>{" "}
            and{" "}
            <Link color="blue.500" href="#">
              Privacy Notice
            </Link>
            .
          </Text>

          {/* Login Link */}
          <Box pt={4} width="full" borderTop="1px solid" borderColor="gray.200">
            <Text fontSize="sm" textAlign="left">
              Already have an account?{" "}
              <Link color="blue.500" href="/auth/login">
                Login
              </Link>
            </Text>

            {/* Business Account Link */}
            <Text fontSize="sm" mt={2} textAlign="left">
              Buying for work?{" "}
              <Link color="blue.500" href="/auth/sign-up-vendor">
                Create a free business account
              </Link>
            </Text>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
}

export default SignUp;

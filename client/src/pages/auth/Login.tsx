import { PasswordInput } from "@/components/ui/password-input";
import { Roles } from "@/enums/roles";
import { usePost } from "@/hooks/usePost";
import type { ILogin } from "@/interfaces/login";
import type { Response } from "@/interfaces/responses";
import { createToaster } from "@/utils/createToaster";
import { setPayload } from "@/utils/payloadCookie";
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
  Separator,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface SignInRequest {
  email: string;
  password: string;
}

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInRequest>();
  const { ErrorIcon, ErrorText, Label, Root } = Field;
  const navigate = useNavigate();
  const loginMutation = usePost<SignInRequest, Response<ILogin>>({
    url: "login",
    onSuccess: async (data) => {
      const payload = data.data;
      setPayload(payload);
      if (payload.role === Roles.USER) navigate("/");
      else if (payload.role === Roles.VENDOR) navigate("/vendor-dashboard");
      else if (payload.role === Roles.ADMIN) navigate("/admin-dashboard");
    },
    onError: (error: any) =>
      createToaster("Error", error.response.data.message, "error"),
  });

  const onSubmit = (data: SignInRequest) => loginMutation.mutate(data);

  return (
    <Center minH="100vh" py={12} bg="white">
      <Box
        p={6}
        maxWidth="400px" // Slightly smaller box for Sign In form
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <VStack gap={3} as="form" onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h1" size="2xl" mb={2} fontWeight={700}>
            Login
          </Heading>

          {/* 1. Email or Mobile Phone Number Input */}
          <Root invalid={!!errors.email}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email", {
                required: "Enter your email",
                pattern: {
                  value: /^[A-Za-z0-9][A-Za-z0-9._%+-]*@gmail\.com$/,
                  message: "Invalid Email Syntax",
                },
              })}
            />
            {errors.email && (
              <ErrorText>
                <ErrorIcon size="sm" />
                {errors.email.message}
              </ErrorText>
            )}
          </Root>

          {/* 2. Password Input with Forgot Password Link */}
          <Root invalid={!!errors.password} mt={4}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Label htmlFor="password" mb={1}>
                Password
              </Label>
            </Box>
            <PasswordInput
              id="password"
              {...register("password", {
                required: "Enter your password.",
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

          {/* Sign In Button */}
          <Button
            type="submit"
            loading={isSubmitting}
            colorPalette="yellow"
            width="full"
            mt={4}
          >
            Sign in
          </Button>

          <Link fontSize="xs" color="blue.500" href="/password-assistance">
            Forgot password?
          </Link>

          {/* Terms and Privacy Text */}
          <Text fontSize="xs" color="gray.600" textAlign="left" pt={1}>
            By continuing, you agree to Amazon's{" "}
            <Link color="blue.500" href="#">
              Conditions of Use
            </Link>{" "}
            and{" "}
            <Link color="blue.500" href="#">
              Privacy Notice
            </Link>
            .
          </Text>

          {/* Need help Link */}
          <Link
            fontSize="sm"
            color="blue.500"
            href="#"
            alignSelf="flex-start"
            pt={2}
          >
            Need help?
          </Link>
        </VStack>

        {/* Divider and Create Account Button */}
        <Box pt={1} mt={6}>
          <Separator mb={4} />
          <Text fontSize="sm" color="gray.600" textAlign="center" mb={2}>
            New to Amazon?
          </Text>
          <Button variant="outline" colorPalette="gray" w="full" asChild>
            <Link href="/auth/sign-up">Create your Amazon account</Link>
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

export default Login;

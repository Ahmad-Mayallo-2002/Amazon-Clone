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

interface SignUpFormInputs {
  username: string;
  email: string;
  password: string;
  reEnterPassword: string;
}

function SignUp() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>();
  const { Root, Label, ErrorIcon, ErrorText, RequiredIndicator, HelperText } =
    Field;

  const password = watch("password", "");

  const onSubmit = async (data: SignUpFormInputs) => {
    console.log("Form Data Submitted:", data);
    try {
      // Simulate an API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // You would typically redirect the user here
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center minH="100vh" py={24} bg="#fff">
      <Box
        p={8}
        maxWidth="450px" // Adjusted to match typical form width
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <VStack gap={6} as="form" onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h1" size="2xl" fontWeight={700} mb={4}>
            Create account
          </Heading>

          {/* 1. Name Input */}
          <Root invalid={!!errors.username}>
            <Label htmlFor="username">
              Username <RequiredIndicator>*</RequiredIndicator>
            </Label>
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
            <Label htmlFor="email">
              Email <RequiredIndicator>*</RequiredIndicator>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address.",
                },
              })}
            />
            <ErrorText>
              <ErrorIcon size="sm" />
              {errors.email && errors.email.message}
            </ErrorText>
          </Root>

          {/* 3. Password Input */}
          <Root invalid={!!errors.password}>
            <Label htmlFor="password">
              Password <RequiredIndicator>*</RequiredIndicator>
            </Label>
            <Input
              id="password"
              type="password"
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
              <HelperText>Passwords must be at least 6 characters.</HelperText>
            ) : (
              <ErrorText>
                <ErrorIcon size="sm" />
                {errors.password.message}
              </ErrorText>
            )}
          </Root>

          {/* 4. Re-enter Password Input */}
          <Root invalid={!!errors.reEnterPassword}>
            <Label htmlFor="reEnterPassword">
              Re-enter password <RequiredIndicator>*</RequiredIndicator>
            </Label>
            <Input
              id="reEnterPassword"
              type="password"
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
            className="main-button"
            width="full"
            mt={4}
            py={2} // Padding to match the look
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

          {/* Sign In Link */}
          <Box pt={4} width="full" borderTop="1px solid" borderColor="gray.200">
            <Text fontSize="sm" textAlign="left">
              Already have an account?{" "}
              <Link color="blue.500" href="#">
                Sign in
              </Link>
            </Text>

            {/* Business Account Link */}
            <Text fontSize="sm" mt={2} textAlign="left">
              Buying for work?{" "}
              <Link color="blue.500" href="/sign-up-vendor">
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

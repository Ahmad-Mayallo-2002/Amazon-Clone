import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  Center,
  Icon,
  Link,
  Field,
} from "@chakra-ui/react";
import { FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";

// Define the shape of the form data
type FormInputs = {
  email: string;
};

function PasswordAssistance() {
  // Hooks for form management
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const { ErrorIcon, ErrorText, Label, Root, RequiredIndicator } = Field;

  const onSubmit = async (data: FormInputs) => {
    console.log("Attempting password reset for:", data.email);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center minH="100vh" px={6} py={24} bgColor="#fff">
      <Box
        p={8}
        maxWidth="350px"
        w="full"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="xl"
      >
        <VStack gap={6} align="stretch">
          <Center bg="yellow.400" rounded="full" boxSize={12} mx="auto">
            {/* Lock Icon */}
            <Icon as={FiLock} color="white" fontSize="3xl" />
          </Center>

          <Box textAlign="center">
            {/* Title */}
            <Heading as="h1" size="2xl" fontWeight={700} mb={2}>
              Password assistance
            </Heading>
            {/* Description */}
            <Text fontSize="sm" color="#777">
              Enter the email address associated with your account and we'll
              send you a verification code to reset your password.
            </Text>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Root invalid={!!errors.email}>
              <Label fontWeight="medium" fontSize="sm">
                Email address <RequiredIndicator>*</RequiredIndicator>
              </Label>
              {/* Email Input */}
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9][A-Za-z0-9._%+-]*@gmail\.com$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {/* Error Message */}
              {errors.email && (
                <ErrorText mt={1} color="red.500" fontSize="sm">
                  <ErrorIcon size="sm" />
                  {errors.email.message}
                </ErrorText>
              )}

              {/* Continue Button */}
              <Button
                className="main-button"
                loading={isSubmitting}
                type="submit"
                w="full"
                mt={2}
              >
                Continue
              </Button>
            </Root>
          </form>

          {/* Email Changed Section */}
          <Box pt={2} textAlign="center" color="#777">
            <Text fontSize="sm">Has your email address changed?</Text>
            <Text fontSize="sm">
              If you no longer have access to the email address associated with
              your account, you may contact{" "}
              <Link color="blue.500" href="#">
                Customer Service
              </Link>{" "}
              for help restoring access to your account.
            </Text>
          </Box>

          {/* Security Notice Alert */}
          {/* <Alert status="info" borderRadius="md" py={3} colorScheme="blue">
            <AlertIcon />
            <Box fontSize="sm">
              <Text fontWeight="semibold">Security notice:</Text>
              <Text>
                We will never ask you for your password via email or phone. If
                you receive a suspicious message, please report it to our
                security team.
              </Text>
            </Box>
          </Alert> */}

          {/* Back to Sign In Link */}
          <Center pt={2}>
            <Link
              color="blue.500"
              href="/login" // Replace with your sign-in route
              fontSize="sm"
              _hover={{ color: "blue.600" }}
            >
              Back to Sign In
            </Link>
          </Center>
        </VStack>
      </Box>
    </Center>
  );
}

export default PasswordAssistance;

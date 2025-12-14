import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Link,
  Text,
  VStack,
  PinInput,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";

function VerifyEmail() {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    console.log("OTP:", otp);
  };

  const handleResend = () => {
    console.log("Resend OTP");
  };

  const { Root, HiddenInput, Control, Input } = PinInput;

  return (
    <Center minH="100vh" px={6} py={24}>
      <Box
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
        w="100%"
        maxW="350px"
        textAlign="center"
      >
        <VStack gap={6}>
          {/* Icon */}
          <Center bg="yellow.400" rounded="full" boxSize={12}>
            <Icon as={MdOutlineMailOutline} color="white" fontSize="3xl" />
          </Center>

          {/* Title */}
          <Heading size="xl" fontWeight={700}>
            Verify your email
          </Heading>

          {/* Description */}
          <Text fontSize="sm" color="gray.600">
            We’ve sent a 6-digit verification code to your email address. Please
            enter it below.
          </Text>

          {/* OTP Input */}
          <Root onValueChange={(e) => setOtp(e.valueAsString)}>
            <HiddenInput />
            <Control>
              {Array.from({ length: 6 }).map((_v, i) => (
                <Input
                  _focus={{ outline: "none" }}
                  colorPalette="yellow"
                  key={i}
                  index={i}
                />
              ))}
            </Control>
          </Root>

          {/* Verify Button */}
          <Button
            className="main-button"
            w="100%"
            onClick={handleVerify}
            disabled={otp.length !== 6}
          >
            Verify and continue
          </Button>

          {/* Resend */}
          <Link fontSize="sm" color="blue.500" onClick={handleResend}>
            Resend verification code
          </Link>

          {/* Back */}
          <Link
            fontSize="sm"
            href="/auth/login"
            color="blue.500"
            _hover={{ color: "blue.600" }}
          >
            Back to Sign in
          </Link>

          {/* Footer text */}
          <Text fontSize="xs" color="gray.400">
            Didn’t receive the code? Check your spam folder or try resending.
          </Text>
        </VStack>
      </Box>
    </Center>
  );
}

export default VerifyEmail;

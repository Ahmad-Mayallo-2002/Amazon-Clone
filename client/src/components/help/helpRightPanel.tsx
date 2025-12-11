import {
  Box,
  Button,
  Text,
  VStack,
  Icon,
  Heading,
  List,
  Link,
} from "@chakra-ui/react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaPhone, FaInfoCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const quickLinks: string[] = [
  "Shipping Policies",
  "Return Guidelines",
  "Privacy Policy",
  "Terms of Service",
  "Accessibility",
];

export const HelpRightPanel = () => {
  const { Root, Item } = List;
  return (
    <VStack gap={6} as="aside" className="help-right-panel">
      {/* Contact Customer Service */}
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        w="full"
        bg="white"
        boxShadow="sm"
      >
        <Heading fontSize="xl" fontWeight="bold" mb={2}>
          Contact Customer Service
        </Heading>

        <Text fontSize="sm" color="gray.600" mb={4}>
          Our support team is available 24/7 to help you with any questions or
          concerns.
        </Text>

        <VStack gap={3}>
          <Button w="100%" colorPalette="yellow" fontWeight="medium">
            <IoChatbubbleEllipsesSharp />
            Start Live Chat
          </Button>

          <Button w="100%" variant="outline">
            <FaPhone />
            Call Us
          </Button>

          <Button w="100%" variant="outline">
            <MdEmail />
            Email Support
          </Button>
        </VStack>
      </Box>

      {/* Need More Help Section */}
      <Box
        borderRadius="lg"
        p={6}
        bg="#005F6B"
        color="white"
        w="full"
        className="more-help"
      >
        <VStack align="start" gap={3}>
          <Icon as={FaInfoCircle} boxSize={6} />

          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Need More Help?
            </Text>
            <Text fontSize="sm" color="whiteAlpha.800">
              Check out our comprehensive help center with detailed guides and
              tutorials.
            </Text>
          </Box>

          <Button w="100%" bg="white" color="black" _hover={{ bg: "gray.200" }}>
            Visit Help Center
          </Button>
        </VStack>
      </Box>

      <Box
        className="quick-links"
        bgColor="#fff"
        p={6}
        w="full"
        borderRadius="lg"
      >
        <Heading mb={4} fontWeight={700} fontSize="2xl">
          Quick Links
        </Heading>

        <Root display="grid" gap={2}>
          {quickLinks.map((link) => (
            <Item asChild>
              <Link href="/" color="blue.500" _hover={{ color: "blue.700" }}>
                {link}
              </Link>
            </Item>
          ))}
        </Root>
      </Box>
    </VStack>
  );
};

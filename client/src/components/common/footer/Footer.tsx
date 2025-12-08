import { footerSections } from "@/assets/assets";
import { Box, Flex, VStack, Text, Link, Button } from "@chakra-ui/react";

export default function Footer() {
  return (
    <>
      {/* Back to Top */}
      <Button
        className="back-to-top"
        w="full"
        py={6}
        bgColor="var(--color-neutral-700)"
        _hover={{ bgColor: "var(--color-neutral-600)" }}
        rounded="0"
        fontSize={{ base: "14px", md: "16px" }}
      >
        Back to top
      </Button>

      <Box
        bg="var(--color-neutral-800)"
        as="footer"
        color="white"
        pt={10}
        fontSize="14px"
      >
        {/* Top Footer Sections */}
        <Flex
          justify={{ base: "flex-start", md: "space-around" }}
          flexWrap="wrap"
          px={{ base: 4, md: 10 }}
          pb={10}
          gap={10}
        >
          {footerSections.map((section) => (
            <VStack
              key={section.title}
              align={{ base: "center", md: "start" }}
              textAlign={{ base: "center", md: "left" }}
              gap={2}
              w={{ base: "100%", sm: "45%", md: "auto" }}
            >
              <Text fontSize="md" fontWeight="bold">
                {section.title}
              </Text>
              {section.links.map((link) => (
                <Link
                  key={link}
                  href="#"
                  _hover={{ color: "#fff" }}
                  color="var(--color-gray-400)"
                >
                  {link}
                </Link>
              ))}
            </VStack>
          ))}
        </Flex>

        {/* Country + Language Row */}
        <Flex
          justify="center"
          gap={{ base: 2, md: 5 }}
          py={5}
          px={4}
          flexWrap="wrap"
          bg="var(--color-neutral-700)"
        >
          {["English", "$ USD", "United States"].map((item) => (
            <Button
              key={item}
              size="sm"
              bg="transparent"
              color="white"
              border="1px solid white"
              _hover={{ bgColor: "#fff", color: "#000" }}
            >
              {item}
            </Button>
          ))}
        </Flex>

        {/* Bottom Section */}
        <Flex
          bg="var(--color-neutral-900)"
          color="var(--color-gray-400)"
          justify="center"
          textAlign="center"
          py={5}
          fontSize="12px"
          px={4}
        >
          <Text>
            © 2025 Your Company. All rights reserved. | Powered by Readdy
          </Text>
        </Flex>
      </Box>
    </>
  );
}

import { featuresData } from "@/assets/data/featureBoxes";
import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Text,
  Container,
  Heading,
} from "@chakra-ui/react";

export const FeaturesSection = () => {
  return (
    <Box className="features-section" as="section" my={16}>
      <Container>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mx="auto">
          {featuresData.map((feature) => (
            <Box
              p={6}
              key={feature.title}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="sm"
              bgColor="#fff"
              textAlign="center"
            >
              <Image
                src={feature.image}
                h={200}
                w="full"
                alt={feature.title}
                mx="auto"
                mb={4}
              />

              <Heading fontSize="xl" fontWeight={700} mb={2}>
                {feature.title}
              </Heading>

              <Text fontSize="sm" color="gray.600" mb={4}>
                {feature.description}
              </Text>

              <Button colorPalette="yellow" w="full">
                {feature.buttonText}
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

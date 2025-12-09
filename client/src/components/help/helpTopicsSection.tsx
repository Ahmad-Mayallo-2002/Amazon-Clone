import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Container,
  Heading,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import { helpTopicsData } from "@/assets/data/helpTopics";
import { FAQSection } from "./FAQSection";
import { HelpRightPanel } from "./helpRightPanel";

export const HelpTopicsSection = () => {
  return (
    <Box>
      <Container>
        <Heading fontSize="2xl" fontWeight="bold" mb={4}>
          Browse Help Topics
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
          {helpTopicsData.map((topic) => (
            <Box
              key={topic.title}
              borderWidth="1px"
              borderRadius="lg"
              p={5}
              display="flex"
              alignItems="center"
              gap={4}
              boxShadow="sm"
              bg="white"
            >
              <Icon
                w="fit"
                bgColor="var(--color-neutral-700)"
                color="#fff"
                fontSize="55px"
                rounded="lg"
                boxSize="45px"
                p={2}
              >
                <topic.icon />
              </Icon>

              <Box>
                <Text fontWeight="bold">{topic.title}</Text>
                <Text fontSize="sm" color="gray.600">
                  {topic.description}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        <Grid
          my={16}
          gridTemplateColumns={{ base: "1fr", lg: "1fr 400px" }}
          gap={6}
          className="faq-and-help"
          as="section"
        >
          <GridItem>
            <FAQSection />
          </GridItem>
          <GridItem>
            <HelpRightPanel />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

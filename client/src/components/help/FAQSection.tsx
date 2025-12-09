import { Accordion, Box, Heading } from "@chakra-ui/react";
import { faqData } from "@/assets/data/faqData";

export const FAQSection = () => {
  const { Root, Item, ItemBody, ItemContent, ItemTrigger, ItemIndicator } =
    Accordion;
  return (
    <Box className="faq-section">
      <Heading fontSize="2xl" fontWeight="bold" mb={4}>
        Frequently Asked Questions
      </Heading>

      <Root collapsible>
        {faqData.map((faq) => (
          <Item
            key={faq.question}
            borderRadius="md"
            borderWidth="1px"
            mb={3}
            bg="white"
            value={faq.question}
            py={3}
            px={4}
          >
            <ItemTrigger>
              <Heading
                flex="1"
                textAlign="left"
                fontWeight={700}
                color="var(--color-neutral-900)"
                fontSize="lg"
              >
                {faq.question}
              </Heading>
              <ItemIndicator />
            </ItemTrigger>
            <ItemContent color="gray.700">
              <ItemBody>{faq.answer}</ItemBody>
            </ItemContent>
          </Item>
        ))}
      </Root>
    </Box>
  );
};

import { HelpTopicsSection } from "@/components/help/helpTopicsSection";
import { Center, Heading } from "@chakra-ui/react";
export default function Help() {
  return (
    <>
      <Center h={300} bgColor="var(--color-neutral-700)">
        <Heading
          color="#fff"
          fontWeight={900}
          fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
        >
          How can we help you?
        </Heading>
      </Center>

      <HelpTopicsSection />
    </>
  );
}

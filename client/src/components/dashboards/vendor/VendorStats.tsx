import { SimpleGrid, Box, Text, Stat, HStack, Icon } from "@chakra-ui/react";
import { FiDollarSign, FiShoppingBag, FiPackage } from "react-icons/fi";

interface StatItem {
  label: string;
  value: string | number;
  icon: any;
  helperText?: string;
}

const stats: StatItem[] = [
  {
    label: "Total Revenue",
    value: "$45,678.9",
    icon: FiDollarSign,
    helperText: "+12.5%",
  },
  {
    label: "Active Orders",
    value: 23,
    icon: FiShoppingBag,
    helperText: "8 pending",
  },
  {
    label: "Total Products",
    value: 47,
    icon: FiPackage,
    helperText: "+5 new",
  },
];

const VendorStats = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
      {stats.map((item) => (
        <Box key={item.label} p={5} bg="white" borderRadius="lg" boxShadow="sm">
          <HStack justify="space-between" mb={2}>
            <Icon as={item.icon} boxSize={6} color="teal.500" />
            {item.helperText && (
              <Text fontSize="sm" color="green.500">
                {item.helperText}
              </Text>
            )}
          </HStack>

          <Stat.Root>
            <Stat.Label color="gray.500">{item.label}</Stat.Label>
            <Stat.ValueText fontWeight={700}>{item.value}</Stat.ValueText>
          </Stat.Root>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default VendorStats;

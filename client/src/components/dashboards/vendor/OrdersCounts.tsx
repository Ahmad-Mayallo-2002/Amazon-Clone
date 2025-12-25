import { Box, Heading, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { FiCheckCircle, FiClock, FiUsers } from "react-icons/fi";

interface OrderStatProps {
  title: string;
  color: string;
  count: number;
  icon: IconType;
}

const orderStatusStats: OrderStatProps[] = [
  {
    title: "Completed Orders",
    count: 156,
    color: "green.500",
    icon: FiCheckCircle,
  },
  {
    title: "Pending Orders",
    count: 8,
    color: "yellow",
    icon: FiClock,
  },
  {
    title: "Total Customers",
    count: 342,
    color: "teal",
    icon: FiUsers,
  },
];

function OrderStat({ title, color, count, icon }: OrderStatProps) {
  return (
    <Box
      className="panel"
      mt={4}
      borderLeft={`5px solid`}
      borderLeftColor={color}
      boxShadow="sm"
    >
      <Stack
        justify="space-between"
        alignItems="center"
        flexDir={{ base: "column", md: "row" }}
        gapY={4}
      >
        <Box>
          <Text color="gray.500">{title}</Text>
          <Heading fontWeight={700} fontSize="2xl">
            {count}
          </Heading>
        </Box>
        <Icon as={icon} color={color} boxSize="35px" />
      </Stack>
    </Box>
  );
}

export default function OrdersCounts() {
  return (
    <>
      <SimpleGrid gap={4} columns={{ base: 1, md: 3 }}>
        {orderStatusStats.map((v) => (
          <OrderStat {...v} />
        ))}
      </SimpleGrid>
    </>
  );
}

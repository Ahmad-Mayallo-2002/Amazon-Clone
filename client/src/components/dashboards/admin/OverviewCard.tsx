import { Box, Flex, Icon, Stat } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface OverviewCardProps {
  label: string;
  value: number;
  icon: IconType;
}

export default function OverviewCard({
  icon,
  label,
  value,
}: OverviewCardProps) {
  const { Root, Label, ValueText } = Stat;
  return (
    <>
      <Box
        className="panel"
        shadow="md"
        border="1px solid"
        borderColor="gray.100"
      >
        <Flex justify="space-between" align="center">
          <Root>
            <Label color="gray.500">{label}</Label>
            <ValueText fontSize="2xl">{value}</ValueText>
          </Root>
          <Icon as={icon} boxSize="8" color="orange.500" />
        </Flex>
      </Box>
    </>
  );
}

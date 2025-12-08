import { Box, Button, Icon, Menu, Portal, Text } from "@chakra-ui/react";
import { GrLocation } from "react-icons/gr";
import { countries } from "countries-list";
import { useCountry } from "@/zustand/selectCountry";
export default function CountryList() {
  const countryNames = Object.values(countries)
    .map((c) => ({ name: c.name }))
    .slice(0, 100);
  const { Root, Trigger, Positioner, Content, Item } = Menu;
  const state = useCountry((state) => state);
  return (
    <>
      <Root>
        <Trigger asChild>
          <Button bgColor="transparent">
            <Icon fontSize={24} color="#fff">
              <GrLocation />
            </Icon>
            <Box className="country" textAlign="left">
              <Text color="gray.300" as="small">
                Deliver to
              </Text>
              <Text color="#fff" mt={-1} fontWeight={700}>
                {state.country}
              </Text>
            </Box>
          </Button>
        </Trigger>
        <Portal>
          <Positioner>
            <Content>
              {countryNames.map((country) => (
                <Item
                  key={country.name}
                  value={country.name}
                  onClick={() => state.setCountry(country.name)}
                >
                  {country.name}
                </Item>
              ))}
            </Content>
          </Positioner>
        </Portal>
      </Root>
    </>
  );
}

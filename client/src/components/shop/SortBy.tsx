import { sortBy } from "@/assets/assets";
import { useProductSort } from "@/zustand/productSort";
import {
  Box,
  Flex,
  Heading,
  Span,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
export default function SortBy({ count }: { count: number }) {
  const frameworks = createListCollection({
    items: sortBy,
  });
  const {
    Root,
    Content,
    Item,
    Label,
    HiddenSelect,
    Control,
    Trigger,
    ValueText,
    IndicatorGroup,
    Indicator,
    Positioner,
    ItemIndicator,
  } = Select;
  const setKeyValue = useProductSort((state) => state.setKeyValue);
  return (
    <Box as="section" className="sort-by panel">
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        alignItems="center"
        justify="space-between"
      >
        <Box className="products-found">
          <Heading fontWeight={700}>All Products</Heading>
          <Span fontSize="sm">{count} Found</Span>
        </Box>
        <Box>
          <Root
            collection={frameworks}
            onValueChange={(e) =>
              setKeyValue({
                key: e.items[0].key,
                value: e.items[0].value.split("-")[0],
              })
            }
            size="xs"
            w="200px"
          >
            <HiddenSelect />
            <Label>Sort By</Label>
            <Control>
              <Trigger>
                <ValueText placeholder="Sort By" />
              </Trigger>
              <IndicatorGroup>
                <Indicator />
              </IndicatorGroup>
            </Control>
            <Portal>
              <Positioner>
                <Content>
                  {frameworks.items.map((framework) => (
                    <Item item={framework} key={framework.value}>
                      {framework.label}
                      <ItemIndicator />
                    </Item>
                  ))}
                </Content>
              </Positioner>
            </Portal>
          </Root>
        </Box>
      </Flex>
    </Box>
  );
}

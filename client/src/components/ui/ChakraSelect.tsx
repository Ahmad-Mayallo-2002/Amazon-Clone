import {
  Select,
  createListCollection,
  Portal,
  type SelectRootProps,
} from "@chakra-ui/react";

interface SelectCollection {
  label: string;
  value: string;
}

export default function ChakraSelect({
  items,
  label = "",
  placeholder = "",
  props,
}: {
  items: SelectCollection[];
  label: string;
  placeholder: string;
  props: SelectRootProps;
}) {
  const collection = createListCollection({ items });
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
  return (
    <Root {...props}>
      <HiddenSelect />
      <Label>{label}</Label>
      <Control>
        <Trigger>
          <ValueText placeholder={placeholder} />
        </Trigger>
        <IndicatorGroup>
          <Indicator />
        </IndicatorGroup>
      </Control>
      <Portal>
        <Positioner>
          <Content>
            {collection.items.map((item) => (
              <Item key={item.value} item={item}>
                {item.label}
                <ItemIndicator />
              </Item>
            ))}
          </Content>
        </Positioner>
      </Portal>
    </Root>
  );
}

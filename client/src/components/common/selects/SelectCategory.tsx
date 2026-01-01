import type { FormProps } from "@/components/dashboards/vendor/CreateProductDialog";
import { useFetch } from "@/hooks/useFetch";
import type { Category } from "@/interfaces/category";
import type { Response } from "@/interfaces/responses";
import { Select, createListCollection } from "@chakra-ui/react";
import type { UseFormRegister } from "react-hook-form";

interface SelectCategoryProps {
  register: UseFormRegister<FormProps>;
  required: boolean;
}

export default function SelectCategory({ register, required }: SelectCategoryProps) {
  const { data } = useFetch<Response<Category[]>>({
    queryKey: ["categories"],
    url: "get-categories",
  });
  const {
    Content,
    Control,
    HiddenSelect,
    Item,
    Label,
    Indicator,
    IndicatorGroup,
    Positioner,
    Root,
    Trigger,
    ValueText,
  } = Select;
  if (data) {
    const items = data.data.map((c) => ({ value: c.id, label: c.name }));
    const frameworks = createListCollection({
      items,
    });
    return (
      <Root collection={frameworks}>
        <HiddenSelect
          {...register("categoryId", {
            required: {
              value: required,
              message: "Category is required",
            },
          })}
        />
        <Label>Select Category</Label>
        <Control>
          <Trigger>
            <ValueText placeholder="Select Category" />
          </Trigger>
          <IndicatorGroup>
            <Indicator />
          </IndicatorGroup>
        </Control>
        <Positioner>
          <Content>
            {frameworks.items.map((item) => (
              <Item key={item.value} item={item.value}>
                {item.label}
              </Item>
            ))}
          </Content>
        </Positioner>
      </Root>
    );
  }
}

import { useFetch } from "@/hooks/useFetch";
import { Button, Menu, Portal } from "@chakra-ui/react";
import type { Response } from "@/interfaces/responses";
import type { Category } from "@/interfaces/category";
import { useCategory } from "@/zustand/selectCategory";

export default function SelectCategory() {
  const { Root, Item, Content, Positioner, Trigger } = Menu;
  const { data } = useFetch<Response<Category[]>>({
    queryKey: ["categories"],
    url: "get-categories",
  });
  const state = useCategory((state) => state);
  return (
    <>
      <Root>
        <Trigger asChild>
          <Button
            size="sm"
            px={8}
            bgColor="#f3f3f3"
            color="black"
            roundedRight={0}
          >
            {state.category || "All"}
          </Button>
        </Trigger>
        <Portal>
          <Positioner>
            <Content className="select-category">
              {state.category && (
                <Item onClick={() => state.setCategory("All")} value="All">
                  All
                </Item>
              )}
              {data &&
                data.data.map((c) => (
                  <Item
                    onClick={() => state.setCategory(c.name)}
                    value={c.name}
                    id={c.id}
                    key={c.id}
                  >
                    {c.name}
                  </Item>
                ))}
            </Content>
          </Positioner>
        </Portal>
      </Root>
    </>
  );
}

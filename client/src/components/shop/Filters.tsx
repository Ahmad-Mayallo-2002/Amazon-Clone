import { useFetch } from "@/hooks/useFetch";
import type { Category } from "@/interfaces/category";
import type { Response } from "@/interfaces/responses";
import { usePriceRange } from "@/zustand/priceRange";
import {
  Box,
  Heading,
  RadioGroup,
  VStack,
  Separator,
  Slider,
  HStack,
  Span,
} from "@chakra-ui/react";
export default function Fitlers() {
  const { data } = useFetch<Response<Category[]>>({
    queryKey: ["categories"],
    url: "/get-categories",
  });
  const { Root, Item, ItemIndicator, ItemText, ItemHiddenInput } = RadioGroup;
  const [MIN_RANGE, MAX_RANGE] = [0, 1000];
  const priceRange = usePriceRange((state) => state);
  return (
    <>
      <Box as="aside" className="filters panel">
        <Heading as="h3" fontSize="2xl" fontWeight={700}>
          Filters
        </Heading>

        <Separator my={4} w="calc(100% + 32px)" ms={-4} />

        <Heading mb={4} as="h3" fontSize="xl" fontWeight={700}>
          Category
        </Heading>
        {data && (
          <Root defaultValue="">
            <VStack alignItems="start" gap={3}>
              <Item value="" cursor="pointer" w="full">
                <ItemHiddenInput />
                <ItemIndicator colorPalette="orange" />
                <ItemText>All</ItemText>
              </Item>
              {data.data.map((category) => (
                <Item
                  cursor="pointer"
                  w="full"
                  key={category.id}
                  value={category.name}
                >
                  <ItemHiddenInput />
                  <ItemIndicator colorPalette="orange" />
                  <ItemText>{category.name}</ItemText>
                </Item>
              ))}
            </VStack>
          </Root>
        )}

        <Separator my={4} w="calc(100% + 32px)" ms={-4} />

        <Heading mb={4} as="h3" fontSize="xl" fontWeight={700}>
          Price Range
        </Heading>
        <Slider.Root
          colorPalette="orange"
          onValueChange={(e) => {
            priceRange.setMin(e.value[0]);
            priceRange.setMax(e.value[1]);
            console.log(priceRange.min, priceRange.max);
          }}
          defaultValue={[MIN_RANGE, MAX_RANGE]}
          min={MIN_RANGE}
          max={MAX_RANGE}
          minStepsBetweenThumbs={100}
        >
          <HStack justify="space-between">
            <Span>Min: {priceRange.min}</Span>
            <Span>Max: {priceRange.max}</Span>
          </HStack>
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumbs />
          </Slider.Control>
        </Slider.Root>

        <Separator my={4} w="calc(100% + 32px)" ms={-4} />

        <Heading mb={4} as="h3" fontSize="xl" fontWeight={700}>
          Rating
        </Heading>

        <Root defaultValue="">
          <VStack alignItems="start" gap={3}>
            <Item value="" cursor="pointer" w="full">
              <ItemHiddenInput />
              <ItemIndicator colorPalette="orange" />
              <ItemText>All</ItemText>
            </Item>
            {[1, 2, 3, 4, 5].map((value) => (
              <Item cursor="pointer" w="full" key={value} value={`${value}`}>
                <ItemHiddenInput />
                <ItemIndicator colorPalette="orange" />
                <ItemText>
                  {value} {value !== 5 && "and Up"}
                </ItemText>
              </Item>
            ))}
          </VStack>
        </Root>
      </Box>
    </>
  );
}

import { useFetch } from "@/hooks/useFetch";
import type { Category } from "@/interfaces/category";
import type { Response } from "@/interfaces/responses";
import { useFilters } from "@/zustand/filters";
import { usePriceRange } from "@/zustand/priceRange";
import {
  Box,
  Heading,
  RadioGroup,
  VStack,
  Separator,
  HStack,
  NumberInput,
} from "@chakra-ui/react";
import SkeletonCategoryList from "./SkeletonCategoryList";
export default function Fitlers() {
  const { data, isLoading } = useFetch<Response<Category[]>>({
    queryKey: ["categories"],
    url: "get-categories",
  });
  const { Root, Item, ItemIndicator, ItemText, ItemHiddenInput } = RadioGroup;
  const priceRange = usePriceRange((state) => state);
  const { filters, setFilters } = useFilters((state) => state);
  const handleCategory = (category: string) =>
    setFilters({ ...filters, category });
  const handleRating = (rating: number) => setFilters({ ...filters, rating });
  return (
    <>
      <Box as="aside" className="filters panel">
        <Heading as="h3" fontSize="2xl" fontWeight={700}>
          Filters
        </Heading>

        <Separator my={4} w="calc(100% + 32px)" ms={-4} />

        {/* Category */}
        <Heading mb={4} as="h3" fontSize="xl" fontWeight={700}>
          Category
        </Heading>
        {data && (
          <Root
            defaultValue=""
            onValueChange={(e) => handleCategory(e.value as string)}
          >
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

        {isLoading &&
          Array.from({ length: 8 }).map((_v, i) => (
            <SkeletonCategoryList key={i} />
          ))}

        <Separator my={4} w="calc(100% + 32px)" ms={-4} />

        {/* Price Range */}
        <Heading mb={4} as="h3" fontSize="xl" fontWeight={700}>
          Price Range
        </Heading>
        <HStack gap={0}>
          <NumberInput.Root
            size="xs"
            onValueChange={(e) => priceRange.setMin(e.valueAsNumber)}
          >
            <NumberInput.Input roundedRight={0} placeholder="Min Price" />
          </NumberInput.Root>

          <NumberInput.Root
            size="xs"
            onValueChange={(e) => priceRange.setMax(e.valueAsNumber)}
          >
            <NumberInput.Input roundedLeft={0} placeholder="Max Price" />
          </NumberInput.Root>
        </HStack>

        <Separator my={4} w="calc(100% + 32px)" ms={-4} />

        {/* Rating */}
        <Heading mb={4} as="h3" fontSize="xl" fontWeight={700}>
          Rating
        </Heading>

        <Root
          defaultValue={""}
          onValueChange={(e) => handleRating(Number(e.value))}
        >
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

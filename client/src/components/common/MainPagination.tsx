import {
  ButtonGroup,
  IconButton,
  Pagination,
  type PaginationPageChangeDetails,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface PaginationProps {
  onPageChange: (details: PaginationPageChangeDetails) => void;
  defaultPage: number;
  count: number;
}

export default function MainPagination({ count, defaultPage, onPageChange }: PaginationProps) {
  const { Root, NextTrigger, PrevTrigger, Items } = Pagination;
  return (
    <Root
      onPageChange={onPageChange}
      pageSize={1}
      defaultPage={defaultPage}
      count={count}
      mt={4}
      textAlign="center"
    >
      <ButtonGroup attached variant="outline" size="sm">
        <PrevTrigger asChild>
          <IconButton colorPalette="orange">
            <LuChevronLeft />
          </IconButton>
        </PrevTrigger>

        <Items
          render={(page) => (
            <IconButton
              colorPalette="orange"
              variant={{ base: "outline", _selected: "solid" }}
            >
              {page.value}
            </IconButton>
          )}
        />

        <NextTrigger asChild>
          <IconButton colorPalette="orange">
            <LuChevronRight />
          </IconButton>
        </NextTrigger>
      </ButtonGroup>
    </Root>
  );
}

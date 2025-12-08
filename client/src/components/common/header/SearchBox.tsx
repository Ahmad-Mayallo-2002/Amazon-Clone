import { Button, HStack, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import SelectCategory from "./SelectCategory";

export default function SearchBox() {
  return (
    <form className="search-products" style={{ flexGrow: 1 }}>
      <HStack gap={0}>
        <SelectCategory />
        <Input
          rounded={0}
          borderLeftColor="transparent"
          borderRightColor="transparent"
          placeholder="Search products..."
          _focus={{
            outline: "none",
            boxShadow: "none",
            borderColor: "#e4e4e7 transparent",
          }}
          backgroundColor="#fff"
          size="sm"
        />
        <Button
          size="sm"
          bgColor="#febd69"
          px={8}
          _hover={{ bgColor: "#f3a847" }}
          color="gray.800"
          roundedLeft={0}
        >
          <FaSearch />
        </Button>
      </HStack>
    </form>
  );
}

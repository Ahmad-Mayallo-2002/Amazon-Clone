import { Button, HStack, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import SelectCategory from "./SelectCategory";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSearchProducts } from "@/zustand/searchProducts";

interface FormSearchProps {
  search: string;
}

export default function SearchBox() {
  const navigate = useNavigate();
  const setSearch = useSearchProducts((state) => state.setSearch);
  const { register, handleSubmit } = useForm<FormSearchProps>();
  const onSubmit = () => navigate("/search-products");

  return (
    <form
      className="search-products"
      style={{ flexGrow: 1 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <HStack gap={0}>
        <SelectCategory />
        <Input
          rounded={0}
          borderLeftColor="transparent"
          borderRightColor="transparent"
          required
          placeholder="Search products..."
          _focus={{
            outline: "none",
            boxShadow: "none",
            borderColor: "#e4e4e7 transparent",
          }}
          {...register("search", {
            required: "Product Search is Required",
            onChange: (event) => setSearch(event.target.value),
          })}
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
          type="submit"
        >
          <FaSearch />
        </Button>
      </HStack>
    </form>
  );
}

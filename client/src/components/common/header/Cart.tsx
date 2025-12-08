import { useCartCount } from "@/zustand/cartCount";
import { Icon, Link, Text } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const state = useCartCount((state) => state);
  return (
    <div className="cart">
      <Link
        pos="relative"
        href="/cart"
        justifyContent="center"
        alignItems="center"
      >
        <Icon color="#fff" mt={3} fontSize="3xl">
          <FaShoppingCart />
        </Icon>{" "}
        <Text
          as="span"
          pos="absolute"
          bgColor="orange.500"
          rounded="full"
          w={5}
          h={5}
          className="center"
          color="#fff"
          top={0.5}
          left={2}
        >
          {state.count}
        </Text>
        <Text color="#fff" fontWeight={700}>
          Cart
        </Text>
      </Link>
    </div>
  );
}

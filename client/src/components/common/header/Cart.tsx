import { Icon, Link, Text } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  return (
    <div className="cart">
      <Link
        pos="relative"
        href="/user-dashboard/cart"
        justifyContent="center"
        alignItems="center"
      >
        <Icon color="#fff" mt={3} fontSize="3xl">
          <FaShoppingCart />
        </Icon>
        <Text color="#fff" fontWeight={700}>
          Cart
        </Text>
      </Link>
    </div>
  );
}

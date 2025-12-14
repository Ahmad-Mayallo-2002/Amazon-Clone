import { Center, Link, Image } from "@chakra-ui/react";
import logo from "@/assets/images/logo.png";

function AuthHeader() {
  return (
    <Center py={6} borderBottom={"1px solid"} borderBottomColor="gray.300">
      <Link href="/">
        <Image src={logo} w="50px" />
      </Link>
    </Center>
  );
}

export default AuthHeader;

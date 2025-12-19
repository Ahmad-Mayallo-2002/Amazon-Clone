import MainSpinner from "@/components/ui/MainSpinner";
import ProductBuyBox from "@/components/singleProduct/ProductBuyBox";
import ProductDetails from "@/components/singleProduct/ProductDetails";
import { useFetch } from "@/hooks/useFetch";
import type { Product } from "@/interfaces/product";
import type { CustomError, Response } from "@/interfaces/responses";
import {
  Box,
  Center,
  Container,
  Grid,
  Heading,
  Image,
  Link,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function SingleProduct() {
  const { id } = useParams();
  const { data, error, isLoading } = useFetch<Response<Product>>({
    queryKey: ["product-details"],
    url: `get-products/${id}`,
  });

  return (
    <>
      <Box my={24} className="product-details">
        <Container>
          {data && (
            <>
              <Grid
                gridTemplateColumns={{ base: "1fr", lg: "auto 1fr auto" }}
                gap={4}
              >
                <Box
                  h="fit"
                  pos={{ base: "static", lg: "sticky" }}
                  top={4}
                  left={0}
                  w="full"
                  className="panel"
                >
                  <Image
                    src={data.data.image.url}
                    h="400px"
                    w="full"
                    rounded={"lg"}
                  />
                </Box>
                <ProductDetails product={data.data} />

                <ProductBuyBox product={data.data} />
              </Grid>
            </>
          )}
          {!data && (
            <Center className="panel" h="500px">
              {isLoading && <MainSpinner w="150px" h="150px" />}
              {error && (
                <>
                  <VStack>
                    <Heading mb={1} fontSize="4xl" fontWeight={700}>
                      {(error as CustomError).response.data.message}
                    </Heading>
                    <Link
                      href="/shop"
                      color="blue.600"
                      _hover={{ color: "blue.800", textDecor: "underline" }}
                    >
                      Return to Shop
                    </Link>
                  </VStack>
                </>
              )}
            </Center>
          )}
        </Container>
      </Box>
    </>
  );
}

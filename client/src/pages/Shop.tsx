import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import Fitlers from "@/components/shop/Filters";
import Products from "@/components/shop/Products";

export default function Shop() {
  return (
    <>
      <Box as="main" className="shop" my={24}>
        <Container>
          <Grid gridTemplateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={4}>
            <GridItem>
              <Fitlers />
            </GridItem>
            <GridItem>
              <Products />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

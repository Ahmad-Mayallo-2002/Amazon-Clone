import { Box, Container } from "@chakra-ui/react";
import banner from "@/assets/images/banner.jpg";
import ProductCategorySlide from "@/components/home/ProductCategorySlide";
import { FeaturesSection } from "@/components/help/featuresSection";

export default function Home() {
  return (
    <>
      <Box
        as="main"
        className="banner"
        h={400}
        bgImage={`linear-gradient(to bottom, rgba(255,255,255,0) 15%, rgba(255,255,255,.75)), url(${banner})`}
        bgSize="cover"
      ></Box>

      <Box as="section" className="some-of-categories" my={16}>
        <Container>
          <ProductCategorySlide category="electronics" key="electronics" />

          <ProductCategorySlide category="tools" key="tools" />

          <ProductCategorySlide category="books" key="books" />
        </Container>
      </Box>

      <FeaturesSection />
    </>
  );
}

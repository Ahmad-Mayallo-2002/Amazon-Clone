import { Box, Heading } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { category: "Electronics", products: 1200 },
  { category: "Fashion", products: 950 },
  { category: "Home", products: 640 },
  { category: "Beauty", products: 420 },
  { category: "Sports", products: 310 },
];

const ProductsChart = () => {
  return (
    <Box
      className="panel"
      shadow="lg"
      border="1px solid"
      borderColor="gray.100"
    >
      <Heading size="md" mb={4}>
        Products by Category
      </Heading>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="products" fill="#805AD5" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ProductsChart;

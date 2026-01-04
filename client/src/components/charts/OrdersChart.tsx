import { Box, Heading } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", orders: 420, revenue: 3200 },
  { month: "Feb", orders: 510, revenue: 4100 },
  { month: "Mar", orders: 680, revenue: 5300 },
  { month: "Apr", orders: 790, revenue: 6200 },
  { month: "May", orders: 860, revenue: 7100 },
  { month: "Jun", orders: 940, revenue: 8300 },
];

const OrdersChart = () => {
  return (
    <Box
      className="panel"
      shadow="lg"
      border="1px solid"
      borderColor="gray.100"
    >
      <Heading size="md" mb={4}>
        Orders & Revenue
      </Heading>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#3182CE"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#38A169"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OrdersChart;

import { Chart, useChart } from "@chakra-ui/charts";
import { Box, Heading } from "@chakra-ui/react";
import { Cell, LabelList, Legend, Pie, PieChart } from "recharts";

const data = [
  { name: "Pending", value: 320, color: "#3182CE" },
  { name: "Processing", value: 540, color: "#DD6B20" },
  { name: "Shipped", value: 410, color: "#805AD5" },
  { name: "Delivered", value: 860, color: "#38A169" },
  { name: "Cancelled", value: 120, color: "#E53E3E" },
];

const OrdersStatusPieChart = () => {
  const chart = useChart({ data });
  return (
    <>
      <Box className="panel" shadow="lg">
        <Heading size="md" mb={4}>
          Orders & Revenue
        </Heading>
        <Chart.Root chart={chart}>
          <PieChart>
            <Legend content={<Chart.Legend />} />
            <Pie
              isAnimationActive={false}
              data={chart.data}
              dataKey={chart.key("value")}
            >
              <LabelList fill="white" stroke="none" />
              {chart.data.map((item) => (
                <Cell key={item.name} fill={chart.color(item.color)} />
              ))}
            </Pie>
          </PieChart>
        </Chart.Root>
      </Box>
    </>
  );
};

export default OrdersStatusPieChart;

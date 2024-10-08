import { Transaction } from "../types/Types";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface PieStatsProps {
  data: Transaction[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9078CF"];

const PieStats: React.FC<PieStatsProps> = ({ data }) => {
  const paymentMethods: { [key: string]: number } = {};

  data.forEach((transaction) => {
    const method: string = transaction.paymentMethod;
    if (paymentMethods[method]) {
      paymentMethods[method] += 1;
    } else {
      paymentMethods[method] = 1;
    }
  });

  const chartData = Object.keys(paymentMethods).map((method) => ({
    name: method,
    value: paymentMethods[method],
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieStats;

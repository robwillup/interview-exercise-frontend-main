import { Status, Transaction } from "../types/Types";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

interface StatusByPaymentMethod {
  method: string;
  completed: number;
  failed: number;
  pending: number;
  amount: number;
}

interface BarStatsProps {
  data: Transaction[];
}

const BarStats: React.FC<BarStatsProps> = ({ data }) => {
  const statusByPaymentMethods: { [key: string]: StatusByPaymentMethod } = {};

  const incrementStatus = (
    status: string,
    item: StatusByPaymentMethod
  ): StatusByPaymentMethod => {
    if (status === Status.Completed) {
      item.completed += 1;
    } else if (status === Status.Pending) {
      item.pending += 1;
    } else {
      item.failed += 1;
    }

    return item;
  };

  data.forEach((transaction) => {
    const method: string = transaction.paymentMethod;
    if (statusByPaymentMethods[method]) {
      statusByPaymentMethods[method].amount += 1;
      statusByPaymentMethods[method] = incrementStatus(
        transaction.status,
        statusByPaymentMethods[method]
      );
    } else {
      statusByPaymentMethods[method] = {
        amount: 1,
        method: method,
        completed: transaction.status === Status.Completed ? 1 : 0,
        pending: transaction.status === Status.Pending ? 1 : 0,
        failed: transaction.status === Status.Failed ? 1 : 0,
      };
    }
  });

  return (
      <BarChart
        width={400} height={400}
        data={Object.values(statusByPaymentMethods)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="method" fontSize={14} />
        <YAxis fontSize={14} />
        <Tooltip />
        <Legend fontSize={10} />
        <Bar
          dataKey="completed"
          fill="#48BB78"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="pending"
          fill="#F6E05E"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="failed"
          fill="#F56565"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
  );
};

export default BarStats;

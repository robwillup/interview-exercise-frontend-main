import { useCallback, useEffect, useState } from "react";
import { Transaction } from "./Types";
import {
  Box,
  Card,
  useBreakpointValue,
} from "@chakra-ui/react";
import Stats from "./Stats";

const mapJsonToTransaction = (data: any): Transaction => {
  return {
    id: data.transaction_id,
    customer: {
      name: data.customer_name,
      email: data.email,
      age: data.age,
    },
    date: new Date(data.purchase_date),
    products: data.products.map((product: any) => ({
      id: product.product_id,
      name: product.product_name,
      category: product.category,
      quantity: product.quantity,
      price: product.price,
    })),
    paymentMethod: data.payment_method,
    currency: data.currency,
    status: data.status,
    totalAmount: data.total_amount,
  };
};

const TransactionStats: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const getTransactions = useCallback(
    async () => {
      try {
        const response = await fetch("transactions.json");
        const json = await response.json();
        const mappedTransactions = json.map(mapJsonToTransaction);

        return mappedTransactions;
      } catch (error) {
        return [];
      }
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await getTransactions();
      setTransactions(transactions);
    };

    fetchData();
  }, [getTransactions]);

  return (
    <Box display="flex" justifyContent="center" p={4}>
      <Card
        p={isMobile ? "5" : "10"}
        h="90vh"
        display="flex"
        flexDirection="column"
        overflow="hidden"
        w={isMobile ? "100vw" : "80vw"}
      >
        <Stats data={transactions}></Stats>
      </Card>
    </Box>
  );
};

export default TransactionStats;

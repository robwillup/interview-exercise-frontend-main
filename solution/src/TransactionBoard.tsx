import { useCallback, useEffect, useState } from "react";
import { Filter, PaymentMethod, Status, Transaction } from "./Types";
import { Badge, Box, Button, Card, FormControl, Stack } from "@chakra-ui/react";
import Purchases from "./Purchases";
import Filters from "./Filters";

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

const filterTransactions = (
  transactions: Transaction[],
  filter: Filter
): Transaction[] => {
  return transactions.filter((transaction) => {
    let statusMatches = true;
    let paymentMethodMatches = true;

    if (filter.statusCompleted || filter.statusPending || filter.statusFailed) {
      statusMatches = false; // Start by assuming no match

      if (filter.statusCompleted && transaction.status === Status.Completed) {
        statusMatches = true;
      }
      if (filter.statusPending && transaction.status === Status.Pending) {
        statusMatches = true;
      }
      if (filter.statusFailed && transaction.status === Status.Failed) {
        statusMatches = true;
      }
    }

    // Check if any payment method filters are applied
    if (
      filter.creditCard ||
      filter.bankTransfer ||
      filter.payPal ||
      filter.pix ||
      filter.cash
    ) {
      paymentMethodMatches = false; // Start by assuming no match

      if (
        filter.creditCard &&
        transaction.paymentMethod === PaymentMethod.CreditCard
      ) {
        paymentMethodMatches = true;
      }
      if (
        filter.bankTransfer &&
        transaction.paymentMethod === PaymentMethod.BankTransfer
      ) {
        paymentMethodMatches = true;
      }
      if (filter.payPal && transaction.paymentMethod === PaymentMethod.PayPal) {
        paymentMethodMatches = true;
      }
      if (filter.pix && transaction.paymentMethod === PaymentMethod.Pix) {
        paymentMethodMatches = true;
      }
      if (filter.cash && transaction.paymentMethod === PaymentMethod.Cash) {
        paymentMethodMatches = true;
      }
    }

    // If no filters are applied, return all transactions
    return statusMatches && paymentMethodMatches;
  });
};

const TransactionBoard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [filter, setFilter] = useState<Filter>({});

  const itemsPerPage = 5;

  const getTransactions = useCallback(
    async (startIndex: number, count: number) => {
      try {
        const response = await fetch("transactions.json");
        const json = await response.json();

        const mappedTransactions = json.map(mapJsonToTransaction);
        const filteredTransactions = filterTransactions(
          mappedTransactions,
          filter
        );

        setTotalTransactions(filteredTransactions.length);

        return filteredTransactions.slice(startIndex, startIndex + count);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
      }
    },
    [filter]
  );

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await getTransactions(
        page * itemsPerPage,
        itemsPerPage
      );
      setTransactions(transactions);
    };

    fetchData();
  }, [getTransactions, page]);

  const lastPage = Math.max(Math.ceil(totalTransactions / itemsPerPage) - 1, 0);

  const handleFilterChange = (filter: Filter) => {
    setFilter(filter);
  };

  return (
    <Card p="10" maxHeight="90vh" display="flex" flexDirection="column">
      <FormControl>
        <Filters
          handleFilterChange={handleFilterChange}
          filter={filter}
        ></Filters>
      </FormControl>
      <Badge width={200}>{totalTransactions} transactions</Badge>
      <Purchases purchases={transactions}></Purchases>
      <Box pt={5} display="flex" justifyContent="center">
        <Stack direction="row" spacing={10} align="center">
          <Button
            onClick={() => setPage(0)}
            disabled={page === 0}
            colorScheme="blue"
            w={100}
          >
            First Page
          </Button>
          <Button
            onClick={() => setPage(page === 0 ? 0 : page - 1)}
            disabled={page === 0}
            variant={page === 0 ? "outline" : "solid"}
            colorScheme="blue"
            w={100}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage(page === lastPage ? lastPage : page + 1)}
            colorScheme={page === lastPage ? "" : "blue"}
            w={100}
            disabled={page === lastPage}
            variant={page === lastPage ? "outline" : "solid"}
          >
            Next
          </Button>
          <Button onClick={() => setPage(lastPage)} colorScheme="blue" w={100}>
            Last Page
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default TransactionBoard;

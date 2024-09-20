import { useCallback, useEffect, useState } from "react";
import { Filter, PaymentMethod, Status, Transaction } from "./Types";
import {
  AbsoluteCenter,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Text,
  Stack,
} from "@chakra-ui/react";
import Purchases from "./Purchases";
import Filters from "./Filters";
import {
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxChevronLeft,
  RxChevronRight,
} from "react-icons/rx";

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
    let currencyMatches = true;
    let nameMatches = true;
    let emailMatches = true;

    if (filter.statusCompleted || filter.statusPending || filter.statusFailed) {
      statusMatches = false;

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

    if (
      filter.creditCard ||
      filter.bankTransfer ||
      filter.payPal ||
      filter.pix ||
      filter.cash
    ) {
      paymentMethodMatches = false;

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

    if (filter.currency) {
      currencyMatches = false;

      if (transaction.currency.includes(filter.currency)) {
        currencyMatches = true;
      }
    }

    if (filter.userName) {
      nameMatches = false;

      if (transaction.customer.name.includes(filter.userName)) {
        nameMatches = true;
      }
    }

    if (filter.emailAddress) {
      emailMatches = false;

      if (transaction.customer.email.includes(filter.emailAddress)) {
        emailMatches = true;
      }
    }

    return (
      statusMatches &&
      paymentMethodMatches &&
      currencyMatches &&
      nameMatches &&
      emailMatches
    );
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
    <Box display="flex" justifyContent="center" p={4}>
      <Card
        p={{ base: "5", md: "10" }}
        h={{ base: "auto", md: "90vh" }}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        w={{ base: "90vw", md: "80vw" }}
      >
        <FormControl>
          <Filters
            handleFilterChange={handleFilterChange}
            filter={filter}
          ></Filters>
        </FormControl>
        <Box position="relative" padding={{ base: "5", md: "10" }}>
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            Transactions
          </AbsoluteCenter>
        </Box>
        <Box flex="1" overflowY="auto">
          <Purchases
            purchases={transactions}
            total={totalTransactions}
          ></Purchases>
        </Box>
        <Box pt={5} display="flex" justifyContent="center">
          <Stack direction={{ base: "column", md: "row" }} spacing={10} align="center">
            <Button
              size="sm"
              onClick={() => setPage(0)}
              disabled={page === 0}
              colorScheme="blue"
              w={100}
            >
              <RxDoubleArrowLeft />
              <Text pl={2}>First</Text>
            </Button>
            <Button
              size="sm"
              onClick={() => setPage(page === 0 ? 0 : page - 1)}
              disabled={page === 0}
              variant={page === 0 ? "outline" : "solid"}
              colorScheme={page === 0 ? "" : "blue"}
              w={100}
            >
              <RxChevronLeft />
              <Text>Previous</Text>
            </Button>
            <Button
              size="sm"
              onClick={() => setPage(page === lastPage ? lastPage : page + 1)}
              colorScheme={page === lastPage ? "" : "blue"}
              w={100}
              disabled={page === lastPage}
              variant={page === lastPage ? "outline" : "solid"}
            >
              <Text>Next</Text>
              <RxChevronRight />
            </Button>
            <Button
              size="sm"
              onClick={() => setPage(lastPage)}
              colorScheme="blue"
              w={100}
            >
              <Text pr={2}>Last</Text>
              <RxDoubleArrowRight />
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default TransactionBoard;

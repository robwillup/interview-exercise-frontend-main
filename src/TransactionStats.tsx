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
  useBreakpointValue,
} from "@chakra-ui/react";
import Purchases from "./Purchases";
import Filters from "./Filters";
import {
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxChevronLeft,
  RxChevronRight,
} from "react-icons/rx";
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

const TransactionStats: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [filter, setFilter] = useState<Filter>({});

  const itemsPerPage = 5;

  const isMobile = useBreakpointValue({ base: true, md: false });

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

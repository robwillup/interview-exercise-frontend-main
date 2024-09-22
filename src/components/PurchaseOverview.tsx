import { useCallback, useEffect, useState } from "react";
import { Filter, PaymentMethod, Sort, Status, Transaction } from "../types/Types";
import {
  AbsoluteCenter,
  Box,
  Card,
  Divider,
  FormControl,
  useBreakpointValue,
} from "@chakra-ui/react";
import Purchases from "./Purchases";
import Filters from "./Filters";
import PageButtons from "./PageButtons";

const filterTransactions = (
  transactions: Transaction[],
  filter: Filter
): Transaction[] => {
  const matchesStatus = (transaction: Transaction): boolean => {
    if (
      !filter.statusCompleted &&
      !filter.statusPending &&
      !filter.statusFailed
    ) {
      return true;
    }
    return (
      ((filter.statusCompleted ?? false) &&
        transaction.status === Status.Completed) ||
      ((filter.statusPending ?? false) &&
        transaction.status === Status.Pending) ||
      ((filter.statusFailed ?? false) && transaction.status === Status.Failed)
    );
  };

  const matchesPaymentMethod = (transaction: Transaction): boolean => {
    if (
      !filter.creditCard &&
      !filter.bankTransfer &&
      !filter.payPal &&
      !filter.pix &&
      !filter.cash
    ) {
      return true;
    }
    return (
      ((filter.creditCard ?? false) &&
        transaction.paymentMethod === PaymentMethod.CreditCard) ||
      ((filter.bankTransfer ?? false) &&
        transaction.paymentMethod === PaymentMethod.BankTransfer) ||
      ((filter.payPal ?? false) &&
        transaction.paymentMethod === PaymentMethod.PayPal) ||
      ((filter.pix ?? false) &&
        transaction.paymentMethod === PaymentMethod.Pix) ||
      ((filter.cash ?? false) &&
        transaction.paymentMethod === PaymentMethod.Cash)
    );
  };

  const matchesCurrency = (transaction: Transaction): boolean => {
    return !filter.currency || transaction.currency.includes(filter.currency);
  };

  const matchesUserName = (transaction: Transaction): boolean => {
    return (
      !filter.userName || transaction.customer.name.includes(filter.userName)
    );
  };

  const matchesEmail = (transaction: Transaction): boolean => {
    return (
      !filter.emailAddress ||
      transaction.customer.email.includes(filter.emailAddress)
    );
  };

  return transactions.filter((transaction) => {
    return (
      matchesStatus(transaction) &&
      matchesPaymentMethod(transaction) &&
      matchesCurrency(transaction) &&
      matchesUserName(transaction) &&
      matchesEmail(transaction)
    );
  });
};

const sortTransactions = (
  transactions: Transaction[],
  sort: Sort
): Transaction[] => {
  return [...transactions].sort((a, b) => {
    if (sort.dateAsc !== undefined) {
      const dateComparison: number = sort.dateAsc
        ? a.date.getTime() - b.date.getTime()
        : b.date.getTime() - a.date.getTime();
      if (dateComparison !== 0) {
        return dateComparison;
      }
    }

    if (sort.totalAsc !== undefined) {
      return sort.totalAsc
        ? a.totalAmount - b.totalAmount
        : b.totalAmount - a.totalAmount;
    }

    return 0;
  });
};

interface PurchaseListProps {
  purchases: Transaction[];
}

const PurchaseOverview: React.FC<PurchaseListProps> = ({ purchases }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [filter, setFilter] = useState<Filter>({});
  const [sort, setSort] = useState<Sort>({});

  const itemsPerPage = 5;

  const isMobile = useBreakpointValue({ base: true, md: false });

  const getTransactions = useCallback(
    async (startIndex: number, count: number): Promise<Transaction[]> => {
      try {
        const filteredTransactions = sortTransactions(
          filterTransactions(purchases, filter),
          sort
        );

        setTotalTransactions(filteredTransactions.length);

        return filteredTransactions.slice(startIndex, startIndex + count);
      } catch (error) {
        return [];
      }
    },
    [purchases, filter, sort]
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
        <FormControl>
          <Filters handleFilterChange={setFilter} filter={filter}></Filters>
        </FormControl>
        <Box position="relative" padding={isMobile ? "5" : "10"}>
          <Divider />
          <AbsoluteCenter bg="white">
            {totalTransactions} Transactions
          </AbsoluteCenter>
        </Box>
        <Box flex="1" overflowY="auto">
          <Purchases
            purchases={transactions}
            handleSort={setSort}
            sort={sort}
          ></Purchases>
        </Box>
        <PageButtons
          page={page}
          lastPage={lastPage}
          handleSetPage={setPage}
        ></PageButtons>
      </Card>
    </Box>
  );
};

export default PurchaseOverview;

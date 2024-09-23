import { useState, useCallback, useEffect } from "react";
import {
  Transaction,
  Filter,
  Sort,
  Status,
  PaymentMethod,
} from "../types/Types";

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
    return (
      !filter.currency ||
      transaction.currency.includes(filter.currency.toUpperCase())
    );
  };

  const matchesUserName = (transaction: Transaction): boolean => {
    return (
      !filter.userName || transaction.customer.name.includes(filter.userName)
    );
  };

  const matchesEmail = (transaction: Transaction): boolean => {
    return (
      !filter.emailAddress ||
      transaction.customer.email.includes(filter.emailAddress.toLowerCase())
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

const useTransactionList = (
  purchases: Transaction[],
  filter: Filter,
  sort: Sort,
  itemsPerPage: number
) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  const getTransactions = useCallback(
    async (startIndex: number, count: number) => {
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
  }, [getTransactions, page, itemsPerPage]);

  const lastPage = Math.max(Math.ceil(totalTransactions / itemsPerPage) - 1, 0);

  return { transactions, totalTransactions, page, lastPage, setPage };
};

export default useTransactionList;

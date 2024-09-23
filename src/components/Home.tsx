import {
  Flex,
  useMediaQuery,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Transaction } from "../types/Types";
import PurchaseOverview from "./PurchaseOverview";
import PurchaseStats from "./PurchaseStats";
import HomeCard from "./HomeCard";

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

const Home: React.FC = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [breadCrumbs, setBreadCrumbs] = useState(["Home"]);

  const getTransactions = useCallback(async () => {
    try {
      const response = await fetch("transactions.json");
      const json = await response.json();
      const mappedTransactions = json.map(mapJsonToTransaction);

      return mappedTransactions;
    } catch (error) {
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await getTransactions();
      setTransactions(transactions);
    };

    fetchData();
  }, [getTransactions]);

  const handleGoList = () => {
    setBreadCrumbs(["Home", "Overview"]);
  };

  const handleGoStats = () => {
    setBreadCrumbs(["Home", "Stats"]);
  };

  const handleBreadcrumbClick = (index: number) => {
    const newBreadCrumbs = breadCrumbs.slice(0, index + 1);
    setBreadCrumbs(newBreadCrumbs);

    if (newBreadCrumbs.includes("Overview")) {
      handleGoList();
    } else if (newBreadCrumbs.includes("Stats")) {
      handleGoStats();
    }
  };

  return (
    <Flex direction="column" width="100%" alignItems="center">
      <Box width="100%" maxWidth="xl" px={4}>
        <Breadcrumb fontSize={18}>
          {breadCrumbs.map((breadCrumb, i) => (
            <BreadcrumbItem key={i}>
              <BreadcrumbLink href="#" onClick={() => handleBreadcrumbClick(i)}>
                {breadCrumb}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Box>

      {breadCrumbs.length === 1 && (
        <Flex direction={isMobile ? "column" : "row"} gap={4} pt={4}>
          <HomeCard
            isMobile={isMobile}
            onNavigation={handleGoStats}
            isStats={true}
          />
          <HomeCard
            isMobile={isMobile}
            onNavigation={handleGoList}
            isStats={false}
          />
        </Flex>
      )}
      {breadCrumbs.length > 1 && breadCrumbs[1] === "Overview" && (
        <PurchaseOverview purchases={transactions} />
      )}
      {breadCrumbs.length > 1 && breadCrumbs[1] === "Stats" && (
        <PurchaseStats purchases={transactions} />
      )}
    </Flex>
  );
};

export default Home;

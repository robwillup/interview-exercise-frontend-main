import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Stack,
  Text,
  Flex,
  useMediaQuery,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from "@chakra-ui/react";
import TransactionBoard from "./TransactionBoard";
import { useCallback, useEffect, useState } from "react";
import TransactionStats from "./TransactionStats";
import { Transaction } from "./Types";

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

  const handleCardGoStats = () => {
    if (isMobile) {
      handleGoStats();
    }
  };

  const handleCardGoList = () => {
    if (isMobile) {
      handleGoList();
    }
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
          <Card maxW="xl" onClick={isMobile ? handleCardGoStats : undefined}>
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Transaction Stats"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Purchase Insights</Heading>
                <Text fontSize={20} noOfLines={2}>
                  Explore detailed statistics and trends from recent
                  transactions to gain valuable insights into customer behavior
                  and sales performance.
                </Text>
              </Stack>
            </CardBody>
            {!isMobile && (
              <CardFooter justifyContent="center">
                <ButtonGroup spacing="2">
                  <Button
                    onClick={handleGoStats}
                    variant="solid"
                    colorScheme="blue"
                  >
                    Go to Statistics
                  </Button>
                </ButtonGroup>
              </CardFooter>
            )}
          </Card>

          <Card maxW="xl" onClick={isMobile ? handleCardGoList : undefined}>
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1616077167555-51f6bc516dfa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Transaction List"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Purchase Overview</Heading>
                <Text fontSize={20} noOfLines={2}>
                  Browse through all transactions with flexible filtering and
                  sorting options to easily manage and review purchases.
                </Text>
              </Stack>
            </CardBody>
            {!isMobile && (
              <CardFooter justifyContent="center">
                <ButtonGroup spacing="2">
                  <Button
                    onClick={handleGoList}
                    variant="solid"
                    colorScheme="blue"
                  >
                    Go to List
                  </Button>
                </ButtonGroup>
              </CardFooter>
            )}
          </Card>
        </Flex>
      )}
      {breadCrumbs.length > 1 && breadCrumbs[1] === "Overview" && (
        <TransactionBoard purchases={transactions} />
      )}
      {breadCrumbs.length > 1 && breadCrumbs[1] === "Stats" && (
        <TransactionStats purchases={transactions} />
      )}
    </Flex>
  );
};

export default Home;

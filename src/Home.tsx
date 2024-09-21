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
} from "@chakra-ui/react";
import TransactionBoard from "./TransactionBoard";
import { useState } from "react";
import TransactionStats from "./TransactionStats";

const Home: React.FC = () => {
  const [isHome, setIsHome] = useState(true);
  const [isList, setIsList] = useState(false);
  const [isStats, setIsStats] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleGoList = () => {
    setIsHome(false);
    setIsStats(false);
    setIsList(true);
  };

  const handleGoStats = () => {
    setIsHome(false);
    setIsList(false);
    setIsStats(true);
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

  return (
    <>
      {isHome && (
        <Flex direction={isMobile ? "column" : "row"} gap={4}>
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
      {isList && <TransactionBoard />}
      {isStats && <TransactionStats />}
    </>
  );
};

export default Home;

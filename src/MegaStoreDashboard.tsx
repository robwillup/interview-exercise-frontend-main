import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Heading,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import TransactionBoard from "./TransactionBoard";
import { useState } from "react";
import TransactionStats from "./TransactionStats";

const MegaStoreDashboard: React.FC = () => {
  const [isHome, setIsHome] = useState(true);
  const [isList, setIsList] = useState(false);
  const [isStats, setIsStats] = useState(false);

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

  return (
    <>
      {isHome && (
        <Flex>
          <Card maxW="xl">
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Transaction Stats"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Transaction Stats</Heading>
                <Text>View and analyze transaction data statistics</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2" pl={200}>
                <Button onClick={handleGoStats} variant="solid" colorScheme="blue">
                  Go to Statistics
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
          <Card maxW="xl">
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1616077167555-51f6bc516dfa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Transaction List"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Transaction List</Heading>
                <Text>
                  View a list of transactions with different filtering and
                  ordering options
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2" pl={200}>
                <Button
                  onClick={handleGoList}
                  variant="solid"
                  colorScheme="blue"
                >
                  Go to List
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Flex>
      )}
      {isList && <TransactionBoard />}
      {isStats && <TransactionStats />}
    </>
  );
};

export default MegaStoreDashboard;

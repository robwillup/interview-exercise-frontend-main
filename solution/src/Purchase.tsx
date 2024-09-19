import {
  Badge,
  Box,
  Card,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { GoInfo } from "react-icons/go";
import { Transaction } from "./Types";
import ProductContainer from "./ProductContainer";
import { useMemo } from "react";

interface PurchaseProps {
  purchase: Transaction;
}

const Purchase: React.FC<PurchaseProps> = ({ purchase }) => {
  const color = useMemo(() => {
    switch (purchase.status) {
      case 'Completed':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Failed':
        return 'red';
      default:
        return 'gray';
    }
  }, [purchase.status]);

  return (
    <Card padding={5} width={900} border='solid' borderColor='#2c5282'>
      <Card bg={"#ebf8ff"}>
        <Flex>
          <Box p="5">
            <Text fontSize={20}>Status</Text>
            <Badge colorScheme={color}>{purchase.status}</Badge>
          </Box>
          <Box p="5">
            <Text fontSize={20}>Purchased on</Text>
            <Badge>{purchase.date.toDateString()}</Badge>
          </Box>
          <Box p="5">
            <Text fontSize={20}>Total</Text>
            <Badge>
              {purchase.currency} {purchase.totalAmount}
            </Badge>
          </Box>
          <Box p="5">
            <Text fontSize={20}>Payment method</Text>
            <Badge>{purchase.paymentMethod}</Badge>
          </Box>
          <Box p="5">
            <Text fontSize={20}>Customer</Text>
            <HStack pt="2">
              <Badge>{purchase.customer.name}</Badge>
              <Popover>
                <PopoverTrigger>
                  <span>
                    <GoInfo />
                  </span>
                </PopoverTrigger>
                <PopoverContent fontSize={18}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>{purchase.customer.name}</PopoverHeader>
                  <PopoverBody textAlign="left">
                    <strong>Email address:</strong> {purchase.customer.email}
                    <br />
                    <strong>Age:</strong> {purchase.customer.age}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
          </Box>
        </Flex>
      </Card>
      <ProductContainer products={purchase.products}></ProductContainer>
    </Card>
  );
};

export default Purchase;

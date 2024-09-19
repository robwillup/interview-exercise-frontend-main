import {
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
import { Customer } from "./Types";
import { GoInfo } from "react-icons/go";

interface CustomerInfoProps {
  customer: Customer;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <span>
        <HStack>
          <GoInfo size={25}/>
          <Text>{customer.name}</Text>
          </HStack>
        </span>
      </PopoverTrigger>
      <PopoverContent fontSize={18} w={500} bg="gray.100">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody textAlign="left">
          <strong>Email address:</strong> {customer.email}
          <br />
          <strong>Age:</strong> {customer.age}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerInfo;

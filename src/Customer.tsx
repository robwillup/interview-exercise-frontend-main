import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Customer } from "./Types";
import { GoInfo } from "react-icons/go";

interface CustomerInfoProps {
  customer: Customer;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<GoInfo />}
        colorScheme="blue"
        variant="link"
      >
        {customer.name}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{customer.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Email Address: {customer.email}</Text>
            <Text>Age: {customer.age} </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomerInfo;

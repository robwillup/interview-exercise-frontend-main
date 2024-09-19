import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Stack,
} from "@chakra-ui/react";
import { Filter, PaymentMethod, Status } from "./Types";
import { useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";

interface FiltersProps {
  handleFilterChange: (filter: Filter) => void;
  filter: Filter;
}

const Filters: React.FC<FiltersProps> = ({ handleFilterChange, filter }) => {
  const [currency, setCurrency] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [startDate, setStartDate] = useState();

  const handleStatusCheckBoxChange = (status: Status) => {
    const updatedFilter = {
      ...filter,
      statusCompleted:
        status === Status.Completed
          ? !filter.statusCompleted
          : filter.statusCompleted,
      statusPending:
        status === Status.Pending
          ? !filter.statusPending
          : filter.statusPending,
      statusFailed:
        status === Status.Failed ? !filter.statusFailed : filter.statusFailed,
    };

    handleFilterChange(updatedFilter);
  };

  const handlePaymentMethodCheckBoxChange = (paymentMethod: PaymentMethod) => {
    const updatedFilter = {
      ...filter,
      creditCard:
        paymentMethod === PaymentMethod.CreditCard
          ? !filter.creditCard
          : filter.creditCard,
      bankTransfer:
        paymentMethod === PaymentMethod.BankTransfer
          ? !filter.bankTransfer
          : filter.bankTransfer,
      payPal:
        paymentMethod === PaymentMethod.PayPal ? !filter.payPal : filter.payPal,
      pix: paymentMethod === PaymentMethod.Pix ? !filter.pix : filter.pix,
      cash: paymentMethod === PaymentMethod.Cash ? !filter.cash : filter.cash,
    };

    handleFilterChange(updatedFilter);
  };

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
    const updatedFilter = {
      ...filter,
      currency: currency,
    };

    handleFilterChange(updatedFilter);
  };

  const handleNameChange = (name: string) => {
    setUserName(name);
    const updatedFilter = {
      ...filter,
      userName: name,
    };

    handleFilterChange(updatedFilter);
  };

  const handleEmailChange = (email: string) => {
    setEmailAddress(email);
    const updatedFilter = {
      ...filter,
      emailAddress: email,
    };

    handleFilterChange(updatedFilter);
  };

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Filters
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <HStack spacing={10} alignItems="start">
            <Box>
              <Stack>
                <Checkbox
                  onChange={() => handleStatusCheckBoxChange(Status.Completed)}
                >
                  Completed
                </Checkbox>
                <Checkbox
                  onChange={() => handleStatusCheckBoxChange(Status.Pending)}
                >
                  Pending
                </Checkbox>
                <Checkbox
                  onChange={() => handleStatusCheckBoxChange(Status.Failed)}
                >
                  Failed
                </Checkbox>
              </Stack>
            </Box>
            <Box>
              <Stack>
                <Checkbox
                  onChange={() =>
                    handlePaymentMethodCheckBoxChange(PaymentMethod.CreditCard)
                  }
                >
                  Credit Card
                </Checkbox>
                <Checkbox
                  onChange={() =>
                    handlePaymentMethodCheckBoxChange(
                      PaymentMethod.BankTransfer
                    )
                  }
                >
                  Bank Transfer
                </Checkbox>
                <Checkbox
                  onChange={() =>
                    handlePaymentMethodCheckBoxChange(PaymentMethod.PayPal)
                  }
                >
                  PayPal
                </Checkbox>
                <Checkbox
                  onChange={() =>
                    handlePaymentMethodCheckBoxChange(PaymentMethod.Pix)
                  }
                >
                  Pix
                </Checkbox>
                <Checkbox
                  onChange={() =>
                    handlePaymentMethodCheckBoxChange(PaymentMethod.Cash)
                  }
                >
                  Cash
                </Checkbox>
              </Stack>
            </Box>
            <Box>
              <Stack spacing={2} alignItems="start">
                <Box>
                  <HStack alignItems="start">
                    <InputGroup>
                      <InputLeftElement>
                        <BsCashCoin></BsCashCoin>
                      </InputLeftElement>
                      <Input
                        value={currency}
                        onChange={(e) => handleCurrencyChange(e.target.value)}
                        placeholder="Currency"
                      />
                    </InputGroup>
                  </HStack>
                </Box>
                <Box>
                  <HStack>
                    <InputGroup>
                      <InputLeftElement>
                        <CiUser></CiUser>
                      </InputLeftElement>
                      <Input
                        value={userName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="User name"
                      />
                    </InputGroup>
                  </HStack>
                </Box>
                <Box>
                  <HStack>
                    <InputGroup>
                      <InputLeftElement>
                        <MdEmail></MdEmail>
                      </InputLeftElement>
                      <Input
                        value={emailAddress}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        placeholder="User email address"
                      />
                    </InputGroup>
                  </HStack>
                </Box>
              </Stack>
            </Box>
          </HStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Filters;

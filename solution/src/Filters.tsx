import { Box, Checkbox, HStack, Stack } from "@chakra-ui/react";
import { Filter, PaymentMethod, Status } from "./Types";

interface FiltersProps {
  handleFilterChange: (filter: Filter) => void;
  filter: Filter;
}

const Filters: React.FC<FiltersProps> = ({ handleFilterChange, filter }) => {
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

  return (
    <>
    <HStack spacing={10}>
      <Box>
        <Stack>
          <Checkbox
            onChange={() => handleStatusCheckBoxChange(Status.Completed)}
          >
            Completed
          </Checkbox>
          <Checkbox onChange={() => handleStatusCheckBoxChange(Status.Pending)}>
            Pending
          </Checkbox>
          <Checkbox onChange={() => handleStatusCheckBoxChange(Status.Failed)}>
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
              handlePaymentMethodCheckBoxChange(PaymentMethod.BankTransfer)
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
      </HStack>
    </>
  );
};

export default Filters;

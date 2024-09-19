import {
  Badge,
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { PaymentMethod, Status, Transaction } from "./Types";
import Products from "./Products";
import { useState } from "react";
import CustomerInfo from "./Customer";
import React from "react";
import {
  RxCheckCircled,
  RxClock,
  RxCrossCircled,
  RxCircleBackslash,
} from "react-icons/rx";
import { BsBank2, BsCashCoin, BsCreditCard, BsPaypal } from "react-icons/bs";
import { SiPix } from "react-icons/si";

interface PurchasesProps {
  purchases: Transaction[];
  total: number;
}

const Purchases: React.FC<PurchasesProps> = ({ purchases, total }) => {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const badgeColorMap = {
    Completed: "green.50",
    Pending: "orange.50",
    Failed: "red.50",
  };

  const toggleRow = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  return (
    <TableContainer>
      <Table>
        <TableCaption>Total Transactions: {total}</TableCaption>
        <Thead>
          <Tr>
            <Th>Purchased On</Th>
            <Th>Total</Th>
            <Th>Payment Method</Th>
            <Th>Customer</Th>
          </Tr>
        </Thead>
        <Tbody fontSize={16}>
          {purchases.map((purchase, id) => (
            <React.Fragment key={id}>
              <Tr
                sx={{
                  cursor: "pointer",
                  _hover: {
                    bg: "blue.100",
                  },
                }}

                bg={badgeColorMap[purchase.status]}
              >
                <Td onClick={() => toggleRow(id)}>
                  {purchase.date.getFullYear() +
                    "-" +
                    purchase.date.getMonth() +
                    "-" +
                    purchase.date.getDay()}
                </Td>
                <Td onClick={() => toggleRow(id)}>
                  {purchase.currency} {purchase.totalAmount}
                </Td>
                <Td onClick={() => toggleRow(id)}>
                  {purchase.paymentMethod === PaymentMethod.Cash ? (
                    <Tooltip label={PaymentMethod.Cash} placement="top" offset={[-60, 5]}>
                      <span>
                    <BsCashCoin size={25} />
                    </span>
                    </Tooltip>
                  ) : purchase.paymentMethod === PaymentMethod.BankTransfer ? (
                    <Tooltip label={PaymentMethod.BankTransfer}  placement="top" offset={[-60, 5]}>
                      <span>
                    <BsBank2 size={25} />
                    </span>
                    </Tooltip>
                  ) : purchase.paymentMethod === PaymentMethod.CreditCard ? (
                    <Tooltip label={PaymentMethod.CreditCard}  placement="top" offset={[-60, 5]}>
                      <span>
                    <BsCreditCard size={25} />
                    </span>
                    </Tooltip>
                  ) : purchase.paymentMethod === PaymentMethod.PayPal ? (
                    <Tooltip label={PaymentMethod.PayPal}  placement="top" offset={[-60, 5]}>
                      <span>
                    <BsPaypal size={25} />
                    </span>
                    </Tooltip>
                  ) : purchase.paymentMethod === PaymentMethod.Pix ? (
                    <Tooltip label={PaymentMethod.Pix}  placement="top" offset={[-60, 5]}>
                      <span>
                    <SiPix size={25} />
                    </span>
                    </Tooltip>
                  ) : (
                    <Tooltip label="Payment method info unavailable"  placement="top" offset={[-60, 5]}>
                      <span>
                    <RxCircleBackslash size={25} />
                    </span>
                    </Tooltip>
                  )}
                </Td>
                <Td>
                  <CustomerInfo customer={purchase.customer}></CustomerInfo>
                </Td>
              </Tr>
              {openRow === id && (
                <Tr>
                  <Td colSpan={5}>
                    <Box>
                      <Products products={purchase.products} currency={purchase.currency} />
                    </Box>
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Purchased On</Th>
            <Th>Total</Th>
            <Th>Payment Method</Th>
            <Th>Customer</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Purchases;

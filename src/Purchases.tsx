import {
  Box,
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Transaction } from "./Types";
import Products from "./Products";
import { useState } from "react";
import CustomerInfo from "./Customer";
import React from "react";
import PaymentMethodIcon from "./PaymentMethodIcon";

interface PurchasesProps {
  purchases: Transaction[];
}

const Purchases: React.FC<PurchasesProps> = ({ purchases }) => {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const badgeColorMap = {
    Completed: "green.50",
    Pending: "orange.50",
    Failed: "red.50",
  };

  const toggleRow = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  return (
    <>
      {isMobile ? (
        <Stack spacing={4}>
          {purchases.map((purchase, id) => (
            <Box
              key={id}
              p={4}
              bg={badgeColorMap[purchase.status]}
              border="1px"
              borderRadius="md"
              onClick={() => toggleRow(id)}
              _hover={{ bg: "blue.100" }}
            >
              <Flex justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="md" color="gray.700">
                  Date:
                </Text>
                <Text>{purchase.date.toDateString()}</Text>
              </Flex>
              <Flex justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="md" color="gray.700">
                  Total:
                </Text>
                <Text>
                  {purchase.currency} {purchase.totalAmount}
                </Text>
              </Flex>
              <Flex justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="md" color="gray.700">
                  Payment Method:
                </Text>
                <PaymentMethodIcon
                  method={purchase.paymentMethod}
                ></PaymentMethodIcon>
              </Flex>
              <Flex justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="md" color="gray.700">
                  Customer:
                </Text>
                <Text>{purchase.customer.name}</Text>
              </Flex>
              <Flex justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="md" color="gray.700">
                  Email:
                </Text>
                <Text>{purchase.customer.email}</Text>
              </Flex>
              <Flex justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="md" color="gray.700">
                  Age:
                </Text>
                <Text>{purchase.customer.age}</Text>
              </Flex>
              {openRow === id && (
                <Box>
                  <Products
                    products={purchase.products}
                    currency={purchase.currency}
                  />
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      ) : (
        <TableContainer>
          <Table size={isMobile ? "sm" : "md"}>
            <Thead>
              <Tr>
                <Th>Purchased On</Th>
                <Th>Total</Th>
                <Th>Payment Method</Th>
                <Th>Customer</Th>
              </Tr>
            </Thead>
            <Tbody fontSize={isMobile ? "14px" : "16px"}>
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
                      {purchase.date.toDateString()}
                    </Td>
                    <Td onClick={() => toggleRow(id)}>
                      {purchase.currency} {purchase.totalAmount}
                    </Td>
                    <Td onClick={() => toggleRow(id)}>
                      <PaymentMethodIcon
                        method={purchase.paymentMethod}
                      ></PaymentMethodIcon>
                    </Td>
                    <Td>
                      <CustomerInfo customer={purchase.customer}></CustomerInfo>
                    </Td>
                  </Tr>
                  {openRow === id && (
                    <Tr>
                      <Td colSpan={isMobile ? 2 : 4}>
                        <Box>
                          <Products
                            products={purchase.products}
                            currency={purchase.currency}
                          />
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
      )}
    </>
  );
};

export default Purchases;

import {
  Box,
  Button,
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Sort, Status, Transaction } from "../types/Types";
import Products from "./Products";
import { useState } from "react";
import CustomerInfo from "./Customer";
import React from "react";
import PaymentMethodIcon from "./PaymentMethodIcon";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";

interface PurchasesProps {
  purchases: Transaction[];
  sort: Sort;
  handleSort: React.Dispatch<React.SetStateAction<Sort>>;
}

const Purchases: React.FC<PurchasesProps> = ({
  purchases,
  handleSort,
  sort,
}) => {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const badgeColorMap = {
    Completed: "green",
    Pending: "orange",
    Failed: "red",
  };

  const toggleRow = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  const handleDateSort = () => {
    const updatedSort = {
      ...sort,
      dateAsc: !sort.dateAsc,
    };

    handleSort(updatedSort);
  };

  const handleTotalSort = () => {
    const updatedSort = {
      ...sort,
      totalAsc: !sort.totalAsc,
    };

    handleSort(updatedSort);
  };

  return (
    <>
      {isMobile ? (
        <Stack spacing={4}>
          {purchases.map((purchase, id) => (
            <Box
              key={id}
              p={4}
              bg={"gray.50"}
              border="1px"
              borderRadius="md"
              onClick={() => toggleRow(id)}
              _hover={{ bg: "blue.50" }}
            >
              <Flex justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="md" color="gray.700">
                  Status:
                </Text>
                <Box color={badgeColorMap[purchase.status]}>
                  {purchase.status === Status.Completed ? (
                    <FaCheckCircle />
                  ) : purchase.status === Status.Pending ? (
                    <FaClock />
                  ) : (
                    <FaCircleXmark />
                  )}
                </Box>
              </Flex>
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
                <Th w={1}>Status</Th>
                <Th>
                  Purchased On
                  <Button
                    onClick={() => handleDateSort()}
                    colorScheme="blue"
                    variant="link"
                  >
                    {sort.dateAsc ? <RxChevronUp /> : <RxChevronDown />}
                  </Button>
                </Th>
                <Th onClick={() => handleTotalSort()}>
                  Total
                  <Button
                    onClick={() => handleTotalSort()}
                    colorScheme="blue"
                    variant="link"
                  >
                    {sort.totalAsc ? <RxChevronUp /> : <RxChevronDown />}
                  </Button>
                </Th>
                <Th>Payment Method</Th>
                <Th>Customer</Th>
                <Th>Product Details</Th>
              </Tr>
            </Thead>
            <Tbody fontSize={isMobile ? "14px" : "16px"}>
              {purchases.map((purchase, id) => (
                <React.Fragment key={id}>
                  <Tr
                    sx={{
                      cursor: "pointer",
                      _hover: {
                        bg: "blue.50",
                      },
                    }}
                  >
                    <Td w={1}>
                      <Box color={badgeColorMap[purchase.status]}>
                        {purchase.status === Status.Completed ? (
                          <FaCheckCircle />
                        ) : purchase.status === Status.Pending ? (
                          <FaClock />
                        ) : (
                          <FaCircleXmark />
                        )}
                      </Box>
                    </Td>
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
                    <Td onClick={() => toggleRow(id)}>
                      <Button colorScheme="blue" variant="link">
                        {openRow === id ? <RxChevronUp /> : <RxChevronDown />}
                      </Button>
                    </Td>
                  </Tr>
                  {openRow === id && (
                    <Tr>
                      <Td colSpan={isMobile ? 2 : 6}>
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
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Purchases;

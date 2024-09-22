import {
  Box,
  Flex,
  Stack,
  Table,
  TableContainer,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Product } from "../types/Types";

export interface ProductsProps {
  products: Product[];
  currency: string;
}

const Products: React.FC<ProductsProps> = ({ products, currency }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {isMobile ? (
        <Stack spacing={4}>
          {products.map((product, id) => (
            <Box key={id} p={4} bg={"gray.100"} border="1px" borderRadius="md">
              <Flex justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="sm" color="gray.700">
                  Product:
                </Text>
                <Text fontSize={"sm"}>{product.name}</Text>
              </Flex>
              <Flex justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="sm" color="gray.700">
                  Category:
                </Text>
                <Text fontSize={"sm"}>{product.category}</Text>
              </Flex>
              <Flex justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="sm" color="gray.700">
                  Quantity:
                </Text>
                <Text fontSize={"sm"}>{product.quantity}</Text>
              </Flex>
              <Flex justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="sm" color="gray.700">
                  Price:
                </Text>
                <Text fontSize={"sm"}>{product.price}</Text>
              </Flex>
            </Box>
          ))}
        </Stack>
      ) : (
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Category</Th>
                <Th isNumeric>Quantity</Th>
                <Th>Price</Th>
              </Tr>
              {products.map((product, id) => (
                <Tr key={id} fontSize={14}>
                  <Td>{product.name}</Td>
                  <Td>{product.category}</Td>
                  <Td isNumeric>{product.quantity}</Td>
                  <Td>
                    {currency} {product.price}
                  </Td>
                </Tr>
              ))}
            </Thead>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Products;

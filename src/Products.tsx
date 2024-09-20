import { Table, TableContainer, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Product } from "./Types";

export interface ProductsProps {
  products: Product[];
  currency: string;
}

const Products: React.FC<ProductsProps> = ({ products, currency }) => {
  return (
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
              <Td>{currency} {product.price}</Td>
            </Tr>
          ))}
        </Thead>
      </Table>
    </TableContainer>
  );
};

export default Products;

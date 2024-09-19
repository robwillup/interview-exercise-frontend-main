import {
  Table,
  TableContainer,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import ProductCard from "./ProductRow";
import { ProductsProps } from "./ProductContainer";

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th isNumeric>Quantity</Th>
            <Th isNumeric>Price</Th>
          </Tr>
          {products.map((product, id) => (
            <ProductCard key={id} product={product}></ProductCard>
          ))}
        </Thead>
      </Table>
    </TableContainer>
  );
};

export default Products;

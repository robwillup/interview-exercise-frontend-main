import { Td, Tr } from "@chakra-ui/react";
import { Product } from "./Types";

interface ProductRowProps {
  product: Product;
}

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  return (
    <Tr fontSize={14}>
      <Td>{product.name}</Td>
      <Td>{product.category}</Td>
      <Td isNumeric>{product.quantity}</Td>
      <Td isNumeric>{product.price}</Td>
    </Tr>
  );
};

export default ProductRow;

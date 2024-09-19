import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import Products from "./Products";
import { Product } from "./Types";

export interface ProductsProps {
  products: Product[];
}

const ProductContainer: React.FC<ProductsProps> = ({ products }) => {
  return (
    <Accordion defaultIndex={[1]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontSize={18}>
              Product Details
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} bg={"#F7FAFC"}>
          <Products products={products}></Products>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductContainer;

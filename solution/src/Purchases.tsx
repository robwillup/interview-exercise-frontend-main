import { Box, VStack } from "@chakra-ui/react";
import { Transaction } from "./Types";
import Purchase from "./Purchase";

interface PurchasesProps {
    purchases: Transaction[];
}

const Purchases: React.FC<PurchasesProps> = ({ purchases }) => {
    return (
        <>
    <Box p="10" overflowY="auto">
        <VStack spacing={4}>
          {purchases.map((purchase, id) => (
            <Box key={id}>
              <Purchase purchase={purchase}></Purchase>
            </Box>
          ))}
        </VStack>
      </Box>
      </>
    );
};

export default Purchases;
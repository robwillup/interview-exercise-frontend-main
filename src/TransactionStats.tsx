import { Transaction } from "./Types";
import {
  Box,
  Card,
  useBreakpointValue,
} from "@chakra-ui/react";
import Stats from "./Stats";

interface PurchaseStatsProps {
  purchases: Transaction[];
}

const TransactionStats: React.FC<PurchaseStatsProps> = ({purchases}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box display="flex" justifyContent="center" p={4}>
      <Card
        p={isMobile ? "5" : "10"}
        h="90vh"
        display="flex"
        flexDirection="column"
        overflow="hidden"
        w={isMobile ? "100vw" : "80vw"}
      >
        <Stats data={purchases}></Stats>
      </Card>
    </Box>
  );
};

export default TransactionStats;

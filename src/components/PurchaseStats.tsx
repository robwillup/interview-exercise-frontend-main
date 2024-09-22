import { Transaction } from "../types/Types";
import { Box, Card, useBreakpointValue } from "@chakra-ui/react";
import PieStats from "./PieStats";
import BarStats from "./BarStats";

interface PurchaseStatsProps {
  purchases: Transaction[];
}

const PurchaseStats: React.FC<PurchaseStatsProps> = ({ purchases }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box display="flex" justifyContent="center" p={4}>
      <Card
        p={isMobile ? "5" : "10"}
        h="90vh"
        display="flex"
        flexDirection="column"
        w={isMobile ? "100vw" : "40vw"}
      >
        <PieStats data={purchases}></PieStats>
      </Card>
      <Card
        p={isMobile ? "5" : "10"}
        h="90vh"
        display="flex"
        flexDirection="column"
        w={isMobile ? "100vw" : "40vw"}
      >
        <BarStats data={purchases}></BarStats>
      </Card>
    </Box>
  );
};

export default PurchaseStats;

import { Transaction } from "../types/Types";
import { Card, Flex, useBreakpointValue } from "@chakra-ui/react";
import PieStats from "./PieStats";
import BarStats from "./BarStats";

interface PurchaseStatsProps {
  purchases: Transaction[];
}

const PurchaseStats: React.FC<PurchaseStatsProps> = ({ purchases }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction={isMobile ? "column" : "row"} gap={4} pt={4}>
      <Card maxW="lg">
        <PieStats data={purchases}></PieStats>
      </Card>
      <Card maxW="lg" >
        <BarStats data={purchases}></BarStats>
      </Card>
    </Flex>
  );
};

export default PurchaseStats;

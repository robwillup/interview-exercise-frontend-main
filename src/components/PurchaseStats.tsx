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
      <Card
        p={isMobile ? 10 : 100}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={18}
      >
        <PieStats data={purchases}></PieStats>
      </Card>
      <Card
      p={isMobile ? 10 : 100}
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize={18}>
        <BarStats data={purchases}></BarStats>
      </Card>
    </Flex>
  );
};

export default PurchaseStats;

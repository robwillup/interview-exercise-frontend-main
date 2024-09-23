import { useState } from "react";
import {
  Filter,
  Sort,
  Transaction,
} from "../types/Types";
import {
  AbsoluteCenter,
  Box,
  Card,
  Divider,
  FormControl,
  useBreakpointValue,
} from "@chakra-ui/react";
import Purchases from "./Purchases";
import Filters from "./Filters";
import PageButtons from "./PageButtons";
import SortBar from "./SortBar";
import useTransactionList from "../hooks/useTransactionList";

interface PurchaseListProps {
  purchases: Transaction[];
}

const PurchaseOverview: React.FC<PurchaseListProps> = ({ purchases }) => {
  const [filter, setFilter] = useState<Filter>({});
  const [sort, setSort] = useState<Sort>({});
  const isMobile = useBreakpointValue({ base: true, md: false });
  const listResult = useTransactionList(purchases, filter, sort, 10);

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
        <FormControl>
          <Filters handleFilterChange={setFilter} filter={filter}></Filters>
          {isMobile && <SortBar handleSort={setSort} sort={sort} />}
        </FormControl>
        <Box position="relative" padding={isMobile ? "5" : "10"}>
          <Divider />
          <AbsoluteCenter bg="white">
            {listResult.totalTransactions} Transactions
          </AbsoluteCenter>
        </Box>
        <Box flex="1" overflowY="auto">
          <Purchases
            purchases={listResult.transactions}
            handleSort={setSort}
            sort={sort}
          ></Purchases>
        </Box>
        <PageButtons
          page={listResult.page}
          lastPage={listResult.lastPage}
          handleSetPage={listResult.setPage}
        ></PageButtons>
      </Card>
    </Box>
  );
};

export default PurchaseOverview;

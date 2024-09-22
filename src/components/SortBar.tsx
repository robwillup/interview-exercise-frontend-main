import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Stack,
  Checkbox,
  useMediaQuery,
} from "@chakra-ui/react";
import { Sort } from "../types/Types";

interface SortBarProps {
  sort: Sort;
  handleSort: React.Dispatch<React.SetStateAction<Sort>>;
}

const SortBar: React.FC<SortBarProps> = ({ handleSort, sort }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleDateSort = () => {
    const updatedSort = {
      ...sort,
      dateAsc: !sort.dateAsc,
    };

    handleSort(updatedSort);
  };

  const handleTotalSort = () => {
    const updatedSort = {
      ...sort,
      totalAsc: !sort.totalAsc,
    };

    handleSort(updatedSort);
  };

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Sorting
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Flex
            direction={isMobile ? "column" : "row"}
            alignItems="start"
            gap={isMobile ? 4 : 10}
          >
            <Box>
              <Stack spacing={2}>
                <Checkbox onChange={() => handleDateSort()}>
                  Purchase Date
                </Checkbox>
                <Checkbox onChange={() => handleTotalSort()}>Total</Checkbox>
              </Stack>
            </Box>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default SortBar;

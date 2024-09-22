import { Box, Button, Stack, useBreakpointValue, Text } from "@chakra-ui/react";
import {
  RxDoubleArrowLeft,
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowRight,
} from "react-icons/rx";

interface PageButtonsProps {
  page: number;
  lastPage: number;
  handleSetPage: React.Dispatch<React.SetStateAction<number>>;
}

const PageButtons: React.FC<PageButtonsProps> = ({
  page,
  lastPage,
  handleSetPage,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box display="flex" justifyContent="center" pt={5}>
      <Stack direction="row" spacing={isMobile ? 2 : 10} align="center">
        <Button
          size={isMobile ? "xs" : "sm"}
          onClick={() => handleSetPage(0)}
          disabled={page === 0}
          colorScheme="blue"
          w={isMobile ? 50 : 100}
        >
          <RxDoubleArrowLeft />
          {!isMobile && <Text pl={2}>First</Text>}
        </Button>
        <Button
          size={isMobile ? "xs" : "sm"}
          onClick={() => handleSetPage(page === 0 ? 0 : page - 1)}
          disabled={page === 0}
          variant={page === 0 ? "outline" : "solid"}
          colorScheme={page === 0 ? "" : "blue"}
          w={isMobile ? 50 : 100}
        >
          <RxChevronLeft />
          {!isMobile && <Text pl={2}>First</Text>}
        </Button>
        <Button
          size={isMobile ? "xs" : "sm"}
          onClick={() => handleSetPage(page === lastPage ? lastPage : page + 1)}
          colorScheme={page === lastPage ? "" : "blue"}
          disabled={page === lastPage}
          variant={page === lastPage ? "outline" : "solid"}
          w={isMobile ? 50 : 100}
        >
          {!isMobile && <Text pr={2}>Next</Text>}
          <RxChevronRight />
        </Button>
        <Button
          size={isMobile ? "xs" : "sm"}
          onClick={() => handleSetPage(lastPage)}
          colorScheme="blue"
          w={isMobile ? 50 : 100}
        >
          {!isMobile && <Text pr={2}>Last</Text>}
          <RxDoubleArrowRight />
        </Button>
      </Stack>
    </Box>
  );
};

export default PageButtons;

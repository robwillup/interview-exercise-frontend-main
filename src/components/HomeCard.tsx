import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

interface HomeCardProps {
  isMobile: boolean;
  onNavigation: () => void;
  isStats: boolean;
}

const HomeCard: React.FC<HomeCardProps> = ({
  isMobile,
  onNavigation: handleNavigation,
  isStats,
}) => {
  return (
    <Card maxW="xl" onClick={isMobile ? handleNavigation : undefined}>
      <CardBody>
        <Image
          src={
            isStats
              ? "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              : "https://images.unsplash.com/photo-1616077167555-51f6bc516dfa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={isStats ? "Transaction Stats" : "Transaction List"}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">
            {isStats ? "Purchase Insights" : "Purchase Overview"}
          </Heading>
          {isStats ? (
            <Text fontSize={20} noOfLines={2}>
              Explore detailed statistics and trends from recent transactions to
              gain valuable insights into customer behavior and sales
              performance.
            </Text>
          ) : (
            <Text fontSize={20} noOfLines={2}>
              Browse through all transactions with flexible filtering and
              sorting options to easily manage and review purchases.
            </Text>
          )}
        </Stack>
      </CardBody>
      {!isMobile && (
        <CardFooter justifyContent="center">
          <ButtonGroup spacing="2">
            <Button
              onClick={handleNavigation}
              variant="solid"
              colorScheme="blue"
            >
              {isStats ? "Go to Statistics" : "Go to List"}
            </Button>
          </ButtonGroup>
        </CardFooter>
      )}
    </Card>
  );
};

export default HomeCard;

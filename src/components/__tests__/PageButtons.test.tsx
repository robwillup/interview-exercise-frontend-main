import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import PageButtons from "../PageButtons";
import { ChakraProvider } from "@chakra-ui/react";

describe("PageButtons", () => {
  const renderComponent = (page: number, lastPage: number) => {
    const handleSetPage = vi.fn();
    return render(
      <ChakraProvider>
        <PageButtons
          page={page}
          lastPage={lastPage}
          handleSetPage={handleSetPage}
        />
      </ChakraProvider>
    );
  };

  it("disables the 'First' and 'Previous' buttons when on the first page", () => {
    renderComponent(0, 5);

    expect(screen.getByRole("button", { name: /first/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
  });
});

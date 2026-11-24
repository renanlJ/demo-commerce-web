import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { MemoryRouter } from "react-router-dom";
import CatalogPage from "./CatalogPage";
import { server } from "../mocks/server";

function renderPage() {
  return render(
    <MemoryRouter>
      <CatalogPage />
    </MemoryRouter>,
  );
}

describe("CatalogPage", () => {
  it("renders products from the API", async () => {
    renderPage();

    expect(await screen.findByText("Aurora Coffee Maker")).toBeInTheDocument();
    expect(screen.getByText("Nimbus Mechanical Keyboard")).toBeInTheDocument();
    expect(screen.getByText("USD 129.99")).toBeInTheDocument();
  });

  it("shows an error state when the API fails", async () => {
    server.use(http.get("/api/v1/products", () => HttpResponse.error()));
    renderPage();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /failed to load catalog/i,
    );
  });
});

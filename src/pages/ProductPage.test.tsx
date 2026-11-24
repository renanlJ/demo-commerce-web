import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./ProductPage";
import { productFixture } from "../mocks/handlers";
import { server } from "../mocks/server";

function renderPage(productId = "SKU-1001") {
  return render(
    <MemoryRouter initialEntries={[`/products/${productId}`]}>
      <Routes>
        <Route path="/products/:productId" element={<ProductPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProductPage", () => {
  it("renders details, rating and reviews", async () => {
    renderPage();

    expect(
      await screen.findByRole("heading", { name: "Aurora Coffee Maker" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Programmable drip coffee maker."),
    ).toBeInTheDocument();
    expect(screen.getByText("1.8L")).toBeInTheDocument();
    expect(screen.getByText("alice.m")).toBeInTheDocument();
    expect(screen.getByText("Brews excellent coffee.")).toBeInTheDocument();
  });

  it("shows the degraded banner when downstream data is partial", async () => {
    server.use(
      http.get("/api/v1/products/SKU-1001", () =>
        HttpResponse.json({
          ...productFixture,
          degraded: true,
          reviews: [],
          rating: null,
        }),
      ),
    );
    renderPage();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /temporarily unavailable/i,
    );
    expect(
      screen.getByText(/ratings are currently unavailable/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/no reviews yet/i)).toBeInTheDocument();
  });

  it("shows an error for unknown products", async () => {
    renderPage("SKU-9999");
    expect(await screen.findByRole("alert")).toHaveTextContent(
      /failed to load product/i,
    );
  });
});

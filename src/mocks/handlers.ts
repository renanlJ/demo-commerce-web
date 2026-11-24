import { http, HttpResponse } from "msw";
import type { ProductAggregate, ProductSummary } from "../api/client";

export const productsFixture: ProductSummary[] = [
  {
    productId: "SKU-1001",
    name: "Aurora Coffee Maker",
    category: "Home Appliances",
    price: 129.99,
    currency: "USD",
    averageRating: 4.43,
  },
  {
    productId: "SKU-1002",
    name: "Nimbus Mechanical Keyboard",
    category: "Computer Accessories",
    price: 89.5,
    currency: "USD",
    averageRating: 4.33,
  },
];

export const productFixture: ProductAggregate = {
  productId: "SKU-1001",
  degraded: false,
  details: {
    productId: "SKU-1001",
    name: "Aurora Coffee Maker",
    description: "Programmable drip coffee maker.",
    category: "Home Appliances",
    price: 129.99,
    currency: "USD",
    specifications: { capacity: "1.8L", power: "1100W" },
  },
  reviews: [
    {
      id: "rev-1",
      productId: "SKU-1001",
      reviewer: "alice.m",
      text: "Brews excellent coffee.",
      rating: 5,
      createdAt: "2026-09-14T08:32:00Z",
    },
  ],
  rating: {
    productId: "SKU-1001",
    average: 4.43,
    count: 7,
    distribution: { "1": 0, "2": 0, "3": 1, "4": 2, "5": 4 },
  },
};

export const handlers = [
  http.get("/api/v1/products", () => HttpResponse.json(productsFixture)),
  http.get("/api/v1/products/:productId", ({ params }) => {
    if (params.productId === "SKU-1001") {
      return HttpResponse.json(productFixture);
    }
    return HttpResponse.json({ message: "product not found" }, { status: 404 });
  }),
];

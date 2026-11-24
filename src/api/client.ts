export interface ProductSummary {
  productId: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  averageRating: number | null;
}

export interface ProductDetails {
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  specifications: Record<string, string>;
}

export interface Review {
  id: string;
  productId: string;
  reviewer: string;
  text: string;
  rating: number;
  createdAt: string;
}

export interface RatingSummary {
  productId: string;
  average: number;
  count: number;
  distribution: Record<string, number>;
}

export interface ProductAggregate {
  productId: string;
  details: ProductDetails;
  reviews: Review[];
  rating: RatingSummary | null;
  degraded: boolean;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path, {
    headers: { "X-Request-ID": crypto.randomUUID().replaceAll("-", "") },
  });
  if (!res.ok) {
    throw new ApiError(res.status, `request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  listProducts: () => fetchJson<ProductSummary[]>("/api/v1/products"),
  getProduct: (productId: string) =>
    fetchJson<ProductAggregate>(`/api/v1/products/${productId}`),
};

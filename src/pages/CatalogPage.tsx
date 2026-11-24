import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, ProductSummary } from "../api/client";
import StarRating from "../components/StarRating";

export default function CatalogPage() {
  const [products, setProducts] = useState<ProductSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .listProducts()
      .then(setProducts)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return <p role="alert">Failed to load catalog: {error}</p>;
  }
  if (!products) {
    return <p>Loading catalog…</p>;
  }

  return (
    <section>
      <h1>Product catalog</h1>
      <div className="product-grid">
        {products.map((p) => (
          <Link
            key={p.productId}
            to={`/products/${p.productId}`}
            className="product-card"
          >
            <h2>{p.name}</h2>
            <p className="category">{p.category}</p>
            <p className="price">
              {p.currency} {p.price.toFixed(2)}
            </p>
            {p.averageRating !== null ? (
              <StarRating value={p.averageRating} />
            ) : (
              <span className="no-rating">No ratings yet</span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

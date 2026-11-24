import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, ProductAggregate } from "../api/client";
import StarRating from "../components/StarRating";

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductAggregate | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      return;
    }
    api
      .getProduct(productId)
      .then(setProduct)
      .catch((err: Error) => setError(err.message));
  }, [productId]);

  if (error) {
    return (
      <p role="alert">
        Failed to load product: {error}. <Link to="/">Back to catalog</Link>
      </p>
    );
  }
  if (!product) {
    return <p>Loading product…</p>;
  }

  const { details } = product;
  return (
    <article>
      {product.degraded && (
        <p role="alert" className="degraded-banner">
          Some product information is temporarily unavailable. Showing partial
          data.
        </p>
      )}

      <h1>{details.name}</h1>
      <p className="category">{details.category}</p>
      <p className="price">
        {details.currency} {details.price.toFixed(2)}
      </p>
      <p>{details.description}</p>

      <h2>Specifications</h2>
      <table className="spec-table">
        <tbody>
          {Object.entries(details.specifications).map(([key, value]) => (
            <tr key={key}>
              <th>{key}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Ratings</h2>
      {product.rating ? (
        <div className="rating-summary">
          <StarRating
            value={product.rating.average}
            count={product.rating.count}
          />
          <ul className="distribution">
            {[5, 4, 3, 2, 1].map((star) => {
              const n = product.rating!.distribution[String(star)] ?? 0;
              const pct =
                product.rating!.count > 0
                  ? (n / product.rating!.count) * 100
                  : 0;
              return (
                <li key={star}>
                  {star}★{" "}
                  <span className="bar">
                    <span className="bar-fill" style={{ width: `${pct}%` }} />
                  </span>
                  {n}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Ratings are currently unavailable.</p>
      )}

      <h2>Reviews</h2>
      {product.reviews.length > 0 ? (
        <ul className="review-list">
          {product.reviews.map((r) => (
            <li key={r.id} className="review">
              <div className="review-head">
                <strong>{r.reviewer}</strong>
                <StarRating value={r.rating} />
                <time dateTime={r.createdAt}>
                  {new Date(r.createdAt).toLocaleDateString()}
                </time>
              </div>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </article>
  );
}

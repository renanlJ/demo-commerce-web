interface StarRatingProps {
  value: number;
  count?: number;
}

/** Renders a 5-star rating indicator with partial fill support. */
export default function StarRating({ value, count }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.max(0, Math.min(1, value - i));
    return (
      <span key={i} className="star" aria-hidden="true">
        <span className="star-fill" style={{ width: `${fill * 100}%` }}>
          ★
        </span>
        ★
      </span>
    );
  });
  return (
    <span className="star-rating" aria-label={`rated ${value} out of 5`}>
      {stars}
      {count !== undefined && <span className="star-count">({count})</span>}
    </span>
  );
}

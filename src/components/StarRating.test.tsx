import { render, screen } from "@testing-library/react";
import StarRating from "./StarRating";

describe("StarRating", () => {
  it("renders an accessible label with the value", () => {
    render(<StarRating value={4.5} />);
    expect(screen.getByLabelText("rated 4.5 out of 5")).toBeInTheDocument();
  });

  it("renders the review count when provided", () => {
    render(<StarRating value={4.43} count={7} />);
    expect(screen.getByText("(7)")).toBeInTheDocument();
  });
});

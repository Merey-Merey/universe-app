import React from "react";

interface PaginationDotsProps {
  total: number;
  active: number;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({ total, active }) => (
  <div className="pagination">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`pagination__dot ${i === active ? "pagination__dot--active" : "pagination__dot--inactive"}`}
      />
    ))}
  </div>
);

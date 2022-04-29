import React from "react";

export default function Pagination({ currentPage, setCurrentPage, totalCount, pokemonsPerPage }) {
  const isFirstPage = currentPage === 1;
  const totalPages = Math.ceil(totalCount / pokemonsPerPage);
  const isLastPage = currentPage === totalPages;

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button disabled={isFirstPage} onClick={() => setCurrentPage(currentPage - 1)}>
        anterior
      </button>
      {pageNumbers.map((p) => (
        <button key={p} onClick={() => setCurrentPage(p)}>{p}</button>
      ))}
      <button disabled={isLastPage} onClick={() => setCurrentPage(currentPage + 1)}>
        siguiente
      </button>
    </div>
  );
}

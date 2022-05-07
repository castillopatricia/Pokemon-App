import React from "react";
import "./pagination.css";

export default function Pagination({ currentPage, setCurrentPage, totalCount, pokemonsPerPage }) {
  const isFirstPage = currentPage === 1;
  const totalPages = Math.ceil(totalCount / pokemonsPerPage);
  const isLastPage = currentPage === totalPages;

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginado">
      <button className="boton" disabled={isFirstPage} onClick={() => setCurrentPage(currentPage - 1)}>
        anterior
      </button>
      {pageNumbers.map((p) => (
        <button className="numeros" key={p} onClick={() => setCurrentPage(p)}>
          {p}
        </button>
      ))}
      <button className="boton" disabled={isLastPage} onClick={() => setCurrentPage(currentPage + 1)}>
        siguiente
      </button>
    </div>
  );
}

import React, { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../context/PokemonContext";

export const PaginationPokemons = () => {
  const { size, setPagineSelected } = useContext(PokemonContext);
  const [buttons, setButtons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let cantidadPaginas = Math.ceil(size / 12);

  const dataPaginate = (page) => {
    setPagineSelected(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    const newButtons = [];
    const totalPages = Math.ceil(size / 12);
    const maxVisibleButtons = 3;
    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(maxVisibleButtons, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      newButtons.push(
        <button
          className={`btn-load-more ${i === currentPage ? "active" : ""}`}
          key={i}
          onClick={() => dataPaginate(i)}
        >
          {i}
        </button>
      );
    }

    setButtons(newButtons);
  }, [size, currentPage]);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < cantidadPaginas) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="btn-load-more" onClick={goToPrevPage}>
          Previo
        </button>
        {buttons}
        <button className="btn-load-more" onClick={goToNextPage}>
          Siguiente
        </button>
      </div>
    </>
  );
};

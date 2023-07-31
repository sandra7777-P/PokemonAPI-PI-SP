import React, { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../context/PokemonContext";

export const PaginationPokemons = () => {
  const {size, setPagineSelected } = useContext(PokemonContext);
  const [buttons, setButtons] = useState([]);

  let cantidadPaginas = (size + 12 - 1) / 12;
  
  const dataPaginate = (pagineSelected) => {
    setPagineSelected(pagineSelected)
  };

  useEffect(() => {
    const newButtons = [];
    for (let i = 1; i <= cantidadPaginas; i++) {
      newButtons.push(
        <button className="btn-load-more" key={i} onClick={() => dataPaginate(i)}>
          {i}
        </button>
      );
    }
    setButtons(newButtons);
  }, [cantidadPaginas]);

  return (
    <>
      <div>
        <button className="btn-load-more">Cargar menos</button>
        {buttons}

        <button className="btn-load-more">Cargar más</button>
      </div>
    </>
  );
};

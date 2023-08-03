import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { FilterBar, PokemonList, PaginationPokemons } from "../components";
import { PokemonContext } from "../context/PokemonContext";
import CreatePokemonForm from "../components/CreatePokemonForm";

export const HomePage = () => {
  const { active, setActive, sortData } =
    useContext(PokemonContext);
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
      setShowForm(!showForm);
    };

  return (
    <>
      <div className="container-filter container" style={{ display: "flex", justifyContent: "center" }}>
        <div className="icon-filter" onClick={() => setActive(!active)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
          <span>Filtrar</span>
        </div>
        <div style={{ display: "row", justifyContent: "center" }}>
          <button className="btn-load-more" onClick={() => sortData()}>
            A - Z
          </button>

          <button className="btn-load-more" onClick={() => sortData(false)}>
            Z - A
          </button>
        </div>
        <div className="container-btn-load-more container">
        {/* Botón "Crear" para mostrar/ocultar el formulario mostrar en pagina nueva */}
        <Link 
        to= {
          `/create`
        }><button onClick={toggleForm}>Crear</button></Link> 
      </div>

      {/* Mostrar el formulario solo si showForm es verdadero */}
      {showForm && <CreatePokemonForm />}
      </div>
      <PokemonList />
      <FilterBar />
	  <PaginationPokemons />
      <div className="container-btn-load-more container">

            
      </div>
    </>
  );
};

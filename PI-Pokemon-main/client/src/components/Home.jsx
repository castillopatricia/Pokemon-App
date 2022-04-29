import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../actions";
import { Link } from "react-router-dom";
import Pokemon from "./Pokemon";
import "./home.css";
import Pagination from "./Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function paginate() {
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    return currentPokemons;
  }
  const paginatedPokemons = paginate();

  return (
    <div>
      <Link to="/home"> Ver Pokemon</Link>
      <h1> Pagina principal de pokemons</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        cargar todos los pokemons
      </button>
      <div>
        <form>
          ingresar nombre
          <input />
        </form>
        <select>
          <option value="asc">mayor fuerza</option>
          <option value="des">menor fuerza</option>
        </select>
        <select>
          <option>A - Z</option>
          <option> Z - A</option>
        </select>
        <select defaultValue="">
          <option value="" disabled>
            tipos de pokemons
          </option>

          {types.map((t) => (
            <option key={t.id}>{t.nombre}</option>
          ))}
        </select>
        <select>
          <option value="created">creados en base de datos</option>
          <option value="Api">de pokeApi</option>
          <option value="All">todos los pokemons</option>
        </select>
      </div>

      <div className="pokemons">
        {paginatedPokemons.map((p) => (
          <Pokemon nombre={p.nombre} imagen={p.imagen} tipo={p.tipo} key={p.id} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={allPokemons.length}
        pokemonsPerPage={pokemonsPerPage}
      />
    </div>
  );
}

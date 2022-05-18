import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, filterByTypes, filterByCreate, orderByName, orderByForce } from "../actions";
import { Link } from "react-router-dom";
import Pokemon from "./Pokemon";
import "./home.css";
import Pagination from "./Pagination";
import SearchBar from "./Search";
import Loader from "./Loader";

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const loading = useSelector((state) => state.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  function paginate() {
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    return currentPokemons;
  }
  const paginatedPokemons = paginate();

  function handleFilterByTypes(e) {
    setCurrentPage(1);
    dispatch(filterByTypes(e.target.value));
  }
  function handleFilterByCreate(e) {
    setCurrentPage(1);
    dispatch(filterByCreate(e.target.value));
  }
  function handleOrder(e) {
    e.preventDefault();
    setCurrentPage(1);

    dispatch(orderByName(e.target.value));
  }
  function handleForce(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByForce(e.target.value));
  }

  return (
    <div className="home">
      <h1 className="title">Pokemon app:</h1>
      <div className="buttonBar">
        <Link className="btn" to="/create">
          Crear un Pokemon
        </Link>
          <SearchBar />
      </div>
      <div>
        <div className="filtrados">
          <select onChange={(e) => handleForce(e)}>
            <option value="">fuerza</option>
            <option value="mayor">mayor fuerza</option>
            <option value="menor">menor fuerza</option>
          </select>
          <select onChange={(e) => handleOrder(e)}>
            <option value="">nombre</option>
            <option value="asc">A - Z</option>
            <option value="desc"> Z - A</option>
          </select>
          <select onChange={(e) => handleFilterByTypes(e)}>
            <option value="All">todos los tipos</option>

            {types.map((t) => (
              <option key={t.id}>{t.nombre}</option>
            ))}
          </select>
          <select onChange={(e) => handleFilterByCreate(e)}>
            <option value="All">todos los pokemons</option>
            <option value="created">creados en base de datos</option>
            <option value="Api">de pokeApi</option>
          </select>
        </div>

        <div>
          {loading ? (
            <Loader />
          ) : (
            <div className="pokemons">
              {paginatedPokemons.map((p) => (
                <Pokemon
                  nombre={p.nombre}
                  imagen={p.imagen}
                  tipos={p.tipos}
                  key={p.id}
                  id={p.id}
                  createdInDb={p.createdInDb}
                 
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={pokemons.length}
        pokemonsPerPage={pokemonsPerPage}
      />
      <br />
      <Link to="/" className="b">
        volver al inicio
      </Link>
    </div>
  );
}

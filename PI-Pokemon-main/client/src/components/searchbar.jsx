import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsByName } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [namePokemon, setNamePokemon] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setNamePokemon(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPokemonsByName(namePokemon));
  }

  return (
    <div>
      <input type="text" placeholder="busqueda" onChange={(e) => handleInputChange(e)} />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Ingresar nombre
      </button>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postPokemon, getTypes } from "../actions";
import { validate } from "../helpers/validations";
import ValidateInput from "./ValidateInput";
import ValidateSelect from "./ValidateSelect";

export default function PokemonCreate() {
  const allTypes = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    nombre: "",
    tipos: [],
    imagen: "",
    vida: "",
    peso: "",
    altura: "",
    defensa: "",
    velocidad: "",
    fuerza: "",
  });
  const errors = validate(input);


  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    alert("pokemon creado");
  }

  function handleTypes(e) {
    e.preventDefault();
    setInput({
      ...input,
      tipos: [...input.tipos, e.target.value],
    });
  }
  function handleRemove(tipo) {
    setInput({
      ...input,
      tipos: input.tipos.filter((t) => t !== tipo),
    });
  }

  return (
    <div>
      <Link to="/home">
        <button>volver</button>
      </Link>
      <h1>Crear Pokemón</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ValidateInput
          type="text"
          value={input.nombre}
          name="nombre"
          label="Nombre"
          error={errors.nombre}
          onChange={(e) => handleChange(e)}
        />
        <ValidateSelect
          allTypes={allTypes}
          tipos={input.tipos}
          name="tipos"
          error={errors.tipos}
          handleTypes={handleTypes}
          handleRemove={handleRemove}
        />

        <ValidateInput
          type="number"
          value={input.vida}
          name="vida"
          label="Vida"
          error={errors.vida}
          onChange={(e) => handleChange(e)}
        />

        <ValidateInput
          type="number"
          value={input.peso}
          name="peso"
          label="Peso"
          error={errors.peso}
          onChange={(e) => handleChange(e)}
        />

        <ValidateInput
          type="number"
          value={input.fuerza}
          name="fuerza"
          label="Fuerza"
          error={errors.fuerza}
          onChange={(e) => handleChange(e)}
        />

        <ValidateInput
          type="number"
          value={input.velocidad}
          name="velocidad"
          label="Velocidad"
          error={errors.velocidad}
          onChange={(e) => handleChange(e)}
        />

        <ValidateInput
          type="number"
          value={input.defensa}
          name="defensa"
          label="Defensa"
          error={errors.defensa}
          onChange={(e) => handleChange(e)}
        />

        <ValidateInput
          type="number"
          value={input.altura}
          name="altura"
          label="Altura"
          error={errors.altura}
          onChange={(e) => handleChange(e)}
        />

        <ValidateInput
          type="text"
          value={input.imagen}
          name="imagen"
          label="Imagen"
          error={errors.imagen}
          onChange={(e) => handleChange(e)}
        />

        <button> crear</button>
      </form>
    </div>
  );
}

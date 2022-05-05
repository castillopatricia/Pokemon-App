import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postPokemon, getTypes } from "../actions";
import { validate } from "../helpers/validations";
import ValidateInput from "./ValidateInput";
import ValidateSelect from "./ValidateSelect";
import axios from "axios";

export default function PokemonCreate() {
  const allTypes = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const [nombreDisponible, setNombreDisponible] = useState(true);
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
  const errors = validate(input, nombreDisponible);

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
    const { nombre, tipos, imagen, altura, peso, defensa, fuerza, velocidad } = errors;
    if (nombre || tipos || imagen || altura || peso || defensa || fuerza || velocidad) {
      return alert("no se puede crear el pokemon");
    }

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
  async function onBlurNombre() {
    try {
      var json = await axios.get("http://localhost:3001/pokemons?name=" + input.nombre);
      setNombreDisponible(false);
    } catch (error) {
      setNombreDisponible(true);
    }
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
          onBlur={onBlurNombre}
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

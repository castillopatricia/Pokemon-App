import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes } from "../actions";
import { getErrors } from "../helpers/errors";
import ValidateInput from "./ValidateInput";
import ValidateSelect from "./ValidateSelect";
import axios from "axios";
import "./pokemonCreate.css";
import Loader from "./Loader";
import { baseUrl } from "../config";

export default function PokemonCreate() {
  const allTypes = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
  const [isFormValidated, setIsFormValidated] = useState(false);
  const errors = getErrors(input, nombreDisponible);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeName(e) {
    e.preventDefault();
    setNombreDisponible(true);
    setInput({
      ...input,
      nombre: e.target.value,
    });
  }

  function handleTypes(e) {
    e.preventDefault();
    if (!input.tipos.includes(e.target.value)) {
      setInput({
        ...input,
        tipos: [...input.tipos, e.target.value],
      });
    }
  }
  function handleRemove(tipo) {
    setInput({
      ...input,
      tipos: input.tipos.filter((t) => t !== tipo),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsFormValidated(true);

    const errors = getErrors(input, nombreDisponible);
    if (
      errors.nombre ||
      errors.tipos ||
      errors.imagen ||
      errors.altura ||
      errors.peso ||
      errors.defensa ||
      errors.fuerza ||
      errors.velocidad
    ) {
      return alert("no se puede crear el pokemon");
    }

    setLoading(true);
    try {
      await axios.get(`${baseUrl}/pokemons?name=` + input.nombre);
      setNombreDisponible(false);
      setLoading(false);
      alert("no se puede crear el pokemon");
      return;
    } catch (error) {
      setNombreDisponible(true);
    }

    try {
      await axios.post(`${baseUrl}/pokemons`, input);

      alert("pokemon creado");
      setInput({
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
    } catch (error) {
      alert("pokemon  no puede ser creado");
    }
    setLoading(false);
  }

  return (
    <div className="creacionPokemon">
      <Link to="/home" className="btn volver">
        volver
      </Link>
      <h1 className="tituloForm">Crea un Pokemón</h1>

      <form className="formulario" onSubmit={(e) => handleSubmit(e)}>
        <ValidateInput
          type="text"
          value={input.nombre}
          name="nombre"
          label="Nombre"
          error={errors.nombre}
          onChange={(e) => handleChangeName(e)}
          isFormValidated={isFormValidated}
        />
        <ValidateSelect
          allTypes={allTypes}
          tipos={input.tipos}
          name="tipos"
          error={errors.tipos}
          handleTypes={handleTypes}
          handleRemove={handleRemove}
          isFormValidated={isFormValidated}
        />

        <ValidateInput
          type="number"
          value={input.vida}
          name="vida"
          label="Vida"
          error={errors.vida}
          onChange={(e) => handleChange(e)}
          isFormValidated={isFormValidated}
        />

        <ValidateInput
          type="number"
          value={input.peso}
          name="peso"
          label="Peso"
          error={errors.peso}
          onChange={(e) => handleChange(e)}
          isFormValidated={isFormValidated}
        />

        <ValidateInput
          type="number"
          value={input.fuerza}
          name="fuerza"
          label="Fuerza"
          error={errors.fuerza}
          onChange={(e) => handleChange(e)}
          isFormValidated={isFormValidated}
        />

        <ValidateInput
          type="number"
          value={input.velocidad}
          name="velocidad"
          label="Velocidad"
          error={errors.velocidad}
          onChange={(e) => handleChange(e)}
          isFormValidated={isFormValidated}
        />

        <ValidateInput
          type="number"
          value={input.defensa}
          name="defensa"
          label="Defensa"
          error={errors.defensa}
          onChange={(e) => handleChange(e)}
          isFormValidated={isFormValidated}
        />

        <ValidateInput
          type="number"
          value={input.altura}
          name="altura"
          label="Altura"
          error={errors.altura}
          onChange={(e) => handleChange(e)}
          isFormValidated={isFormValidated}
        />

        <ValidateInput
          type="text"
          value={input.imagen}
          name="imagen"
          label="Imagen"
          error={errors.imagen}
          onChange={(e) => handleChange(e)}
          isFormValidated={isFormValidated}
        />

        <button className="btn" type="onSubmit">
          {" "}
          crear
        </button>
        {loading && <Loader />}
      </form>
    </div>
  );
}

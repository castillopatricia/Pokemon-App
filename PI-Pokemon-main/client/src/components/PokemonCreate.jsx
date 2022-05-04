import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postPokemon, getTypes } from "../actions";

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

  console.log("🚀 ~ file: PokemonCreate.jsx ~ line 10 ~ PokemonCreate ~ input", input);
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
        <div>
          <label>Nombre:</label>
          <input type="text" value={input.nombre} name="nombre" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label>Tipo:</label>
          <select name="tipos" onChange={(e) => handleTypes(e)}>
            {allTypes.map((t) => (
              <option key={t.id}>{t.nombre}</option>
            ))}
          </select>

          {input.tipos.map((t) => (
            <button key={t} type="button" onClick={() => handleRemove(t)}>
              {t} x
            </button>
          ))}
        </div>
        <div>
          <label>Vida:</label>
          <input type="number" value={input.vida} name="vida" onChange={(e) => handleChange(e)} />
        </div>

        <div>
          <label>Peso:</label>
          <input type="number" value={input.peso} name="peso" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label>Fuerza:</label>
          <input type="number" value={input.fuerza} name="fuerza" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label>Velocidad:</label>
          <input type="number" value={input.velocidad} name="velocidad" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label>Defensa:</label>
          <input type="number" value={input.defensa} name="defensa" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label>Altura:</label>
          <input type="number" value={input.altura} name="altura" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label>Imagen:</label>
          <input type="text" value={input.imagen} name="imagen" onChange={(e) => handleChange(e)} />
        </div>
        <button> crear</button>
      </form>
    </div>
  );
}

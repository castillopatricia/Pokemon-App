import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions";
import Loader from "./Loader";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const pokemon = useSelector((state) => state.pokemonDetail);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {" "}
          <h4>nombre:{pokemon.nombre}</h4>
          <h4>id:{pokemon.id}</h4>
          <h4>tipos:{pokemon.tipo}</h4>
          <h4>vida:{pokemon.vida}</h4>
          <h4>altura:{pokemon.altura}</h4>
          <h4>defensa:{pokemon.defensa}</h4>
          <h4>fuerza:{pokemon.fuerza}</h4>
          <h4>velocidad:{pokemon.velocidad}</h4>
          <h4>peso:{pokemon.peso}</h4>
          <img src={pokemon.imagen} alt={pokemon.nombre} />
        </div>
      )}
      <Link to="/home">
        <button>volver</button>
      </Link>
    </div>
  );
}

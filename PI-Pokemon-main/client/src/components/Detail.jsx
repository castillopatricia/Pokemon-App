import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions";
import Loader from "./Loader";
import "./detail.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const loading = useSelector((state) => state.loading);
  const history = useHistory();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const pokemon = useSelector((state) => state.pokemonDetail);

  return (
    <div className="fondoPagina">
      {loading ? (
        <Loader />
      ) : (
        <div className="detalle">
          <h4>
            <span className="propiedades">nombre: </span>
            {pokemon.nombre}
          </h4>
          <h4>
            <span className="propiedades">id: </span>
            {pokemon.id}
          </h4>
          <h4>
            <span className="propiedades">tipos: </span>
            {pokemon.tipos?.map((tipo) => (
              <span key={tipo.nombre} className={`tipo ${tipo.nombre}`}>
                {tipo.nombre}
              </span>
            ))}
          </h4>
          <h4>
            <span className="propiedades">vida: </span>
            {pokemon.vida}
          </h4>
          <h4>
            <span className="propiedades">altura: </span>
            {pokemon.altura}
          </h4>
          <h4>
            <span className="propiedades">defensa: </span>
            {pokemon.defensa}
          </h4>
          <h4>
            <span className="propiedades">fuerza: </span>
            {pokemon.fuerza}
          </h4>
          <h4>
            <span className="propiedades">velocidad: </span>
            {pokemon.velocidad}
          </h4>
          <h4>
            <span className="propiedades">peso: </span>
            {pokemon.peso}
          </h4>
          <img width="300px" src={pokemon.imagen} alt={pokemon.nombre} />
        </div>
      )}
      <div>
        <button className="btn" onClick={() => history.goBack()}>
          volver
        </button>
      </div>
    </div>
  );
}

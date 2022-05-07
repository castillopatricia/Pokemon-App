import React from "react";
import { Link } from "react-router-dom";
import "./pokemon.css";

export default function Pokemon({ nombre, tipos, imagen, id }) {
  return (
    <div className="card">
      <h3 className="nombre">{nombre}</h3>
      <h5>
        {tipos.map((t) => (
          <span className="tipo">{t.nombre}</span>
        ))}
      </h5>

      <Link to={`/pokemon/${id}`}>
        <img src={imagen} alt={nombre} />
      </Link>
    </div>
  );
}

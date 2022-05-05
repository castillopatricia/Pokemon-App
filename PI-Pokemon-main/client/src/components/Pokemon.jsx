import React from "react";
import { Link } from "react-router-dom";

export default function Pokemon({ nombre, tipos, imagen, id }) {
  return (
    <div>
      <h3>{nombre}</h3>
      <h5>{tipos.map((t) => t.nombre)}</h5>
      <Link to={`/pokemon/${id}`}>
        <img src={imagen} alt={nombre} />
      </Link>
    </div>
  );
}

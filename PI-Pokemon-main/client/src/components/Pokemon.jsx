import React from "react";

export default function Pokemon({ nombre, tipos, imagen}) {
  return (
    <div>
      <h3>{nombre}</h3>
      <h5>{tipos.map((t) => t.nombre)}</h5>
      <img src={imagen} alt={nombre} />
    </div>
  );
}

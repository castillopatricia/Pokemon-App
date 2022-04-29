import React from "react";

export default function Pokemon({ nombre, tipo, imagen }) {
  return (
    <div>
      <h3>{nombre}</h3>
      <h5>{tipo}</h5>
      <img src={imagen} alt="imagen pokemon"/>
    </div>
  );
}

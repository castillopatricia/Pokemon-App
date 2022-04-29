import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <h1> Bienvenidos</h1>

      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}

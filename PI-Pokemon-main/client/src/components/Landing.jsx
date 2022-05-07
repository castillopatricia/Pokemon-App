import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <h1 className="h1">Pokemon app</h1>
      <br></br>

      <Link to="/home">
        <button className="button">Ingresar</button>
      </Link>
    </div>
  );
}

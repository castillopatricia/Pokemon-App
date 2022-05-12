import "./validateInput.css";
import { useState } from "react";

export default function ValidateInput({ onChange, error, name, value, type, label, isFormValidated }) {
  const [isValidated, setIsValidated] = useState(false);

  function handleChange(e) {
    setIsValidated(true);
    onChange(e);
  }

  return (
    <div>
      <label>{label}:</label>
      <input type={type} value={value} name={name} onChange={(e) => handleChange(e)} />
      <div className="errors">{isValidated || isFormValidated ? error : ""}</div>
    </div>
  );
}

import "./validateSelect.css";
import { useState } from "react";

export default function ValidateSelect({ tipos, name, allTypes, handleRemove, handleTypes, error,isFormValidated}) {
  const [isValidated, setIsValidated] = useState(false);

  function handleChange(e) {
    setIsValidated(true);
    handleTypes(e);
  }

  return (
    <div>
      <label>Tipo:</label>
      <select className="selectTipos" disabled={tipos[1]} name={name} onChange={(e) => handleChange(e)}>
        {allTypes.map((t) => (
          <option key={t.id}>{t.nombre}</option>
        ))}
      </select>

      {tipos.map((t) => (
        <button key={t} type="button" onClick={() => handleRemove(t)}>
          {t} x
        </button>
      ))}
      <div className="errors">{isValidated||isFormValidated ? error : ""}</div>
    </div>
  );
}

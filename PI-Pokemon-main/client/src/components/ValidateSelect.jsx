
import "./validateSelect.css";


export default function ValidateSelect({ tipos, name, allTypes, handleRemove, handleTypes, error }) {
console.log("🚀 ~ file: ValidateSelect.jsx ~ line 6 ~ ValidateSelect ~ error", error)

  return (
    <div>
      <label>Tipo:</label>
      <select className="selectTipos" disabled={tipos[1]} name={name} onChange={(e) => handleTypes(e)}>
        {allTypes.map((t) => (
          <option key={t.id}>{t.nombre}</option>
        ))}
      </select>

      {tipos.map((t) => (
        <button key={t} type="button" onClick={() => handleRemove(t)}>
          {t} x
        </button>
      ))}
      <div className="errors">{error}</div>
    </div>
  );
}

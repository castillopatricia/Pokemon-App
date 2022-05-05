export default function ValidateSelect({ tipos, name, allTypes, handleRemove, handleTypes, error }) {
  return (
    <div>
      <label>Tipo:</label>
      <select disabled={tipos[1]} name={name} onChange={(e) => handleTypes(e)}>
        {allTypes.map((t) => (
          <option key={t.id}>{t.nombre}</option>
        ))}
      </select>

      {tipos.map((t) => (
        <button key={t} type="button" onClick={() => handleRemove(t)}>
          {t} x
        </button>
      ))}
      <div>{error}</div>
    </div>
  );
}

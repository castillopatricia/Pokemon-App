import './validateInput.css'

export default function ValidateInput({ onChange, error, name, value, type, label}) {
  return (
    <div>
      <label>{label}:</label>
      <input type={type} value={value} name={name} onChange={(e) => onChange(e)} />
      <div className="errors">{error}</div>
    </div>
  );
}

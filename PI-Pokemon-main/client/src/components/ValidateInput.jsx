export default function ValidateInput({ onChange, error, name, value, type, label, onBlur }) {
  return (
    <div>
      <label>{label}:</label>
      <input type={type} value={value} name={name} onChange={(e) => onChange(e)} onBlur={onBlur} />
      <div>{error}</div>
    </div>
  );
}

export default function Input({ label, ...props }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input className="input-field" {...props} />
    </div>
  );
}

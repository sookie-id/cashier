import { useId } from "react";
import "./FloatingInput.css";

export default function FloatingInput({
  label,
  type,
  onChange,
}: {
  label: string;
  type: string;
  onChange: (value: string) => void;
}) {
  const id = useId();

  return (
    <div className="input-container">
      <input type={type} id={id} required onChange={(e) => onChange(e.target.value)} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

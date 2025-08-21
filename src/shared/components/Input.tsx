import { useId } from "react";
import { InputContainer } from "./Input.styled";

export default function Input({
  label,
  onChange,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label: string;
  onChange: (value: string) => void;
}) {
  const id = useId();

  return (
    <InputContainer>
      <input id={id} onChange={(e) => onChange(e.target.value)} {...props} />
      <label htmlFor={id}>{label}</label>
    </InputContainer>
  );
}

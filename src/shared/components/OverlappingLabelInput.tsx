import { useId } from "react";
import { InputContainer } from "./OverlappingLabelInput.styled";

export default function OverlappingLabelInput({
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
    <InputContainer>
      <input
        type={type}
        id={id}
        required
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
    </InputContainer>
  );
}

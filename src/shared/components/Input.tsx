import { useId } from "react";
import { InputContainer, Label, StyledInput } from "./Input.styled";

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
    <InputContainer className={props.className}>
      <StyledInput
        id={id}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      <Label htmlFor={id}>{label}</Label>
    </InputContainer>
  );
}

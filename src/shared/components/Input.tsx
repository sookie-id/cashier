import { useId } from "react";
import { InputContainer, Label, StyledInput } from "./Input.styled";

export default function Input({
  label,
  onChange,
  ref,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label: string;
  onChange: (value: string) => void;
  ref?: React.Ref<HTMLInputElement>;
}) {
  const id = useId();

  return (
    <InputContainer className={props.className}>
      <StyledInput
        id={id}
        onChange={(e) => onChange(e.target.value)}
        ref={ref}
        {...props}
      />
      <Label htmlFor={id}>{label}</Label>
    </InputContainer>
  );
}

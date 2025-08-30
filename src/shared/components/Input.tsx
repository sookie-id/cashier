import { useId } from "react";
import { InputContainer, Label, StyledInput } from "./Input.styled";

export default function Input({
  label,
  onChangeValue: onChangeValue,
  ref,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label: string;
  onChangeValue: (value: string) => void;
  ref?: React.Ref<HTMLInputElement>;
}) {
  const id = useId();

  return (
    <InputContainer className={props.className}>
      <StyledInput
        id={id}
        onChange={(e) => onChangeValue(e.target.value)}
        ref={ref}
        {...props}
      />
      <Label htmlFor={id}>{label}</Label>
    </InputContainer>
  );
}

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
  const { className, ...restProps } = props;

  return (
    <InputContainer className={className}>
      <StyledInput
        id={id}
        onChange={(e) => onChangeValue(e.target.value)}
        ref={ref}
        {...restProps}
      />
      <Label htmlFor={id}>{label}</Label>
    </InputContainer>
  );
}

import { useId } from "react";
import { ThemeProvider } from "styled-components";
import { globalTheme } from "../../theme";
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
    <ThemeProvider theme={globalTheme}>
      <InputContainer>
        <input
          type={type}
          id={id}
          required
          onChange={(e) => onChange(e.target.value)}
        />
        <label htmlFor={id}>{label}</label>
      </InputContainer>
    </ThemeProvider>
  );
}

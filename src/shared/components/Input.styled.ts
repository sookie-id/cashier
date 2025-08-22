import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ theme }) => theme.spacing[1200]};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) =>
    theme.spacing[400] + " " + theme.spacing[300] + " " + theme.spacing[300]};
  border: 2px solid ${({ theme }) => theme.color.grey[400]};
  border-radius: ${({ theme }) => theme.spacing[200]};
  font-size: ${({ theme }) => theme.spacing[400]};
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.color.primary1[700]};
  }
`;

export const Label = styled.label`
  position: absolute;
  top: -${({ theme }) => theme.spacing[200]};
  left: ${({ theme }) => theme.spacing[300]};
  background: white;
  padding: 0 ${({ theme }) => theme.spacing[100]};
  color: ${({ theme }) => theme.color.grey[700]};
  font-size: ${({theme}) => theme.spacing[400]};
  pointer-events: none;
  transition: 0.2s ease all;

  ${InputContainer}:focus-within & {
    color: ${({ theme }) => theme.color.primary1[800]};
  }
`;

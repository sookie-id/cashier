import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ theme }) => theme.spacing[1200]};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 16px 12px 6px; /* extra space at top for label */
  border: 2px solid ${({ theme }) => theme.color.grey[400]};
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.color.primary1[700]};
  }
`;

export const Label = styled.label`
  position: absolute;
  top: -8px;
  left: 12px;
  background: white;
  padding: 0 4px;
  color: ${({ theme }) => theme.color.grey[900]};
  font-size: 14px;
  pointer-events: none;
  transition: 0.2s ease all;

  ${InputContainer}:focus-within & {
    color: ${({ theme }) => theme.color.primary1[1000]};
  }
`;

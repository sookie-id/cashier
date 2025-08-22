import styled from "styled-components";
import { PrimaryButton } from "../../shared/components/Button.styled";
import Input from "../../shared/components/Input";

export const LoginContainer = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing[700]};
  border-radius: ${({ theme }) => theme.spacing[500]};
  box-shadow: ${({ theme }) => theme.shadow[100]};
  width: ${({ theme }) => theme.spacing[1300]};
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[500]};
  align-items: center;
  transform: translate(-50%, -50%);
`;

export const H1 = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.spacing[600]};
`;

export const StyledInput = styled(Input)`
  width: 100%;
`;

export const LoginButton = styled(PrimaryButton)`
  width: 100%;
`;

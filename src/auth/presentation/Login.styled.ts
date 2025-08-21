import styled from "styled-components";

export const LoginContainer = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing[500]};
  border-radius: ${({ theme }) => theme.spacing[500]};
  box-shadow: ${({ theme }) => theme.shadow[100]};
  width: ${({ theme }) => theme.spacing[1300]};
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

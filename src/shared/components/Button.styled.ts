import styled from "styled-components";

export const PrimaryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary2[700]};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary2[800]};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary2[900]};
  }
`;

export const SecondaryButton = styled.button`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.primary2[300]};
  color: ${({ theme }) => theme.colors.primary2[800]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary2[100]};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary2[200]};
  }
`;

const QuantityControlButton = styled.button`
  padding: ${({ theme }) => theme.spacing[100] + " " + theme.spacing[200]};
  width: ${({ theme }) => theme.spacing[500]};
  height: ${({ theme }) => theme.spacing[500]};
`;

export const IncrementButton = styled(QuantityControlButton)`
  background-color: ${({ theme }) => theme.colors.green[100]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.green[200]};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.green[300]};
  }
`;

export const DecrementButton = styled(QuantityControlButton)`
  background-color: ${({ theme }) => theme.colors.red[100]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.red[200]};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.red[300]};
  }
`;

export const WhatsAppButton = styled.button`
  background-color: ${({ theme }) => theme.colors.green[600]};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.green[700]};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.green[800]};
  }
`;

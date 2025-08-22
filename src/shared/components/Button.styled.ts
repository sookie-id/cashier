import styled from "styled-components";

export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing[300] + " " + theme.spacing[500]};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[100]};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow[100]};
  font-size: ${({ theme }) => theme.spacing[400]};

  &:active {
    box-shadow: ${({ theme }) => theme.shadow.inset};
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.primary2[700]};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.color.primary2[800]};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.primary2[900]};
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.color.primary2[300]};
  color: ${({ theme }) => theme.color.primary2[800]};

  &:hover {
    background-color: ${({ theme }) => theme.color.primary2[100]};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.primary2[200]};
  }
`;

const QuantityControlButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing[100] + " " + theme.spacing[200]};
  width: ${({ theme }) => theme.spacing[500]};
  height: ${({ theme }) => theme.spacing[500]};
`;

export const IncrementButton = styled(QuantityControlButton)`
  background-color: ${({ theme }) => theme.color.green[100]};

  &:hover {
    background-color: ${({ theme }) => theme.color.green[200]};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.green[300]};
  }
`;

export const DecrementButton = styled(QuantityControlButton)`
  background-color: ${({ theme }) => theme.color.red[100]};

  &:hover {
    background-color: ${({ theme }) => theme.color.red[200]};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.red[300]};
  }
`;

export const WhatsAppButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.green[600]};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.color.green[700]};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.green[800]};
  }
`;

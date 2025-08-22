import styled from "styled-components";
import { PrimaryButton } from "../../../shared/components/Button.styled";
import Input from "../../../shared/components/Input";

export const PageContainer = styled.div`
  max-width: ${({ theme }) => theme.spacing[1600]};
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.spacing[1600]}) {
    max-width: ${({ theme }) => theme.spacing[1300]};
  }
`;

export const SingleColumnMenuContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[500]};
  justify-content: center;
`;

export const DoubleColumnMenuContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[500]};
  justify-content: space-between;
`;

export const MenuTable = styled.table`
  max-width: ${({ theme }) => theme.spacing[1400]};

  th,
  td {
    padding: ${({ theme }) => theme.spacing[300] + " " + theme.spacing[200]};
  }

  th:first-child,
  td:first-child {
    text-align: left;
    padding-left: 0;
  }

  th:nth-child(2),
  td:nth-child(2) {
    text-align: center;
  }

  th:last-child,
  td:last-child {
    text-align: center;
    padding-right: 0;
  }
`;

export const QuantityControlContainer = styled.div`
  display: flex;
  justify-content: right;
`;

export const QuantitySpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 ${({ theme }) => theme.spacing[200]};
  min-width: ${({ theme }) => theme.spacing[500]};
`;

export const H1 = styled.h1`
  margin-top: 0;
  font-size: ${({ theme }) => theme.spacing[400]};
`;

export const StyledInput = styled(Input)`
  input,
  label {
    background: ${({ theme }) => theme.color.grey[100]};
  }
`;

export const InputContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing[500]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[600]};
  flex-direction: column;
`;

export const SubmitButton = styled(PrimaryButton)`
  margin-top: ${({ theme }) => theme.spacing[500]};
`;

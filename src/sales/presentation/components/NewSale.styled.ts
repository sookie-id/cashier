import styled from "styled-components";
import { PrimaryButton } from "../../../shared/components/Button.styled";
import Input from "../../../shared/components/Input";

export const PageContainer = styled.div`
  max-width: ${({ theme }) => theme.spacing[1700]};
  margin: 0 auto;
`;

export const SingleColumnMenuContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[500]};
  justify-content: center;
`;

export const DoubleColumnMenuContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[500]};
`;

export const MenuTable = styled.table`
  max-width: ${({ theme }) => theme.spacing[1400]};
  flex: 1;

  th,
  td {
    padding: ${({ theme }) => theme.spacing[300] + " " + theme.spacing[200]};
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  th:nth-child(2),
  td:nth-child(2) {
    text-align: center;
  }

  th:last-child,
  td:last-child {
    text-align: right;
    min-width: ${({ theme }) => theme.spacing[900]};
  }
`;

export const QuantitySpan = styled.span`
  margin: 0 ${({ theme }) => theme.spacing[200]};
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

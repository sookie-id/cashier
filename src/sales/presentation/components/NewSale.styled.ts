import styled from "styled-components";
import Input from "../../../shared/components/Input";

export const Container = styled.div``;

export const Table = styled.table`
  max-width: ${({ theme }) => theme.spacing[1400]};
  flex: 1;

  th,
  td {
    padding: ${({ theme }) => theme.spacing[300] + " " + theme.spacing[200]};
  }
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

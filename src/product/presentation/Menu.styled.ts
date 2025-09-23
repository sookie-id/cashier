import styled from "styled-components";
import { PrimaryButton } from "../../shared/components/Button.styled";

export const PageContainer = styled.div`
  max-width: ${({ theme }) => theme.spacing[1700]};
  margin: ${({theme}) => theme.spacing[500]} auto;
  background: white;
  padding: ${({ theme }) => theme.spacing[500] + ' ' + theme.spacing[800]};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.spacing[100]};

  @media (max-width: ${({ theme }) => theme.spacing[1600]}) {
    max-width: ${({ theme }) => theme.spacing[1300]};
  }
`;

export const H1 = styled.h1`
  font-size: ${({theme}) => theme.spacing[400]};
  margin: ${({theme}) => theme.spacing[300] + ' 0 ' + theme.spacing[400]};
`

const MenuContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[500]};
`;

export const ResponsiveMenuContainer = styled(MenuContainer)`
  flex-direction: column;

  @media (min-width: ${({theme}) => theme.spacing[1600]}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const MenuTable = styled.table`
  max-width: ${({ theme }) => theme.spacing[1400]};
  flex: 1;

  th,
  td {
    padding: ${({ theme }) => theme.spacing[300] + " " + theme.spacing[200]};
  }

  tr:first-child {
    td {
      padding-top: 0;
    }
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

export const InputContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing[500]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[600]};
  flex-direction: row;
`;

export const SubmitButton = styled(PrimaryButton)`
  margin-top: ${({ theme }) => theme.spacing[500]};
`;

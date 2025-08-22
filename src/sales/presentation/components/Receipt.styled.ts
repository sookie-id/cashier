import styled from "styled-components";

export const ReceiptContainer = styled.div`
  max-width: 250px;
  margin: 0 auto;
  padding: ${({ theme }) =>
    theme.spacing[600] + " " + theme.spacing[300] + " " + theme.spacing[400]};
  font-family: Robotto;
`;

export const HeaderContainer = styled.div`
  text-align: center;

  img {
    width: ${({ theme }) => theme.spacing[1100]};
  }

  p {
    margin: ${({ theme }) => theme.spacing[400] + " " + theme.spacing[200]};
  }
`;

export const DateTimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing[400] + " " + theme.spacing[200]};
`;

export const ReceiptTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: ${({ theme }) => theme.spacing[200] + " " + theme.spacing[200]};
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
  }

  td.total {
    font-weight: bold;
  }

  td.discount-amount {
    color: red;
  }
`;

export const FooterContainer = styled.div`
  line-height: 1.2;
  margin: ${({theme}) => theme.spacing[500]} 0;
  text-align: center;
  font-size: ${({theme}) => theme.spacing[400]};
`;

export const ReceiptActionContainer = styled.div`
  text-align: center;

  @media print {
    display: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[300]};
  justify-content: center;
`;

export const WhatsAppButtonContainer = styled.div`
  margin-top: ${({theme}) => theme.spacing[600]}
`

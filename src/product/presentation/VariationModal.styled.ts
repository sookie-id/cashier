import styled from "styled-components";

export const VariationModalContainer = styled.div`
  max-width: ${({ theme }) => theme.spacing[1700]};
  background: white;
  padding: ${({ theme }) => theme.spacing[500] + ' ' + theme.spacing[500]};
  border-radius: ${({ theme }) => theme.spacing[100]};
  box-shadow: ${({ theme }) => theme.shadow[200]};
`;
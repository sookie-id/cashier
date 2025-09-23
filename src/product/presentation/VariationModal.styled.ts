import styled from "styled-components";
import EditableText from "../../shared/components/EditableText";

export const VariationModalContainer = styled.div`
  max-width: ${({ theme }) => theme.spacing[1700]};
  background: white;
  padding: ${({ theme }) => theme.spacing[500] + ' ' + theme.spacing[500]};
  border-radius: ${({ theme }) => theme.spacing[100]};
  box-shadow: ${({ theme }) => theme.shadow[200]};
`;

export const H2 = styled.h2`
    font-size: ${({ theme }) => theme.spacing[400]};
    margin: ${({ theme }) => '0 0 ' + theme.spacing[300]};
`
export const VariationModalLink = styled.a`
    cursor: pointer;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.color.primary1[900]};
`

export const VariationChip = styled(EditableText)`
    display: inline-block;
    background: ${({ theme }) => theme.color.primary2[200]};
    border-radius: ${({ theme }) => theme.spacing[400]};
    padding: ${({ theme }) => theme.spacing[100] + ' ' + theme.spacing[300]};
    margin-right: ${({ theme }) => theme.spacing[200]};
    margin-bottom: ${({ theme }) => theme.spacing[200]};
    width: fit-content;
`;

export const AddVariationValueChip = styled.button`
    display: inline-block;
    font-size: inherit;
    border: none;
    background: ${({ theme }) => theme.color.primary1[100]};
    border-radius: ${({ theme }) => theme.spacing[400]};
    padding: ${({ theme }) => theme.spacing[100] + ' ' + theme.spacing[300]};
    margin-right: ${({ theme }) => theme.spacing[200]};
    margin-bottom: ${({ theme }) => theme.spacing[200]};
    width: fit-content;
`
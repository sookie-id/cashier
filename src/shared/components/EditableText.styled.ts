import styled from "styled-components";
import Input from "./Input";
import { StyledInput } from "./Input.styled";

export const EditableP = styled(Input)`
    ${StyledInput} {
        padding: 0;
        border: none;
        text-align: inherit;
        padding: 0;
        field-sizing: content;
        background: inherit;
    }
    width: initial;
`

export const P = styled.p`
    margin: 0;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.color.primary1[700]};
    }
`
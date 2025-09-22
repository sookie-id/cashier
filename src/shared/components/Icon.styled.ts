import styled from "styled-components"
import BaseIconCheveronDown from '../../assets/icon-cheveron-down.svg?react'
import BaseIconCheveronUp from '../../assets/icon-cheveron-up.svg?react'
import BaseIconHidden from '../../assets/icon-view-hidden.svg?react'
import BaseIconVisible from '../../assets/icon-view-visible.svg?react'

export const IconVisible = styled(BaseIconVisible)`
    .primary {
        fill: ${({theme}) => theme.color.grey[400]};
    }

    .secondary {
        fill: ${({theme}) => theme.color.grey[600]};
    }
`

export const IconHidden = styled(BaseIconHidden)`
    .primary {
        fill: ${({theme}) => theme.color.grey[400]};
    }

    .secondary {
        fill: ${({theme}) => theme.color.grey[400]};
    }
`

export const IconCheveronDown = styled(BaseIconCheveronDown)`
    cursor: pointer;
    .secondary {
        fill: ${({theme}) => theme.color.primary1[700]};
    }
`

export const IconCheveronUp = styled(BaseIconCheveronUp)`
    cursor: pointer;
    .secondary {
        fill: ${({theme}) => theme.color.primary1[700]};
    }
`
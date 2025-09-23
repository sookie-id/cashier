import styled from "styled-components"
import BaseIconAdd from '../../assets/icons/icon-add.svg?react'
import BaseIconCheveronDown from '../../assets/icons/icon-cheveron-down.svg?react'
import BaseIconCheveronUp from '../../assets/icons/icon-cheveron-up.svg?react'
import BaseIconHidden from '../../assets/icons/icon-view-hidden.svg?react'
import BaseIconVisible from '../../assets/icons/icon-view-visible.svg?react'

export const IconVisible = styled(BaseIconVisible)`
    cursor: pointer;

    .primary {
        fill: ${({theme}) => theme.color.grey[400]};
    }

    .secondary {
        fill: ${({theme}) => theme.color.grey[600]};
    }
`

export const IconHidden = styled(BaseIconHidden)`
    cursor: pointer;

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

export const IconAdd = styled(BaseIconAdd)`
    cursor: pointer;

    .secondary {
        fill: ${({theme}) => theme.color.primary1[700]};
    }
`
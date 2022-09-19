import styled, {css} from "styled-components";

const flexRow = css`
    ${({theme}) => css`
            ${theme.flex.rowCenter}
        `
    }
`

const flexColumn = css`
    ${({theme}) => css`
            ${theme.flex.columnCenter}
        `
    }
`

export const StyledNavbar = styled.div`
    ${flexRow}
    ${flexColumn}
    width: 100%;
    background: ${({theme}) => css`${theme.colors['blue']}`};
    padding: 0.5rem 1rem 0.5rem 0.3rem;
    justify-content: space-between;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
    height: 3.5rem;
`

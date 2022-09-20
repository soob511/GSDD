import styled, { css } from 'styled-components'

export const Item = styled.li`
    cursor: pointer;
    color: ${({ theme }) =>
    css`
      ${theme.colors['blue']}
    `};
`

export const List = styled.ul`
    
`

export const Nav = styled.div`
    display: flex;
    width: 200px;
    height: 100%;
    background-color: white;
    position: fixed;
    transition: 0.4s ease;
    z-index: 99;
`
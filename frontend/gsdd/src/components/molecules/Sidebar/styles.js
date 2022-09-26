import styled, { css } from 'styled-components'

export const Item = styled.li`
  cursor: pointer;
  padding: 24px 0 24px 40px;
  margin-bottom: 8px;
  
`

export const List = styled.ul`
    list-style: none;
    justify-content: center;
    padding: 0;
    ${(props) => props.bottom && css`
      margin-top: 260px
    `}
`

export const Nav = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 100%;
    position: fixed;
    background-color: white;
    transition: 0.4s ease;
    z-index: 99;
`
import styled, {css} from 'styled-components'
import Select from 'react-select'

export const Container = styled.div`
    margin: 20px 20px 20px 20px;
`
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
`
export const Content = styled.div`
    display: flex;
    background-color: white;
    justify-content: space-around;
    margin: 20px 0 40px;
    padding: 10px;
    border-radius: 10px;
    height: 160px;
    ${(props) => props.news && css`
        display: block;
        justify-content: flex-start;
        flex-direction: column;
        margin-top: 4px;
        overflow-y: scroll;
        height: 230px;
    `}
    ${(props) => props.info && css`
        display: inline;
        position: absolute;
        top: 110px;
        left: 40px;
        padding: 10px;
        width: 320px;
        height: 88px;
        margin-top: 8px;
        font-size: 13px;
        visibility: hidden;
    `}
    ${(props) => props.visible && css`
        visibility: visible;
    `}
    box-shadow: 1px 1px 1px 1px ${({theme}) => css`
        ${theme.colors['gray2']}
    `}
`

export const InfoText = styled.span`
    &:nth-child(2n+2) {
        color: ${({theme}) => css`
            ${theme.colors['red']}
        `};
        font-weight: bold;
    };
`

export const RowBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const ColumnBox = styled.div`    
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`
export const Item = styled.div`
    display: flex;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    ${(props) => props.number && css`
    font-size: 24px;
    margin-top: 30px;
    font-weight: normal;
    `}
    ${(props) => props.safety && css`
    font-size: 50px;
    color: #339933;
    font-weight: normal;
    `}
`

export const Article = styled.div`
    padding: 8px 4px 8px;
    margin: 0 8px 0;
    height: 25px;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    border-bottom: 1px solid ${({theme}) => css`
        ${theme.colors['gray3']}
    `}
    
`

export const Button = styled.button`
    border: none;
    background-color: transparent;
    display: flex;
    padding: 4px;
`

export const StyledSelect = styled(Select)`
    height: 40px;
    margin-right: 4px;
    ${(props) => props.city && css`
        width: 140px;
    `};
    ${(props) => props.district && css`
        width: 108px;
    `}
`
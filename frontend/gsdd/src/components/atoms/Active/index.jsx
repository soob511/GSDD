import React from 'react'
import * as S from './styles';

const Active = ({children, onClick}) => {
    // const sidebarToggle = onClick
    // if (onClick !== null)
    const props = { onClick } 
    return <S.Menu {...props}>{children}</S.Menu>
}

export default Active;
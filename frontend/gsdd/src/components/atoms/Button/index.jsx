import React from 'react';
import * as S from './styles';

const RoundButton = ({ children }) => {
    return (
        <>
            <S.RoundButton>{children}</S.RoundButton>
        </>
    );
}

const LoginBtn = ({ children, ...props }) => {
    return (
        <>
            <S.Login {...props}>
                {children}
            </S.Login>
        </>
    );
}

export default { RoundButton, LoginBtn };
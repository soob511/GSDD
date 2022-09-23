import React from 'react';
import * as S from './styles';

export const Button = ({ styleType, onClick, children, ...props }) => {

    switch (styleType) {
        case "round":
            return (
                <>
                    <S.RoundButton onClick={onClick}>{children}</S.RoundButton>
                </>
            );
        case "login":
            return (
                <>
                    <S.Login {...props}>
                        {children}
                    </S.Login>
                </>
            );
    }
}

export default Button;
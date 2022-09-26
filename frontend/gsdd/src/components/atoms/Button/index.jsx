import React from 'react';
import { ChangeBg, Login, X } from './styles';
const Button = ({ children }) => {
    return (
        <>
            <ChangeBg>{children}</ChangeBg>
        </>
    );
}

export const LoginBtn = ({ children, ...props }) => {
    return (
        <>
            <Login {...props}>
                {children}
            </Login>
        </>
    );
}

export const XBtn = ({...props}) => {
    return (
        <>
            <X {...props}>X</X>
        </>
    )
}

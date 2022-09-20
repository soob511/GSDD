import React from 'react';
import { ChangeBg, Login } from './styles';
const Button = ({ children }) => {
    return (
        <>
            <ChangeBg>{children}</ChangeBg>
        </>
    );
}

const LoginBtn = ({ children, ...props }) => {
    return (
        <>
            <Login {...props}>
                {children}
            </Login>
        </>
    );
}

export default LoginBtn;
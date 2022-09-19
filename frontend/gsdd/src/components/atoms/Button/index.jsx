import React from 'react';
import { ChangeBg, Login } from './Button.styled';
import kakao from '../../../assets/icons/kakao.png';
import naver from '../../../assets/icons/kakao.png';
import google from '../../../assets/icons/kakao.png';
const Button = ({children}) => {
    return(
        <>
        <ChangeBg>{children}</ChangeBg>
        </>
    );

}

const LoginBtn = ({children, ...props}) => {
    return(
        
        <>
        <Login {...props} icons={props}>
            {children}
        </Login>
        </>
    );
}

export default LoginBtn;
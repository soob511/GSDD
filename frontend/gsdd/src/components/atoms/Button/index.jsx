import React from 'react';
import { ChangeBg } from './Button.styled';

const Button = ({children}) => {
    return(
        <>
        <ChangeBg>{children}</ChangeBg>
        </>
    );

}



export default Button;
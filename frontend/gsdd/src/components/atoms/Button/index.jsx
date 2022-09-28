import React from 'react';
import * as S from './styles';

export const Button = ({ styleType, children, ...props }) => {
  switch (styleType) {
    case 'round':
      return (
        <>
          <S.RoundButton {...props}>{children}</S.RoundButton>
        </>
      );
    case 'login':
      return (
        <>
          <S.Login {...props}>{children}</S.Login>
        </>
      );
    case 'x':
      return (
        <>
          <S.X {...props}>X</S.X>
        </>
      );
    case 'modal':
      return <S.ModalBtn {...props}>{children}</S.ModalBtn>;
    default:
      return <></>;
  }
};

export default Button;

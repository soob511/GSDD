import React from 'react';
import Button from '../../atoms/Button';
import logo from '../../../assets/logo.png';
import * as S from './styles';
import kakao from '../../../assets/icons/kakao.png';
import naver from '../../../assets/icons/naver.jpg';
import google from '../../../assets/icons/google.png';

const Login = () => {
  // const flex_center = {
  //     "display": 'flex',
  //     "flexDirection": 'column',
  //     "justifyContent": 'center',
  //     "alignItems": 'center',
  //     "marginBottom": '1.5rem',
  // }
  // const font_bold = (size) => {
  //     "fontSize": size,
  //     "fontWeight": 'bold',
  // }
  return (
    <>
      <S.Login>
        <img src={logo} width="300px"></img>
        <S.Text>
          <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
            간편하게 로그인하고
            <br />
          </span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            다양한 서비스를 이용하세요
            <br />
          </span>
        </S.Text>
        <Button styleType="login" kakao href="http://j7b209.p.ssafy.io/oauth2/authorization/kakao">
          <S.BtnLogo src={kakao}></S.BtnLogo>
          <S.BtnText>카카오톡으로 시작하기</S.BtnText>
        </Button>
        <Button styleType="login" naver href="http://j7b209.p.ssafy.io/oauth2/authorization/naver">
          <S.BtnLogo src={naver}></S.BtnLogo>
          <S.BtnText>네이버로 시작하기</S.BtnText>
        </Button>
        <Button styleType="login" google href="http://j7b209.p.ssafy.io/oauth2/authorization/google">
          <S.BtnLogo src={google}></S.BtnLogo>
          <S.BtnText>구글로 시작하기</S.BtnText>
        </Button>
      </S.Login>
    </>
  );
};

export default Login;

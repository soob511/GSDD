import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../atoms/Button';
import logo from '../../../assets/logo.png';
import * as S from './styles';
import kakao from '../../../assets/icons/kakao.png';
import naver from '../../../assets/icons/naver.jpg';
import google from '../../../assets/icons/google.png';

const Login = () => {
  // const wait = async () => {
  //   const token = await localStorage.getItem('accessToken');
  //   const getToken = await (token != null);
  //   return getToken;
  // }
  // wait().then(() => window.location.reload());
  return (
    <>
      <S.Login>
        <img src={logo} width="300px"></img>
        <S.Text>
          <span style={{ fontSize: '1.3rem', fontWeight: 'bold', fontFamily: "SUIT-light"}}>
            간편하게 로그인하고
            <br />
          </span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' , fontFamily: "SUIT-light"}}>
            다양한 서비스를 이용하세요
            <br />
          </span>
        </S.Text>
        <Button styleType="login" kakao href="https://j7b209.p.ssafy.io:8080/api/oauth2/authorization/kakao">
          <S.BtnLogo src={kakao}></S.BtnLogo>
          <S.BtnText>카카오톡으로 시작하기</S.BtnText>
        </Button>
        <Button styleType="login" naver href="https://j7b209.p.ssafy.io:8080/api/oauth2/authorization/naver">
          <S.BtnLogo src={naver}></S.BtnLogo>
          <S.BtnText>네이버로 시작하기</S.BtnText>
        </Button>
        <Button styleType="login" google href="http://j7b209.p.ssafy.io:8080/api/oauth2/authorization/google">
          <S.BtnLogo src={google}></S.BtnLogo>
          <S.BtnText>구글로 시작하기</S.BtnText>
        </Button>
      </S.Login>
    </>
  );
};

export default Login;

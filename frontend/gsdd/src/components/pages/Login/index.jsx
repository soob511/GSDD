import React from 'react';
import LoginBtn from '../../atoms/Button';
import logo from '../../../assets/logo.png';


const Login = () => {
    const flex_center = {
        "display": 'flex',
        "flexDirection": 'column',
        "justifyContent": 'center',
        "alignItems": 'center',
        "marginBottom": '1.5rem',
    }
    // const font_bold = (size) => {
    //     "fontSize": size,
    //     "fontWeight": 'bold',
    // }
    return(
        <>
        <div style={flex_center}>
            <img src={logo}
            width='300px'></img>
            <div style={flex_center}>
                <span style={{ fontSize: '1.3rem', fontWeight: 'bold'}}>간편하게 로그인하고<br/></span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold'}}>다양한 서비스를 이용하세요<br/></span>
            </div>
            <LoginBtn kakao>카카오톡으로 시작하기</LoginBtn>
            <LoginBtn naver>네이버로 시작하기</LoginBtn>
            <LoginBtn google>구글로 시작하기</LoginBtn>
        </div>
        </>
    );
}

export default Login;
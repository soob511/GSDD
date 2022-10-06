import React, { useEffect, useRef, useState } from 'react';
import Link from '../../atoms/Link';
import * as S from './styles';
import Button from '../../atoms/Button';
import Navbar from '../Navbar';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { DELETE_TOKEN } from '../../../reducers/tokenReducer';
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(DELETE_TOKEN());
    window.location.reload();
  };
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(200);

  const [bool, setBool] = useState(true);

  const side = useRef();

  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideChildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideChildren)) {
      await setBool(!bool);
      await setX(200);
      await setOpen(false);
    }
  };

  useEffect(() => {
    if (!bool) {
      setX(0);
      setOpen(true);
    } else {
      setX(200);
      setOpen(false);
    }
  }, [bool]);

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  });

  return (
    <>
      <S.Nav ref={side} style={{ width: `200px`, transform: `translatex(${-xPosition}px)` }}>
        <S.Item button>
          <Button styleType="x" onClick={() => setBool(!bool)}></Button>
        </S.Item>
        <S.List>
          <S.Item>
            <S.Div onClick={() => navigate('/')}>홈</S.Div>
          </S.Item>
          <S.Item>
            <S.Div onClick={() => navigate('/mypage')}>마이페이지</S.Div>
          </S.Item>
          <S.Item>
            <S.Div onClick={() => navigate('/information')}>지역</S.Div>
          </S.Item>
        </S.List>
        <S.List bottom>
          <S.Item>
            <div style={{ cursor: `pointer`, textDecoration: `none`, fontSize: `20px`, color: `red`, fontFamily: "ONEMobilePOP" }} onClick={logout}>
              로그아웃
            </div>
          </S.Item>
        </S.List>
      </S.Nav>
      <Navbar bool={bool} setBool={setBool} />
    </>
  );
};

export default Sidebar;

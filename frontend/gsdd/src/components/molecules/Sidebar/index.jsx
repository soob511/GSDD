import React, { useEffect, useRef, useState } from 'react';
import Link from '../../atoms/Link';
import * as S from './styles';
import Button from '../../atoms/Button';
import Navbar from '../Navbar';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(DELETE_TOKEN());
    console.log('logout');
    navigate('/');
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
            <Link styleType="TextLink" href="/">
              홈
            </Link>
          </S.Item>
          <S.Item>
            <Link styleType="TextLink" href="/mypage">
              마이페이지
            </Link>
          </S.Item>
          <S.Item>
            <Link styleType="TextLink" href="/information">
              지역
            </Link>
          </S.Item>
        </S.List>
        <S.List bottom>
          <S.Item>
            <Link styleType="TextLink" href="/logout">
              로그아웃
            </Link>
          </S.Item>
        </S.List>
      </S.Nav>
      <Navbar bool={bool} setBool={setBool} />
    </>
  );
};

export default Sidebar;

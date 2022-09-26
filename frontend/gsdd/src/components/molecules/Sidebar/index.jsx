import React, {forwardRef, useEffect,  useImperativeHandle,  useRef, useState} from 'react';
import Link from '../../atoms/Link';
import * as S from './styles';
import { XBtn } from '../../atoms/Button'
import Navbar from '../Navbar'


const Sidebar = forwardRef((props, ref) => {
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(200);
    const side = useRef();
    console.log(side)
    const toggleMenu = () => {
        if (xPosition > 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(200);
            setOpen(false);
        }
    }
    useImperativeHandle(ref, () => ({
        toggleMenu
    }))
    const handleClose = async e => {
        let sideArea = side.current;
        let sideChildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideChildren)) {
            await setX(200);
            await setOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClose);
        return () => {
            window.removeEventListener('click', handleClose);
        }
    })
    // window.onload = () => {
    //     document.getElementById("menu").addEventListener('click', toggleMenu)
    // }
    return (
        <>
            <S.Nav ref={side} style={{ width: `200px`, transform: `translatex(${-xPosition}px)`}}>
                <button onClick={() => ref.current.toggleMenu()}>버튼</button>
                
                <S.List>
                    <S.Item><Link styleType="TextLink" href="/">홈</Link></S.Item>
                    <S.Item><Link styleType="TextLink" href="/mypage">마이페이지</Link></S.Item>
                    <S.Item><Link styleType="TextLink" href="/information">지역</Link></S.Item>
                </S.List>
                <S.List bottom>
                    <S.Item><Link styleType="TextLink" href="/logout">로그아웃</Link></S.Item>
                </S.List>
            </S.Nav>
        </>
    )
});

export default Sidebar;
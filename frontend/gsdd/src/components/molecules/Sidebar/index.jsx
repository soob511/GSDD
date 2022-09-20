import React, {useEffect, useRef, useState} from 'react';
import Link from '../../atoms/Link';
import * as S from './styles';



const Sidebar = ({width=200}) => {
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(width);
    const side = useRef();

    const toggleMenu = () => {
        if (xPosition > 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(width);
            setOpen(false);
        }
    }

    const handleClose = async e => {
        let sideArea = side.current;
        let sideChildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideChildren)) {
            await setX(width);
            await setOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClose);
        return () => {
            window.removeEventListener('click', handleClose);
        }
    })


    return (
        <>
            <S.Nav ref={side} style={{ width: `${width}px`, transform: `translatex(${-xPosition}px)`}}>
                <button onClick={() => toggleMenu()}>버튼</button>
                <S.List>
                    <S.Item><Link styleType="NextLink" href="/">홈</Link></S.Item>
                    <S.Item><Link styleType="NextLink" href="/mypage">마이페이지</Link></S.Item>
                    <S.Item><Link styleType="NextLink" href="/information">안전지수</Link></S.Item>
                </S.List>
                <S.List>
                    <S.Item><Link styleType="NextLink" href="/logout">로그아웃</Link></S.Item>
                </S.List>
            </S.Nav>
        </>
    )
}

export default Sidebar;
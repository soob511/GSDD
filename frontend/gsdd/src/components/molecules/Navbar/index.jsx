import React from 'react';
import styled, {css} from "styled-components";
import Image from '../../atoms/Image';
import move from "../../../common/move";
import theme from "../../../common/theme";
import logo_txt from "../../../assets/logo_txt.png"


const flexRow = css`
    ${({theme}) => css`
            ${theme.flex.rowCenter}
        `
    }
`
const StyledNavbar = styled.div`
    // ${flexRow}
    width: 100%;
    background: ${({theme}) => css`${theme.colors['black']}`};
    padding: 0.5rem 1rem 0.5rem 0.3rem;
    justify-content: space-between;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
    height: 3.5rem;
`

// const Buttons = styled.div`
//     ${flexRow}
//     justify-content: space-between;
//     gap: 1rem;
// `
const Navbar = ({navigate, isLogin, setIsLogin, imgSize, fontSize, mode, fontWeight, ...rest}) => {
    // const moveToMypage = () => {
    //     move(navigate, '/mypage');
    // }

    const moveToHome = () => {
        // move(navigate, '/');
        console.log("ji");
    }
    return <StyledNavbar {...imgSize}>
        <Image src={logo_txt} alt='logo_txt.png' size={imgSize} onClick={moveToHome} style={{cursor: 'pointer'}}/>
    </StyledNavbar>
}

Navbar.defaultProps = {
    imgSize: "xs",
    // fontSize: "md",
    // mode: "blacktext",
    // fontWeight: "regular"
}

export default Navbar;
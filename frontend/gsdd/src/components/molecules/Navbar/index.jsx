import React from 'react';
import * as S from './styles';
import Image from '../../atoms/Image';
import logo_txt from '../../../assets/logo_txt.png';
import Link from '../../atoms/Link';

const Navbar = () => {
  return (
    <>
      <S.StyledNavbar>
        <Link styleType="NextLink" href="/mypage">
          <Image src={logo_txt} width="100" height="50" />
        </Link>
      </S.StyledNavbar>
    </>
  );
};

export default Navbar;

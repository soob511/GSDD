import React from 'react';
import * as S from './styles';
import Image from '../../atoms/Image';
import logo_txt from '../../../assets/logo_txt.png';
import Link from '../../atoms/Link';
import { IoIosMenu } from 'react-icons/io';
import { RiAlarmWarningFill } from 'react-icons/ri';

const Navbar = () => {
  return (
    <>
      <S.StyledNavbar>
        <IoIosMenu size="40" color="#FFFFFF" />
        <Link styleType="NextLink" href="/mypage">
          <Image src={logo_txt} width="100" height="50" />
        </Link>
        <RiAlarmWarningFill size="40" color="red" />
      </S.StyledNavbar>
    </>
  );
};

export default Navbar;

import React from 'react';
import * as S from './styles';
import Image from '../../atoms/Image';
import logo_txt from '../../../assets/logo_txt.png';
import Link from '../../atoms/Link';
import { IoIosMenu } from 'react-icons/io';
import { RiAlarmWarningFill } from 'react-icons/ri';
import Sidebar from '../Sidebar/index.jsx';
import Active from '../../atoms/Active';

const Navbar = () => {
  return (
    <>
      <S.StyledNavbar>
        <Active onClick={() => Sidebar.toggleMenu()}>
        <IoIosMenu size="40" color="#FFFFFF" />
        </Active>
        <Link styleType="NextLink" href="/mypage">
          <Image src={logo_txt} width="100" height="50" />
        </Link>
        <RiAlarmWarningFill size="40" color="red" />
      </S.StyledNavbar>
      <div
        style={{
          height: '4rem',
        }}
      ></div>
    </>
  );
};

export default Navbar;

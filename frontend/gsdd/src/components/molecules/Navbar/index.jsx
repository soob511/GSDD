import React, { useRef, useState, useEffect } from 'react';
import * as S from './styles';
import Image from '../../atoms/Image';
import logo_txt from '../../../assets/logo_txt.png';
import { IoIosMenu } from 'react-icons/io';
import { RiAlarmWarningFill } from 'react-icons/ri';
import Sidebar from '../Sidebar/index.jsx';
import Active from '../../atoms/Active';
import SirenModal from '../SirenModal';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const navigate = useNavigate();
  const [siren, setSiren] = useState(false);
  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <S.StyledNavbar>
        <Active
          onClick={() => {
            props.setBool(!props.bool);
          }}
        >
          <IoIosMenu size="40" color="#FFFFFF" />
        </Active>
        <div onClick={handleClick}>
          <Image src={logo_txt} width="100" height="50" />
        </div>
        <SirenModal siren={siren}/>
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

import React, { useRef, useState, useEffect } from 'react';
import * as S from './styles';
import Image from '../../atoms/Image';
import logo_txt from '../../../assets/logo_txt.png';
import Link from '../../atoms/Link';
import { IoIosMenu } from 'react-icons/io';
import { RiAlarmWarningFill } from 'react-icons/ri';
import Sidebar from '../Sidebar/index.jsx';
import Active from '../../atoms/Active';
import SirenModal from '../SirenModal';
const Navbar = (props) => {
  const [ siren, setSiren ] = useState(false);


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
        <Link styleType="NextLink" href="/">
          <Image src={logo_txt} width="100" height="50" />
        </Link>
        {/* <Active onClick={() => {setSiren(!siren);}}>
          <RiAlarmWarningFill size="40" color="red" />
          {siren ? <SirenModal siren={siren} setSiren={setSiren}/> : <></>}
        </Active> */}
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

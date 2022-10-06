import React, { useRef, useState } from 'react';
import * as S from './styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, TextField } from '@mui/material';
import { RiAlarmWarningFill } from 'react-icons/ri';
import { useEffect } from 'react';
import Active from '../../atoms/Active';
import mp3 from '../../../assets/audio/siren.mp3';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import apiPath from '../../../api/apiPath';
import { authAxios } from '../../../api/common';
import { SET_POSITION } from '../../../reducers/userReducer';

const SirenModal = (props) => {

  const dispatch = useDispatch();
  const username = useSelector((state) => state.userReducer.user);
  const userContacts = useSelector((state) => state.userReducer.contacts);
  const currentLat = useSelector((state) => state.tmapReducer.latitude);
  const currentLng = useSelector((state) => state.tmapReducer.longitude);
  const position = useSelector((state) => state.userReducer.position);

  const [count, setCount] = useState(5);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    stop();
    setOpen(true);
    play();
  };
  const handleClose = () => {
    setOpen(false);
    setCount(5);
    stop();
  };

  const audioRef = useRef(new Audio(mp3));

  const play = () => {
    audioRef.current.play();
  };
  const stop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };


  const getPositionName = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', appKey: 'l7xx49e27051d70e475a8285bb568e35a081' },
    };
    await fetch(
      `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${currentLat}&lon=${currentLng}&coordType=WGS84GEO&addressType=A02&newAddressExtend=Y`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        dispatch(SET_POSITION(response.addressInfo.fullAddress));
      })
      .catch((err) => console.error(err));
  };

  const sendMessage = async () => {
    await authAxios
      .post(apiPath.message.post(), {
        name: username,
        contact: userContacts[0].contact,
        location: position,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (open) {
      getPositionName();
      let timer = setInterval(() => {
        setCount(count - 1);
      }, 1000);
      if (count === 0) {
        if (userContacts.length === 0) alert('비상연락망 1개 이상 등록은 필수 입니다! \n 마이페이지에서 등록하실 수 있습니다 :)');
        else {
          // Message API
          sendMessage();
        }
      }
      return () => clearInterval(timer);
    }
  });
  return (
    <>

      <Active onClick={handleOpen}>
        <RiAlarmWarningFill size="40" color="red" />
      </Active>
      <Modal open={open} onClose={handleClose} onClick={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={S.Box}>
          <S.Container>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <RiAlarmWarningFill size="200" color="red" />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {count > 0 ? <S.Span>{count}초 후에 메시지가 발송됩니다.</S.Span>
               : <S.Span>문자 메시지가 전송되었습니다.</S.Span>}
            </Typography>
          </S.Container>
        </Box>
      </Modal>
    </>
  );
};

export default SirenModal;

import React, { useState } from 'react';
import * as S from './styles';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import apiPath from '../../../api/apiPath';
import { authAxios } from '../../../api/common';

const ContactModal = () => {
  const userId = useSelector((state) => state.userReducer.userId);

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: '',
    phoneNumber: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
    });
  };

  const handleSetContact = async () => {
    console.log(info.name);
    console.log(info.phoneNumber);
    try {
      await authAxios
        .post(apiPath.mypage.post(), {
          userId: userId,
          name: info.name,
          number: info.phoneNumber,
        })
        .then((res) => {
          console.log(res);
          window.location.href = '/mypage';
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
    handleClose();
  };

  return (
    <>
      <S.PlusBtn onClick={handleOpen}>+</S.PlusBtn>
      <Modal open={open} onClose={handleClose}>
        <Box sx={S.style}>
          <S.TextWrapper>
            <TextField id="filled-basic" name="name" label="이름" maxLength="3" onChange={handleChange} />
            <div
              style={{
                height: '10px',
              }}
            ></div>
            <TextField id="filled-basic" name="phoneNumber" label="전화번호" onChange={handleChange} />
          </S.TextWrapper>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            <S.ButtonWrapper>
              <Button variant="contained" color="primary" onClick={handleSetContact}>
                추가
              </Button>
              <Button variant="contained" color="primary" onClick={handleClose}>
                취소
              </Button>
            </S.ButtonWrapper>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ContactModal;

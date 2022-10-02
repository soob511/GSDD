import React, { useEffect, useState } from 'react';
import * as S from './styles';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, TextField } from '@mui/material';
// import { Button as Btn } from '../../atoms/Button';
import { useSelector, useDispatch } from 'react-redux';

const ContactModal = () => {
  const [open, setOpen] = useState(false);

  const [info, setInfo] = useState({
    name: '',
    phoneNumber: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
    });
  };

  const test = () => {
    console.log(info.name);
    console.log(info.phoneNumber);
  };
  return (
    <>
      <S.PlusBtn onClick={handleOpen}>+</S.PlusBtn>
      <Modal open={open} onClose={handleClose}>
        <Box sx={S.style}>
          <S.TextWrapper>
            {/* <S.Input placeholder="이름" name="name" onChange={handleChange} /> */}
            {/* <S.Input placeholder="전화번호" name="phoneNumber" onChange={handleChange} /> */}
            <TextField id="filled-basic" name="name" label="이름" onChange={handleChange} />
            <div
              style={{
                height: '10px',
              }}
            ></div>
            <TextField id="filled-basic" name="phoneNumber" label="전화번호" onChange={handleChange} />
          </S.TextWrapper>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            <S.ButtonWrapper>
              <Button variant="contained" color="primary" onClick={test}>
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

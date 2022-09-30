import React, { useState } from 'react';
import * as S from './styles';
import Button from '@mui/material/Button';
import { Modal as MuiModal } from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button as Btn } from '../../atoms/Button';

const Modal = ({ styleType, type }) => {
  /// mui ///
  const [open, setOpen] = useState(false);
  //   const handleOpen = (modalType) => {
  //     if (modalType === '비상연락망') {
  //       // do something
  //     } else {
  //       // do something
  //     }
  //     setOpen(true);
  //     console.log(type);
  //   };

  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '3%',
    boxShadow: 24,
    p: 6,
  };
  ///mui ///

  if (styleType === 'Contact') {
    return (
      <>
        <MuiModal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <input type="text" />
              <input type="text" />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Btn styleType="modal">추가</Btn>
              <Btn styleType="modal" onClick={handleClose}>
                취소
              </Btn>
            </Typography>
          </Box>
        </MuiModal>
      </>
    );
  } else if (styleType === 'Route') {
    return <>route</>;
  } else return <></>;
};

export default Modal;

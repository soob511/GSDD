import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { AiFillMinusCircle } from 'react-icons/ai';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button as Btn } from '../../atoms/Button';
import API from '../../../common/api';

const MyPageListCard = ({ type }) => {
  const [userData, setUserData] = useState(null);
  /// mui ///
  const [open, setOpen] = useState(false);
  const handleOpen = (modalType) => {
    if (modalType === '비상연락망') {
      // do something
    } else {
      // do something
    }
    setOpen(true);
    console.log(type);
  };

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

  useEffect(() => {
    try {
      const getUserData = async (userId) => {
        await API.get(`mypage/${userId}`).then((response) => {
          setUserData(response.data);
        });
      };
      getUserData(1);
    } catch (e) {
      console.log(e);
    }
    // Redux 에서 userId 받아와서 넣을 예정
  }, []);

  // useEffect(() => {
  //   console.log(userData);
  // }, []);

  const handleOpenModal = (modalType) => {
    if (modalType === '비상연락망') {
      console.log('비상연락망 모달');
    } else {
      console.log('즐겨찾는 목적지 모달');
    }
  };

  const deleteClick = () => {
    console.log('clicked');
  };

  const tags = (data, margin) => {
    if (type === '비상연락망') {
      return (
        <S.TitleWrapper key={data.id} margin={margin}>
          <span>{data.name}</span>
          <span>{data.contact}</span>
          <div onClick={deleteClick}>
            <AiFillMinusCircle color="red" />
          </div>
        </S.TitleWrapper>
      );
    } else if (type !== '비상연락망') {
      return (
        <S.TitleWrapper key={data.id} margin={margin}>
          <span>{data.name}</span>
          <S.AddressWrapper>{data.address}</S.AddressWrapper>
          <div onClick={deleteClick}>
            <AiFillMinusCircle color="red" />
          </div>
        </S.TitleWrapper>
      );
    }
  };

  return (
    <>
      <S.Container>
        <S.Label>{type}</S.Label>
        <S.ListCard>
          <S.MainWrapper>
            <S.SpanWrapper>
              <span>{type === '비상연락망' ? '이름' : '목적지'}</span>
              <span>{type === '비상연락망' ? '전화번호' : '주소'}</span>
            </S.SpanWrapper>
          </S.MainWrapper>
          <S.Line />
          {userData !== null ? (
            type === '비상연락망' ? (
              userData.contacts.map((n) => (n.id === userData.contacts.length ? tags(n, '15px') : tags(n, 0)))
            ) : (
              userData.routes.map((d) => (d.id === userData.routes.length ? tags(d, '15px') : tags(d, 0)))
            )
          ) : (
            <S.Error>내용이 없습니다.</S.Error>
          )}

          <S.PlusBtn onClick={() => handleOpen(type)}>+</S.PlusBtn>
        </S.ListCard>
      </S.Container>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
      </Modal>
    </>
  );
};

export default MyPageListCard;

import React, { useState } from 'react';
import * as S from './styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, TextField, Autocomplete } from '@mui/material';
import Typography from '@mui/material/Typography';
import getPlaces from '../MapContainer/getPlaces';
import apiPath from '../../../api/apiPath';
import { authAxios } from '../../../api/common';
import { useSelector } from 'react-redux';

const RouteModal = () => {
  const [places, setPlaces] = useState([]);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState('');
  const [input, setInput] = useState({
    name: '',
    lat: '',
    lon: '',
  });

  const userId = useSelector((state) => state.userReducer.userId);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddButtonClick = async () => {
    try {
      await authAxios
        .post(apiPath.mypage.routePost(), {
          userId: userId,
          name: info.nickname,
          address: input.name,
          lat: input.lat.toString(),
          lon: input.lon.toString(),
        })
        .then((res) => {
          console.log(res);
          window.location.href = '/mypage';
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const defaultDProps = {
    options: places,
    getOptionLabel: (option) => option.name,
  };

  const handleOnChange = (_event, newInput) => {
    console.log('newInput', newInput);
    setInput({
      name: newInput.name,
      lat: newInput.lat,
      lon: newInput.lng,
    });
  };

  return (
    <>
      <S.PlusBtn onClick={handleOpen}>+</S.PlusBtn>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={S.style}>
          <TextField id="standard-basic" name="nickname" label="목적지 별칭" onChange={handleChange} variant="standard" />
          <Typography id="modal-modal-title">
            <Autocomplete
              id="clear-on-escape"
              {...defaultDProps}
              options={places ? places : []}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="목적지" variant="standard" />}
              //선택한 목적지 받아오는 애
              onChange={handleOnChange}
              //places 채우는애
              onInputChange={async (_event, newInput2) => {
                console.log('newInput2' + newInput2);
                setPlaces(await getPlaces(newInput2));
              }}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            <S.ButtonWrapper>
              <Button variant="contained" color="primary" onClick={handleAddButtonClick}>
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

export default RouteModal;

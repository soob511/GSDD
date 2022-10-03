import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TMAPV2, SET_MAP, SET_MARKER, SET_LATITUDE, SET_LONGITUDE, SET_LOCATION, SET_MARKERS, SET_OPLACES, SET_DPLACES, SET_ORIGIN, SET_DESTINATION, SET_OMARKER, SET_DMARKER, SET_LINES } from '../../../reducers/tmapReducer';
import * as S from './styles';
import Map from '../../atoms/Map';
import { Button as Btn } from '../../atoms/Button';
import mapInfo from './mapInfo';
import getMarkers from './getMarkers';
import getPlaces from './getPlaces';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, TextField, Autocomplete } from '@mui/material';
import Typography from '@mui/material/Typography';
import getShortestPath from './getShortestPath';

const MapContainer = () => {

  const dispatch = useDispatch();

  const Tmapv2 = useSelector(state => state.tmapReducer.Tmapv2);
  const map = useSelector(state => state.tmapReducer.map);
  const marker = useSelector(state => state.tmapReducer.marker);
  const location = useSelector(state => state.tmapReducer.location);
  const latitude = useSelector(state => state.tmapReducer.latitude);
  const longitude = useSelector(state => state.tmapReducer.longitude);
  const markers = useSelector(state => state.tmapReducer.markers);
  const oplaces = useSelector(state => state.tmapReducer.oplaces);
  const dplaces = useSelector(state => state.tmapReducer.dplaces);
  const origin = useSelector(state => state.tmapReducer.origin);
  const destination = useSelector(state => state.tmapReducer.destination);
  const omarker = useSelector(state => state.tmapReducer.omarker);
  const dmarker = useSelector(state => state.tmapReducer.dmarker);
  const lines = useSelector(state => state.tmapReducer.lines);

  const [mode, setMode] = useState(false);

  const [btnActive, setBtnActive] = useState({
    lights: false,
    cameras: false,
    houses: false,
  });

  const [open, setOpen] = useState(false);

  /// mui ///

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNext = async () => {
    console.log("출발지", origin);
    dispatch(SET_ORIGIN(origin));
    console.log("목적지", destination);
    dispatch(SET_DESTINATION(destination));

    //새로운 경로 이전 기존 경로 제거
    // if (omarker) {
    //   console.log("set omarker null");
    //   omarker.setMap(null);
    //   dispatch(SET_OMARKER(null));
    // }
    // if (dmarker) {
    //   console.log("set dmarker null");
    //   dmarker.setMap(null);
    //   dispatch(SET_DMARKER(null));
    // }
    // if (lines) {
    //   console.log("set lines null");
    //   for (let k in lines) {
    //     lines[k].setMap(null);
    //   }
    //   dispatch(SET_LINES(null));
    // }

    setOpen(false);

    const data = await getShortestPath(map, origin, destination);//최단 경로 탐색
    // data.omarker.setMap(map);
    // data.dmarker.setMap(map);
    // for (let k in data.lines) {
    //   console.log(data.lines[k]);
    //   data.lines[k].setMap(map);
    // }
    dispatch(SET_OMARKER(data.omarker));
    dispatch(SET_DMARKER(data.dmarker));
    dispatch(SET_LINES(data.lines));

    console.log("최단 경로 결과");
    console.log(omarker, dmarker, lines);

  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '5%',
    boxShadow: 24,
    p: 6,
  };
  ///mui ///

  const getMapInfo = async () => {
    const { Tmapv2, map, latitude, longitude, location, marker } = await mapInfo();
    dispatch(SET_TMAPV2(Tmapv2));
    dispatch(SET_MAP(map));
    dispatch(SET_LATITUDE(latitude));
    dispatch(SET_LONGITUDE(longitude));
    dispatch(SET_LOCATION(location));
    dispatch(SET_MARKER(marker));
    console.log("location:", location);
    map.setCenter(location);
  };

  const getMode = async () => {
    setMode(!mode);
    dispatch(SET_MARKERS(await getMarkers(map, latitude, longitude)));
  };

  function markerVisible(type) {
    for (const val of type) {
      val.setMap(map);
    }
  }

  function markerInvisible(type) {
    for (const val of type) {
      val.setMap(null);
    }
  }

  const getLights = () => {
    setBtnActive((prevState) => {
      return { ...prevState, lights: !prevState.lights };
    });
    console.log('가로등', markers.lights);
    if (btnActive.lights) {
      console.log('가로등 끈다');
      markerInvisible(markers.lights);
    } else {
      console.log('가로등 켠다');
      markerVisible(markers.lights);
    }
  };

  const getCameras = () => {
    setBtnActive((prevState) => {
      return { ...prevState, cameras: !prevState.cameras };
    });
    console.log('시시티비', markers.cameras);
    if (btnActive.cameras) {
      console.log('시시티비 끈다');
      markerInvisible(markers.cameras);
    } else {
      console.log('시시티비 켠다');
      markerVisible(markers.cameras);
    }
  };

  const getHouses = () => {
    setBtnActive((prevState) => {
      return { ...prevState, houses: !prevState.houses };
    });
    console.log('안심집', markers.houses);
    if (btnActive.houses) {
      console.log('안심집 끈다');
      markerInvisible(markers.houses);
    } else {
      console.log('안심집 켠다');
      markerVisible(markers.houses);
    }
  };

  useEffect(() => {
    getMapInfo();
  }, []);

  const defaultOProps = {
    options: oplaces,
    getOptionLabel: (option) => option.name,
  };
  const defaultDProps = {
    options: dplaces,
    getOptionLabel: (option) => option.name,
  };

  // const flatProps = {
  //   options: places.map((option) => option.name),
  // };

  return (
    <>
      <S.StyledMapContainer>
        <Map map={map} />
        <S.StyledButtonHorizontalContainer className={mode ? 'show-mode' : 'hide-mode'}>
          <Btn styleType="round" onClick={getLights} active={btnActive.lights}>
            가로등
          </Btn>
          <Btn styleType="round" onClick={getCameras} active={btnActive.cameras}>
            CCTV
          </Btn>
          <Btn styleType="round" onClick={getHouses} active={btnActive.houses}>
            안전집
          </Btn>
        </S.StyledButtonHorizontalContainer>
        <S.StyledButtonVerticalContainer>
          <Btn styleType="round" onClick={getMapInfo}>
            현위치
          </Btn>
          <Btn styleType="round" onClick={handleOpen}>
            길찾기
          </Btn>
          <Btn styleType="round" onClick={getMode}>
            모드
          </Btn>
        </S.StyledButtonVerticalContainer>
      </S.StyledMapContainer>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title">
            <Autocomplete id="clear-on-escape" {...defaultOProps}
              options={oplaces ? oplaces : []}
              getOptionLabel={option => option.name}
              renderInput={(params) => (
                <TextField {...params} label="출발지" variant="standard" />
              )}
              onChange={(_event, newOrigin) => {
                console.log("newOrigin", newOrigin);
                dispatch(SET_ORIGIN(newOrigin));
              }}
              onInputChange={async (_event, newInput) => {
                dispatch(SET_OPLACES(await getPlaces(newInput)));
              }}
            />
            <Autocomplete id="clear-on-escape" {...defaultDProps}
              options={dplaces ? dplaces : []}
              getOptionLabel={option => option.name}
              renderInput={(params) => (
                <TextField {...params} label="목적지" variant="standard" />
              )}
              onChange={(_event, newDestination) => {
                console.log("newDestination", newDestination);
                dispatch(SET_DESTINATION(newDestination));
              }}
              onInputChange={async (_event, newInput2) => {
                dispatch(SET_DPLACES(await getPlaces(newInput2)));
              }}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            <S.ButtonWrapper>
              <Button variant="contained" color="primary" onClick={handleNext}>
                검색
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

export default MapContainer;
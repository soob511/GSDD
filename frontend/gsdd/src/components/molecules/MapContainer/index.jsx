import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TMAPV2, SET_MAP, SET_MARKER, SET_LATITUDE, SET_LONGITUDE, SET_LOCATION, SET_MARKERS, SET_PLACES, SET_ORIGIN, SET_DESTINATION } from '../../../reducers/tmapReducer';
import * as S from './styles';
import Map from '../../atoms/Map';
import Button from '../../atoms/Button';
import mapInfo from './mapInfo';
import getMarkers from './getMarkers';
import getPlaces from './getPlaces';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField, Autocomplete } from '@mui/material';
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
  const places = useSelector(state => state.tmapReducer.places);
  const origin = useSelector(state => state.tmapReducer.origin);
  const destination = useSelector(state => state.tmapReducer.destination);

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

    setOpen(false);

    const data = await getShortestPath(map, origin, destination);//최단 경로 탐색

    data.omarker.setVisible(true);
    data.dmarker.setVisible(true);
    for (let k in data.lines) {
      data.lines[k].setVisible(true);
    }

    console.log(data);

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
    console.log(latitude);
    console.log(longitude);
    dispatch(SET_TMAPV2(Tmapv2));
    dispatch(SET_MAP(map));
    dispatch(SET_LATITUDE(latitude));
    dispatch(SET_LONGITUDE(longitude));
    dispatch(SET_LOCATION(location));
    dispatch(SET_MARKER(marker));
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

  const defaultProps = {
    options: places,
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
          <Button styleType="round" onClick={getLights} active={btnActive.lights}>
            가로등
          </Button>
          <Button styleType="round" onClick={getCameras} active={btnActive.cameras}>
            CCTV
          </Button>
          <Button styleType="round" onClick={getHouses} active={btnActive.houses}>
            안전집
          </Button>
        </S.StyledButtonHorizontalContainer>
        <S.StyledButtonVerticalContainer>
          <Button styleType="round" onClick={getMapInfo}>
            현위치
          </Button>
          <Button styleType="round" onClick={handleOpen}>
            길찾기
          </Button>
          <Button styleType="round" onClick={getMode}>
            모드
          </Button>
        </S.StyledButtonVerticalContainer>
      </S.StyledMapContainer>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title">
            <Autocomplete id="clear-on-escape" {...defaultProps}
              options={places ? places : []}
              getOptionLabel={option => option.name}
              renderInput={(params) => (
                <TextField {...params} label="출발지" variant="standard" />
              )}
              onChange={(_event, newOrigin) => {
                console.log("newOrigin", newOrigin);
                dispatch(SET_ORIGIN(newOrigin));
              }}
              onInputChange={async (_event, newInput) => {
                dispatch(SET_PLACES(await getPlaces(newInput)));

              }}
            />
            <Autocomplete id="clear-on-escape" {...defaultProps}
              options={places ? places : []}
              getOptionLabel={option => option.name}
              renderInput={(params) => (
                <TextField {...params} label="목적지" variant="standard" />
              )}
              onChange={(_event, newDestination) => {
                console.log("newDestination", newDestination);
                dispatch(SET_DESTINATION(newDestination));
              }}
              onInputChange={async (_event, newInput) => {
                dispatch(SET_PLACES(await getPlaces(newInput)));
              }}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <Button styleType="modal" onClick={handleNext}>검색</Button>
            <Button styleType="modal" onClick={handleClose}>취소</Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default MapContainer;
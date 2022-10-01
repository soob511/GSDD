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
import { Input, TextField, Autocomplete } from '@mui/material';
import Typography from '@mui/material/Typography';

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
    dispatch(SET_MARKERS(await getMarkers(Tmapv2, map, latitude, longitude)));
  };

  function markerVisible(type) {
    for (const val of type) {
      val.setVisible(true);
    }
  }

  function markerInvisible(type) {
    for (const val of type) {
      val.setVisible(false);
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
            <Button styleType="modal" onClick={() => { console.log("출발지", origin); console.log("목적지", destination); }}>검색</Button>
            <Button styleType="modal" onClick={handleClose}>취소</Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964, },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];

export default MapContainer;
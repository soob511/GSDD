// import React, { useState } from 'react';
// import * as S from './styles';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import { Typography, TextField } from '@mui/material';
// import { RiAlarmWarningFill } from 'react-icons/ri';
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux/es/exports';
// import apiPath from '../../../api/apiPath';
// import { authAxios } from '../../../api/common';
// import { SET_POSITION } from '../../../reducers/userReducer';

// const SirenModal2 = (props) => {
//   // console.log(props.siren)
//   // console.log(props)
//   const [count, setCount] = useState(5);
//   const audio = new Audio('../../../assets/audio/siren.mp3');

//   const dispatch = useDispatch();
//   const username = useSelector((state) => state.userReducer.user);
//   const userContacts = useSelector((state) => state.userReducer.contacts);
//   const currentLat = useSelector((state) => state.tmapReducer.latitude);
//   const currentLng = useSelector((state) => state.tmapReducer.longitude);
//   const position = useSelector((state) => state.userReducer.position);

//   const play = () => {
//     audio.play();
//   };
//   const stop = () => {
//     audio.stop();
//   };

//   const getPositionName = async () => {
//     const options = {
//       method: 'GET',
//       headers: { accept: 'application/json', appKey: 'l7xxa68d7a9afe2c4fdc80fbe37befe86098' },
//     };
//     await fetch(
//       `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${currentLat}&lon=${currentLng}&coordType=WGS84GEO&addressType=A02&newAddressExtend=Y`,
//       options
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         console.log(response);
//         dispatch(SET_POSITION(response.addressInfo.fullAddress));
//       })
//       .catch((err) => console.error(err));
//   };
//   useEffect(() => {
//     if (count === 0) {
//       getPositionName();
//       if (userContacts.length === 0) alert('비상연락망 1개 이상 등록은 필수 입니다! \n 마이페이지에서 등록하실 수 있습니다 :)');
//       else {
//         // 문자 API
//         authAxios
//           .post(apiPath.message.post(), {
//             name: username,
//             contact: userContacts[0].contact,
//             location: position,
//           })
//           .then((res) => console.log(res))
//           .catch((err) => console.log(err));
//       }
//       props.setSiren(false);
//     }
//     if (!props.siren) stop();
//     play();
//     let timer = setInterval(() => {
//       setCount(count - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [count]);
//   return (
//     <>
//       {/* <div style={{position: `absolute`, top:`50px`, left:`50px`, backgroundColor: `blue`, color: `white`}}>
//             test
//         </div> */}
//       <Modal
//         open={props.siren}
//         onClose={() => props.setSiren(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={S.Box}>
//           <S.Container>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               <RiAlarmWarningFill size="200" color="red" />
//             </Typography>
//             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//               {count} 초 후에 문자메시지가 발송됩니다.
//             </Typography>
//           </S.Container>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default SirenModal2;

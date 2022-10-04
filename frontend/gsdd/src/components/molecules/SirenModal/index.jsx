import React, { useState } from 'react';
import * as S from './styles'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, TextField } from '@mui/material';
import { RiAlarmWarningFill } from 'react-icons/ri';
import { useEffect } from 'react';

const SirenModal = (props) => {
    // console.log(props.siren)
    // console.log(props)
    const [count, setCount] = useState(5);
    const audio = new Audio('../../../assets/audio/siren.mp3')
    const play = () => {audio.play()}
    const stop = () => {audio.stop()}
    useEffect(() => {
        if (count == 0) { 
            // 문자 API
            props.setSiren(false);
        }
        if (!props.siren) stop();
        play();
        let timer = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [count]);
    return (
        <>
        {/* <div style={{position: `absolute`, top:`50px`, left:`50px`, backgroundColor: `blue`, color: `white`}}>
            test
        </div> */}
        <Modal
            open={props.siren}
            onClose={() => props.setSiren(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={S.Box}>
                <S.Container>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <RiAlarmWarningFill size="200" color="red" />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {count} 초 후에 문자메시지가 발송됩니다.
                </Typography>
                </S.Container>
            </Box>
        </Modal>
        </>
    )
}

export default SirenModal;
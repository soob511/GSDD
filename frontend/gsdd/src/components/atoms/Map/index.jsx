import React from 'react';
import { NewMap } from './styles';


const Map = ({ type }) => {
    if (type === 'home') {
        return (
            <>
                <NewMap id="TMapApp" />
            </>
        );
    } else if (type === 'mypage') {
        return (
            <>
                <NewMap id="TMapAppMypage" />
            </>
        );
    }

}

export default Map;
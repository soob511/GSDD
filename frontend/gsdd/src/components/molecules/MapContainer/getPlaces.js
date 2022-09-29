import axios from 'axios';
import apiPath from '../../../common/apiPath';

const getPlaces = async (newInput) => {
    try {
        const { data } = await axios({
            method: 'GET',
            url: "https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result",
            async: false,
            data: {
                "appKey": "l7xx49e27051d70e475a8285bb568e35a081",
                "searchKeyword": newInput,
                "resCoordTyoe": "EPSG3857",
                "reqCoordType": "WGS84GEO",
                "count": 10,
            },
        })
            .then(

        )
            .catch();
        return data;

    } catch (error) {
        console.log(error);
    }

};

export default getPlaces;
import React, { useEffect, useState } from 'react';
import { NewMap } from './styles';


const Map = () => {

    const [location, setLocation] = useState({
        loaded: false,
        coords: { lat: "", lng: "" }
    });

    // const [map, setMap] = useState();

    // const [marker, setMarker] = useState();

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coords: {
                lat: location.coords.lat,
                lng: location.coords.lng,
            },
        });
    };

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        });
    }

    function getMyGps() {

        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        let gpsOptions = {
            enableHighAccuracy: true,
        };

        return new Promise((onSuccess, onError) => {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, gpsOptions);
        });
    }

    const createMap = async () => {

        const { Tmapv2 } = window;
        if (!Tmapv2) return;

        let position = await getMyGps();
        console.log(position);

        //지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어주기
        const location = new Tmapv2.LatLng(position.coords.latitude, position.coords.longitude);
        const mapOptions = {
            center: location,
            width: "100%",
            height: "100%",
            zoom: 15,
        }
        const map = new Tmapv2.Map("TMapApp", mapOptions);
        new Tmapv2.Marker({
            position: location,
            map: map
        });
    }

    useEffect(() => {
        createMap();
    }, []);

    return (
        <>
            <NewMap id="TMapApp" />
        </>
    );
}


export default Map;
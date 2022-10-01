import Geolocation from 'react-native-geolocation-service';
import pos from '../../../assets/pos.png';


const mapInfo = async () => {

    function getMyGps() {

        let gpsOptions = {
            enableHighAccuracy: true,
        };

        return new Promise((resolve, reject) => {
            // navigator.geolocation.getCurrentPosition(resolve, reject, gpsOptions);
            Geolocation.getCurrentPosition(resolve, reject, gpsOptions);
        });
    }

    const { Tmapv2 } = window;

    const position = await getMyGps();

    //지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어주기
    const location = new Tmapv2.LatLng(position.coords.latitude, position.coords.longitude);
    const mapOptions = {
        center: location,
        width: "100%",
        height: "100%",
        zoom: 15,
    }
    const map = new Tmapv2.Map("TMapApp", mapOptions);
    const marker = new Tmapv2.Marker({
        icon: pos,
        position: location,
        map: map
    });

    return { TmapV2: Tmapv2, map: map, latitude: position.coords.latitude, longitude: position.coords.longitude, location: location, marker: marker };
}

export default mapInfo;
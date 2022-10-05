import light from '../../../assets/light.png';
import camera from '../../../assets/camera.png';
import house from '../../../assets/house.png';
import apiPath from '../../../api/apiPath';
import { authAxios } from '../../../api/common';


const getMarkers = async (map, latitude, longitude) => {

    console.log(latitude, longitude);

    const { Tmapv2 } = window;

    const markers = {};
    markers.lights = [];
    markers.cameras = [];
    markers.houses = [];

    const data = await authAxios
        .get(apiPath.markers.around(latitude, longitude, 5), {})
        .then(res => {
            res = res.data;

            for (const k in res.lights) {
                const location = new Tmapv2.LatLng(res.lights[k].lat, res.lights[k].lon);
                const marker = new Tmapv2.Marker({
                    icon: light,
                    position: location,
                });
                markers.lights.push(marker);
            }
            for (const k in res.cameras) {
                const location = new Tmapv2.LatLng(res.cameras[k].lat, res.cameras[k].lon);
                const marker = new Tmapv2.Marker({
                    icon: camera,
                    position: location,
                });
                markers.cameras.push(marker);
            }
            for (const k in res.houses) {
                const location = new Tmapv2.LatLng(res.houses[k].lat, res.houses[k].lon);
                const marker = new Tmapv2.Marker({
                    icon: house,
                    position: location,
                });
                markers.houses.push(marker);
            }
        })
        .catch(err => console.log(err));

    return markers;

};

export default getMarkers;
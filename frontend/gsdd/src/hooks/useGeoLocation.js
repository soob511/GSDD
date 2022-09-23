import React, { useEffect, useState } from 'react';


const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coords: { lat: "", lng: "" }
    });

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coords: {
                lat: location.coords.latatitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        });
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        console.log("1", location);
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        console.log("2", location);
    }, []);

    return location;
}

export default useGeoLocation;
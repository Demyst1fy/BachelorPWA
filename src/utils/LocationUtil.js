import { useEffect, useState } from "react";
import { perf } from "../firebaseConfig";

export const CurrentLocation = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        const geoLocationTrace = perf.trace("get_geolocation");
        geoLocationTrace.start();
  
        navigator.geolocation.getCurrentPosition((position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setZoom(18);
        });
  
        geoLocationTrace.stop();
      }
    });
  }, [lat, lng, zoom]);
  
  
  return { lat: lat, lng: lng, zoom: zoom };
};
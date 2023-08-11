import { useState, useEffect } from "react";
import { perf } from "../firebaseConfig";

export const CurrentLocation = () => {
  const geoLocationTrace = perf.trace("geo_location");
  geoLocationTrace.start();

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [zoom, setZoom] = useState(4);

  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setZoom(18);
      });
    }
  });

  geoLocationTrace.stop();
  return { lat: lat, lon: lon, zoom: zoom };
};

export const WeatherFromLocation = (currentLocation) => {
  const apiCallCurrentLocationTrace = perf.trace("call_openweather_api_via_current_location");
  apiCallCurrentLocationTrace.start();

  const [data, setData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigator.onLine) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.lat}&lon=${currentLocation.lon}&lang=de&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        )
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error));
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentLocation.lat, currentLocation.lon]);

  apiCallCurrentLocationTrace.stop();
  return data;
};

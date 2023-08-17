import { useState, useEffect } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { perf } from "../firebaseConfig";

// Libraries
import L from "leaflet";

export function ChangeView({ currentLocation }) {
  const map = useMap();
  useEffect(() => {
    map.setView(
      new L.LatLng(currentLocation.lat, currentLocation.lon),
      currentLocation.zoom
    );
  }, [map, currentLocation]);

  return null;
}

export function LocationMarker({ data, currentPosition, transcriptRef }) {
  const [position, setPosition] = useState(
    new L.LatLng(currentPosition.lat, currentPosition.lon)
  );
  const [clicked, setClicked] = useState(false);

  const map = useMapEvents({
    click(e) {
      setClicked(true);
      setPosition(e.latlng);
      map.locate();
    },
  });

  const [clickedLocationData, setClickedLocationData] = useState(data);

  useEffect(() => {
    if (clicked === false && transcriptRef.current !== "") {
      const apiCallLocationNameTrace = perf.trace(
        "call_openweather_api_via_location_name"
      );
      apiCallLocationNameTrace.start();

      let link = `https://api.openweathermap.org/data/2.5/weather?q=${transcriptRef.current}&lang=de&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
      console.log(link);
      fetch(link)
        .then((response) => response.json())
        .then((json) => {
          if (json?.cod === 200) {
            setClickedLocationData(json);
            setPosition(new L.LatLng(json?.coord?.lat, json?.coord?.lon));
          }
        })
        .catch((error) => console.error(error));

      apiCallLocationNameTrace.stop();

      transcriptRef.current = "";
    } else if (clicked === true && position !== null) {
      const apiCallLocationLatLonTrace = perf.trace(
        "call_openweather_api_via_location_latlon"
      );
      apiCallLocationLatLonTrace.start();

      let link = `https://api.openweathermap.org/data/2.5/weather?lat=${position?.lat}&lon=${position?.lng}&lang=de&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
      console.log(link);
      fetch(link)
        .then((response) => response.json())
        .then((json) => {
          if (json?.cod === 200) setClickedLocationData(json);
        })
        .catch((error) => console.error(error));

      apiCallLocationLatLonTrace.stop();
      setClicked(false);
    }
  }, [position, transcriptRef.current]);

  return position === null ? null : (
    <Marker
      ref={(ref) => {
        if (ref) {
          ref.openPopup();
        }
      }}
      position={position}
    >
      <Popup>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Standort: </th>
                <td>{clickedLocationData?.name}</td>
              </tr>
              <tr>
                <th>Temperatur: </th>
                <td>{clickedLocationData?.main?.temp} °C</td>
              </tr>
              <tr>
                <th>Feuchtigkeit: </th>
                <td>{clickedLocationData?.main?.humidity} %</td>
              </tr>
              <tr>
                <th>Windgeschwindigkeit: </th>
                <td>{clickedLocationData?.wind?.speed} km/h</td>
              </tr>
              <tr>
                <th>Luftdruck: </th>
                <td>{clickedLocationData?.main?.pressure} hPa</td>
              </tr>
              <tr>
                <th>Wetter: </th>
                <td>{clickedLocationData?.weather[0]?.description}</td>
                <td>
                  <img
                    style={{ backgroundColor: "lightgray", borderRadius: 40 }}
                    src={
                      "https://openweathermap.org/img/wn/" +
                      clickedLocationData?.weather[0]?.icon +
                      ".png"
                    }
                    width="20"
                    alt="Weather Icon"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Popup>
    </Marker>
  );
}

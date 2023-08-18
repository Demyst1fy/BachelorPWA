import { useState, useEffect } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";

// Libraries
import L from "leaflet";
import {
  GetWeatherDataFromLocationLatLon,
  GetWeatherDataFromLocationName,
} from "./DownloadUtil";

export const ChangeView = ({ currentLocation }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(
      new L.LatLng(currentLocation.lat, currentLocation.lng),
      currentLocation.zoom
    );
  }, [map, currentLocation]);

  return null;
};

export const LocationMarker = ({
  currentData,
  currentLocation,
  transcript,
  setTranscript,
}) => {
  const [position, setPosition] = useState(new L.LatLng(0, 0));

  useEffect(() => {
    setPosition(new L.LatLng(currentLocation?.lat, currentLocation?.lng));
  }, [currentLocation?.lat, currentLocation?.lng]);

  const [clicked, setClicked] = useState(false);

  const map = useMapEvents({
    click(e) {
      setClicked(true);
      setPosition(e.latlng);
      map.locate();
    },
  });

  const [locationData, setLocationData] = useState(null);
  useEffect(() => {
    setLocationData(currentData);
  }, [currentData]);

  useEffect(() => {
    if (clicked === false && transcript !== "") {
      GetWeatherDataFromLocationName(transcript).then((res) => {
        if (res !== null) {
          setLocationData(res);
          setPosition(new L.LatLng(res?.coord?.lat, res?.coord?.lon));
        }
      });

      setTranscript("");
    } else if (clicked === true && position !== null) {
      GetWeatherDataFromLocationLatLon(position).then((res) => {
        if (res !== null) {
          setLocationData(res);
        }
      });

      setClicked(false);
    }
  }, [position, transcript, locationData]);

  return position === null || locationData === null ? null : (
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
                <td>{locationData?.name}</td>
              </tr>
              <tr>
                <th>Temperatur: </th>
                <td>{locationData?.main?.temp} °C</td>
              </tr>
              <tr>
                <th>Feuchtigkeit: </th>
                <td>{locationData?.main?.humidity} %</td>
              </tr>
              <tr>
                <th>Windgeschwindigkeit: </th>
                <td>{locationData?.wind?.speed} km/h</td>
              </tr>
              <tr>
                <th>Luftdruck: </th>
                <td>{locationData?.main?.pressure} hPa</td>
              </tr>
              <tr>
                <th>Wetter: </th>
                <td>{locationData?.weather[0]?.description}</td>
                <td>
                  <img
                    style={{ backgroundColor: "lightgray", borderRadius: 40 }}
                    src={
                      "https://openweathermap.org/img/wn/" +
                      locationData?.weather[0]?.icon +
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
};

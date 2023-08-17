import React, { useState, useEffect, useRef } from "react";

import "./App.css";

import Map from "./components/Map/Map";
import CurrentData from "./components/CurrentData/CurrentData";
import CapturePhoto from "./components/CapturePhoto/CapturePhoto";

import { CurrentLocation } from "./utils/LocationUtil";
import { GetWeatherDataFromLocationLatLon } from "./utils/DownloadUtil";
import { DisplayNotification } from "./utils/NotificationUtil";
import { GetImage } from "./utils/StorageUtil";

function App() {
  let currentLocation = CurrentLocation();

  const [currentData, setCurrentData] = useState(null);

  let didLoad = useRef(false);

  const cameraRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    GetImage(photoRef.current);
  });

  useEffect(() => {
    GetWeatherDataFromLocationLatLon(currentLocation).then((res) => {
      setCurrentData(res);
    });
  }, [currentLocation.lat, currentLocation.lng, currentLocation.zoom]);

  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission(() => {
        if (Notification.permission === "granted") {
          if (
            currentData !== null &&
            currentData?.coord?.lat !== 0 &&
            currentData?.coord?.lon !== 0
          ) {
            setInterval(() => {
              DisplayNotification(currentData, didLoad);
              console.log(currentData);
              didLoad.current = false;
            }, 900000);
          }
        }
      });
    } else {
      if (
        currentData !== null &&
        currentData?.coord?.lat !== 0 &&
        currentData?.coord?.lon !== 0
      ) {
        setInterval(() => {
          DisplayNotification(currentData, didLoad);
          console.log(currentData);
          didLoad.current = false;
        }, 900000);
      }
    }
  }, [currentData]);

  return (
    <div className="App">
      <header className="App-header">
        {currentData && (
          <div className="container">
            {cameraActive && (
              <CapturePhoto
                setCameraActive={setCameraActive}
                cameraRef={cameraRef}
                photoRef={photoRef}
              />
            )}
            {!cameraActive && (
              <div>
                <CurrentData currentData={currentData} photo={photoRef} />
                <Map
                  currentLocation={currentLocation}
                  currentData={currentData}
                  cameraRef={cameraRef}
                  cameraActive={cameraActive}
                  setCameraActive={setCameraActive}
                />
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from "react";

import "./App.css";

import Map from "./components/Map/Map";
import CurrentData from "./components/CurrentData/CurrentData";
import CapturePhoto from "./components/CapturePhoto/CapturePhoto";

import { CurrentLocation } from "./utils/LocationUtil";
import { GetWeatherDataFromLocationLatLon } from "./utils/DownloadUtil";
import { LoadImage } from "./utils/StorageUtil";

function App() {
  let currentLocation = CurrentLocation();

  const [currentData, setCurrentData] = useState(null);

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    LoadImage(photoRef);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      GetWeatherDataFromLocationLatLon(currentLocation).then((res) => {
        setCurrentData(res);
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [currentLocation.lat, currentLocation.lng]);

  const [cameraActive, setCameraActive] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        {currentData && (
          <div className="container">
            {cameraActive && (
              <CapturePhoto
                setCameraActive={setCameraActive}
                videoRef={videoRef}
                photoRef={photoRef}
              />
            )}
            {!cameraActive && (
              <div>
                <CurrentData currentData={currentData} photoRef={photoRef} />
                <Map
                  currentLocation={currentLocation}
                  currentData={currentData}
                  videoRef={videoRef}
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

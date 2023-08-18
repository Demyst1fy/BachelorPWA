import React, { useState, useEffect, useRef } from "react";

import "./App.css";

import Map from "./components/Map/Map";
import CurrentData from "./components/CurrentData/CurrentData";
import CapturePhoto from "./components/CapturePhoto/CapturePhoto";

import { CurrentLocation } from "./utils/LocationUtil";
import { GetWeatherDataFromLocationLatLon } from "./utils/DownloadUtil";
import { GetImage } from "./utils/StorageUtil";

function App() {
  let currentLocation = CurrentLocation();

  const [currentData, setCurrentData] = useState(null);

  const cameraRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    GetImage(photoRef.current);
  });

  useEffect(() => {
    GetWeatherDataFromLocationLatLon(currentLocation).then((res) => {
      setCurrentData(res);
    });
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

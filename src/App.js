import React, { useState, useEffect, useRef } from "react";
import { perf } from "./firebaseConfig";

import "./App.css";

import Map from "./components/Map/Map";
import CurrentData from "./components/CurrentData/CurrentData";
import CapturePhoto from "./components/CapturePhoto/CapturePhoto";

import { CurrentLocation, WeatherFromLocation } from "./utils/LocationUtil";
import { DisplayNotification } from "./utils/NotificationUtil";

function App() {
  let currentLocation = CurrentLocation();
  let data = WeatherFromLocation(currentLocation);
  let didLoad = useRef(false);

  const cameraRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const getImageFromStorageTrace = perf.trace("get_latest_image_from_storage");
    getImageFromStorageTrace.start();
    
    var dataURL = localStorage.getItem("latest_image_uri");
    var img = new Image();
    img.src = dataURL;
    img.onload = function () {
      if (photoRef.current != null)
        photoRef.current.getContext("2d").drawImage(img, 0, 0);
    };

    getImageFromStorageTrace.stop();
  });

  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission(() => {
        if (Notification.permission === "granted") {
          if (
            data !== null &&
            data?.coord?.lat !== 0 &&
            data?.coord?.lon !== 0
          ) {
            setInterval(() => {
              DisplayNotification(data, didLoad);
              console.log(data);
              didLoad.current = false;
            }, 900000);
          }
        }
      });
    } else {
      if (data !== null && data?.coord?.lat !== 0 && data?.coord?.lon !== 0) {
        setInterval(() => {
          DisplayNotification(data, didLoad);
          console.log(data);
          didLoad.current = false;
        }, 900000);
      }
    }
  }, [data]);
  
  return (
    <div className="App">
      <header className="App-header">
        {data && (
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
                <CurrentData data={data} photo={photoRef} />
                <Map
                  currentLocation={currentLocation}
                  data={data}
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
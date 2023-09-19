import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Button } from "@mui/material";
import { Mic, PhotoCamera, Notifications } from "@mui/icons-material";

import { LocationMarker, ChangeView } from "../../utils/MapUtil";
import { MicrophoneOn, MicrophoneOff } from "../../utils/MicrophoneUtil";
import { GetVideo } from "../../utils/CameraUtil";
import { CheckAndRequestNotification } from "../../utils/NotificationUtil";

// Libraries
import L from "leaflet";

//import PropTypes from "prop-types";

import "./Map.css";

import Moment from "moment";
import "moment/locale/de-at";
Moment.locale("de-at");

const Map = ({
  currentLocation,
  currentData,
  videoRef,
  cameraActive,
  setCameraActive,
}) => {
  const [transcript, setTranscript] = useState("");
  const [micActive, setMicActive] = useState(false);

  return (
    <div className="Map">
      <MapContainer
        center={[currentLocation.lng, currentLocation.lat]}
        minZoom={3}
        maxBounds={L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180))}
        zoom={currentLocation.zoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
        />
        {currentData && (
          <Marker position={[currentLocation.lat, currentLocation.lng]} />
        )}
        <LocationMarker
          currentData={currentData}
          currentLocation={currentLocation}
          transcript={transcript}
          setTranscript={setTranscript}
        />
        <ChangeView currentLocation={currentLocation} />
      </MapContainer>
      <Button
        onClick={() => {
          CheckAndRequestNotification(currentData);
        }}
        variant="contained"
        size="small"
        style={{ margin: "5px", color: "#FFFFFF", backgroundColor: "#BF371F" }}
        endIcon={<Notifications />}
      >
        Push-Benachrichtigung senden
      </Button>
      <Button
        onClick={() => {
          MicrophoneOn(setTranscript, setMicActive);
        }}
        disabled={!micActive ? false : true}
        variant="contained"
        size="small"
        style={
          !micActive
            ? { margin: "5px", color: "#FFFFFF", backgroundColor: "#ED6C02" }
            : { margin: "5px", color: "#555555", backgroundColor: "#E7E7E7" }
        }
        endIcon={<Mic />}
      >
        {!micActive ? "Standort per Mikrofon scannen" : "Stopp Aufnahme..."}
      </Button>
      <Button
        onClick={() => {
          GetVideo(videoRef);
          setCameraActive(true);
        }}
        disabled={!cameraActive ? false : true}
        variant="contained"
        size="small"
        style={{ margin: "5px", color: "#FFFFFF", backgroundColor: "#1976D2" }}
        endIcon={<PhotoCamera />}
      >
        {!cameraActive ? "Bild aufnehmen" : "Scannen..."}
      </Button>
    </div>
  );
};

Map.propTypes = {};

Map.defaultProps = {};

export default Map;

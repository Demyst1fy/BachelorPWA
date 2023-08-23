import React from "react";
import { Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

import { SetImageInStorage } from "../../utils/StorageUtil";

import "./CapturePhoto.css";

const CapturePhoto = ({ setCameraActive, videoRef, photoRef }) => {
  let photo = photoRef?.current;

  return (
    <div className="CapturePhoto">
      <p>
        <Button
          onClick={() => {
            let video = videoRef.current;
            SetImageInStorage(photo, video);

            const stream = video.srcObject;
            const tracks = stream.getTracks();

            for (let i = 0; i < tracks.length; i++) {
              let track = tracks[i];
              track.stop();
            }

            video.srcObject = null;
            setCameraActive(false);
          }}
          variant="contained"
          size="small"
          endIcon={<PhotoCamera />}
        >
          Shoot Photo
        </Button>
      </p>
      <p>
        <video ref={videoRef} width="320" height="240" muted autoPlay />
      </p>
    </div>
  );
};

CapturePhoto.propTypes = {};
CapturePhoto.defaultProps = {};

export default CapturePhoto;

import React from "react";
import { Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { perf } from "../../firebaseConfig";

import { SaveImage } from "../../utils/CameraUtil";

import "./CapturePhoto.css";

const CapturePhoto = ({ setCameraActive, cameraRef, photoRef }) => {
  let pic = photoRef?.current;

  return (
    <div className="CapturePhoto">
      <p>
        <Button
          onClick={() => SaveImage(pic, cameraRef, setCameraActive)}
          variant="contained"
          size="small"
          endIcon={<PhotoCamera />}
        >
          Shoot Photo
        </Button>
      </p>
      <p>
        <video ref={cameraRef} width="320" height="240" muted autoPlay />
      </p>
    </div>
  );
};

CapturePhoto.propTypes = {};
CapturePhoto.defaultProps = {};

export default CapturePhoto;

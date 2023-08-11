import React from "react";
import { Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { perf } from "../../firebaseConfig";

import "./CapturePhoto.css";

const CapturePhoto = ({ setCameraActive, cameraRef, photoRef }) => {
  let pic = photoRef?.current;

  return (
    <div className="CapturePhoto">
      <p>
        <Button
          onClick={async function () {
            const saveImageInStorageTrace = perf.trace(
              "save_image_in_storage"
            );
            saveImageInStorageTrace.start();

            let video = cameraRef.current;

            pic.getContext("2d").drawImage(video, 0, 0, 120, 90);

            localStorage.setItem("savedPic", pic.toDataURL("image/jpeg"));

            const stream = video.srcObject;
            const tracks = stream.getTracks();

            for (let i = 0; i < tracks.length; i++) {
              let track = tracks[i];
              track.stop();
            }

            video.srcObject = null;
            setCameraActive(false);
            saveImageInStorageTrace.stop();
          }}
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

import { perf } from "../firebaseConfig";

export function GetVideo(cameraRef) {
  const cameraActivationTrace = perf.trace("activate_camera");
  cameraActivationTrace.start();

  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        facingMode: "environment",
      },
    })
    .then((stream) => {
      if (cameraRef.current != null) {
        let video = cameraRef.current;
        video.srcObject = stream;
      }
    })
    .catch((err) => {
      console.error("error:", err);
    });

    cameraActivationTrace.stop();
}

export async function SaveImage(pic, cameraRef, setCameraActive) {
  const setImageInStorageTrace = perf.trace(
    "set_latest_image_in_storage"
  );
  setImageInStorageTrace.start();

  let video = cameraRef.current;
  pic.getContext("2d").drawImage(video, 0, 0, 120, 90);
  localStorage.setItem("latest_image_uri", pic.toDataURL("image/jpeg"));

  setImageInStorageTrace.stop();

  const stream = video.srcObject;
  const tracks = stream.getTracks();

  for (let i = 0; i < tracks.length; i++) {
    let track = tracks[i];
    track.stop();
  }

  video.srcObject = null;
  setCameraActive(false);
}
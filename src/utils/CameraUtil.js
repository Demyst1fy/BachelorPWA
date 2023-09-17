import { perf } from "../firebaseConfig";

export const GetVideo = (cameraRef) => {
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

      cameraActivationTrace.stop();
    })
    .catch((err) => {
      console.error("error:", err);
    });
};

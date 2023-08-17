import { perf } from "../firebaseConfig";

export const SaveImage = async (pic, cameraRef, setCameraActive) => {
  const setImageInStorageTrace = perf.trace("set_latest_image_in_storage");
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
};

export const GetImage = (photo) => {
  const getImageFromStorageTrace = perf.trace("get_latest_image_from_storage");
  getImageFromStorageTrace.start();

  var dataURL = localStorage.getItem("latest_image_uri");

  getImageFromStorageTrace.stop();
  
  var img = new Image();
  img.src = dataURL;
  img.onload = function () {
    if (photo != null)
      photo.getContext("2d").drawImage(img, 0, 0);
  };
};

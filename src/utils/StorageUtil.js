import { perf } from "../firebaseConfig";

const CreateImage = (photo, video) => {
  const createImageTrace = perf.trace("create_image");
  createImageTrace.start();

  photo.getContext("2d").drawImage(video, 0, 0, 120, 90);
  let picToDataURL = photo.toDataURL("image/jpeg");

  createImageTrace.stop();

  return picToDataURL;
};

export const LoadImage = (photoRef, latestImage) => {
  let photo = photoRef.current;

  const loadImageTrace = perf.trace("load_image");
  loadImageTrace.start();

  var img = new Image();
  img.src = latestImage;
  img.onload = function () {
    if (photo != null) photo.getContext("2d").drawImage(img, 0, 0);
  };

  loadImageTrace.stop();
};

export const SetImageInStorage = (photo, video) => {
  let createdImage = CreateImage(photo, video);

  const setImageInStorageTrace = perf.trace("set_latest_image_in_storage");
  setImageInStorageTrace.start();

  localStorage.setItem("latest_image", createdImage);

  setImageInStorageTrace.stop();
};

export const GetImageFromStorage = () => {
  const getImageFromStorageTrace = perf.trace("get_latest_image_from_storage");
  getImageFromStorageTrace.start();

  var imageFromStorage = localStorage.getItem("latest_image");

  getImageFromStorageTrace.stop();

  return imageFromStorage;
};

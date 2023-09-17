import { perf } from "../firebaseConfig";

const CreateImage = (photo, video) => {
  const createImageTrace = perf.trace("create_image");
  createImageTrace.start();

  photo.getContext("2d").drawImage(video, 0, 0, 240, 180);
  let picAsDataURL = photo.toDataURL("image/jpeg");

  createImageTrace.stop();

  return picAsDataURL;
};

export const LoadImage = (photoRef) => {
  let photo = photoRef.current;
  var latestImageAsDataURL = GetImageFromStorage();

  if (latestImageAsDataURL != null) {
    const loadImageTrace = perf.trace("load_image");
    loadImageTrace.start();

    var img = new Image();
    img.src = latestImageAsDataURL;
    img.onload = () => {
      if (photo != null) {
        photo.getContext("2d").drawImage(img, 0, 0);
        loadImageTrace.stop();
      }
    };
  }
};

export const SetImageInStorage = (photo, video) => {
  let createdImageAsDataURL = CreateImage(photo, video);

  const setImageInStorageTrace = perf.trace("set_latest_image_in_storage");
  setImageInStorageTrace.start();

  localStorage.setItem("latest_image", createdImageAsDataURL);

  setImageInStorageTrace.stop();
};

const GetImageFromStorage = () => {
  const getImageFromStorageTrace = perf.trace("get_latest_image_from_storage");
  getImageFromStorageTrace.start();

  var latestImageAsDataURL = localStorage.getItem("latest_image");

  getImageFromStorageTrace.stop();

  return latestImageAsDataURL;
};

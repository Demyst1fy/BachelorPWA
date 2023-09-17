import { perf } from "../firebaseConfig";

export const CheckAndRequestNotification = (currentData) => {
  if (Notification.permission === "default") {
    Notification.requestPermission(() => {
      if (Notification.permission === "granted") {
        DisplayNotification(currentData);
      }
    });
  } else if (Notification.permission === "granted") {
    DisplayNotification(currentData);
  }
};

const DisplayNotification = (currentData) => {
  const pushNotificationTrace = perf.trace("create_notification");
  pushNotificationTrace.start();

  navigator.serviceWorker.getRegistration().then((reg) => {
    const options = {
      body:
        currentData?.main?.temp +
        " °C, " +
        currentData?.weather[0]?.description,
      icon:
        "https://openweathermap.org/img/wn/" +
        currentData?.weather[0]?.icon +
        "@2x.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 0,
      },
      badge:
        "https://openweathermap.org/img/wn/" +
        currentData?.weather[0]?.icon +
        "@2x.png",
    };
    reg?.showNotification(currentData?.name, options);
    pushNotificationTrace.stop();
  });
};

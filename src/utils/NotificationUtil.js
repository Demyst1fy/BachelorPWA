import { perf } from "../firebaseConfig";

export const DisplayNotification = (currentData) => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission(() => {
      if (Notification.permission === "granted") {
        const pushNotificationTrace = perf.trace("create_push_notification");
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
          console.log(currentData?.name);
          reg?.showNotification(currentData?.name, options);
        });

        pushNotificationTrace.stop();
      }
    });
  } else {
    const pushNotificationTrace = perf.trace("create_push_notification");
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
      console.log(currentData?.name);
      reg?.showNotification(currentData?.name, options);
    });

    pushNotificationTrace.stop();
  }
};

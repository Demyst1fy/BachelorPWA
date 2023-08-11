import { perf } from "../firebaseConfig";

export const DisplayNotification = (currentData, didLoad) => {
    const pushNotificationTrace = perf.trace("push_notification");
    pushNotificationTrace.start();
  
    if (Notification.permission === "granted") {
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
        if (!didLoad.current) {
          console.log(currentData?.name);
          reg?.showNotification(currentData?.name, options);
          didLoad.current = true;
        }
      });
    }
  
    pushNotificationTrace.stop();
  };
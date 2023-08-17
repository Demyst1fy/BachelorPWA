import { perf } from "../firebaseConfig";

export const GetWeatherDataFromLocationLatLon = async (position) => {
  const apiCallLocationLatLonTrace = perf.trace(
    "call_openweather_api_via_location_latlon"
  );
  apiCallLocationLatLonTrace.start();
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position?.lat}&lon=${position?.lng}&lang=de&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
  );

  const json = await response.json();

  apiCallLocationLatLonTrace.stop();

  return json;
};

export const GetWeatherDataFromLocationName = async (name) => {
  const apiCallLocationNameTrace = perf.trace(
    "call_openweather_api_via_location_name"
  );
  apiCallLocationNameTrace.start();

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&lang=de&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
  );

  const json = await response.json();

  apiCallLocationNameTrace.stop();

  return json;
};

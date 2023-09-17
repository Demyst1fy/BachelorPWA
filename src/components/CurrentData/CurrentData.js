import "./CurrentData.css";

const CurrentData = ({ currentData, photoRef }) => {
  return (
    <div className="CurrentData leaflet-bottom leaflet-left">
      <table>
        <tbody>
          <tr>
            <th style={{ textAlign: "left" }}>Derzeitiger Standort: </th>
            <td style={{ textAlign: "left" }}>{currentData?.name}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Temperatur: </th>
            <td style={{ textAlign: "left" }}>{currentData?.main?.temp} °C</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Feuchtigkeit: </th>
            <td style={{ textAlign: "left" }}>
              {currentData?.main?.humidity} %
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Windgeschwindigkeit: </th>
            <td style={{ textAlign: "left" }}>
              {currentData?.wind?.speed} km/h
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Luftdruck: </th>
            <td style={{ textAlign: "left" }}>
              {currentData?.main?.pressure} hPa
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Wetter: </th>
            <td style={{ textAlign: "left", verticalAlign: "middle" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p>{currentData?.weather[0]?.description}</p>
                <img
                  style={{
                    textAlign: "left",
                    backgroundColor: "lightgray",
                    borderRadius: 40,
                  }}
                  src={
                    "https://openweathermap.org/img/wn/" +
                    currentData?.weather[0]?.icon +
                    ".png"
                  }
                  width="30"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Foto: </th>
            <td style={{ textAlign: "left" }}>
              <canvas ref={photoRef} width="240" height="180" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

CurrentData.propTypes = {};

CurrentData.defaultProps = {};

export default CurrentData;

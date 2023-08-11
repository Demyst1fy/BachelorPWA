import "./CurrentData.css";

const CurrentData = ({ data, photo }) => {
  return (
    <div className="CurrentData leaflet-bottom leaflet-left">
      <table>
        <tbody>
          <tr>
            <th style={{ textAlign: "left" }}>Derzeitiger Standort: </th>
            <td style={{ textAlign: "left" }}>{data?.name}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Temperatur: </th>
            <td style={{ textAlign: "left" }}>{data?.main?.temp} °C</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Feuchtigkeit: </th>
            <td style={{ textAlign: "left" }}>{data?.main?.humidity} %</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Windgeschwindigkeit: </th>
            <td style={{ textAlign: "left" }}>{data?.wind?.speed} km/h</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Luftdruck: </th>
            <td style={{ textAlign: "left" }}>{data?.main?.pressure} hPa</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Wetter: </th>
            <td style={{ textAlign: "left", verticalAlign: "middle" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p>{data?.weather[0]?.description}</p>
                <img
                  style={{
                    textAlign: "left",
                    backgroundColor: "lightgray",
                    borderRadius: 40,
                  }}
                  src={
                    "https://openweathermap.org/img/wn/" +
                    data?.weather[0]?.icon +
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
              <canvas ref={photo} width="120" height="90" />
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

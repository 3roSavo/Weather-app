import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const WeatherCountry = ({ coordinates }) => {
  const [infoCity, setInfoCity] = useState(null);

  const fetchCoordinates = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        coordinates.lat +
        "&lon=" +
        coordinates.lon +
        "&units=metric&lang=it&appid=a793bd006b5b59f0fb2f211b3e3cd738"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel recupero informazioni");
        }
      })
      .then((obj) => {
        console.log(obj);
        setInfoCity({ obj });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchCoordinates();
  }, [coordinates]); // forse qua invece di infoCity ci andava coordinates

  return (
    <>
      {infoCity && (
        <div className="text-center">
          <h1 className="mt-3">{infoCity.obj.name}</h1>
          <img
            style={{ width: "100px" }}
            src={
              "http://openweathermap.org/img/w/" +
              infoCity.obj.weather[0].icon +
              ".png"
            }
            alt="icon"
          ></img>
          <p>{infoCity.obj.weather[0].description}</p>
          <p className="fw-bold fs-5">{Math.round(infoCity.obj.main.temp)}°C</p>
          <div>
            Temperatura minima : {Math.round(infoCity.obj.main.temp_min)}°C
          </div>
          <div>
            Temperatura massima : {Math.round(infoCity.obj.main.temp_max)}°C
          </div>
          <div>
            Temperatura percepita : {Math.round(infoCity.obj.main.feels_like)}°C
          </div>
          <div>Pressione atmosferica : {infoCity.obj.main.pressure} hPa</div>
          <div>Umidità : {infoCity.obj.main.humidity}%</div>
          <div>Vento : {infoCity.obj.wind.speed} m/s </div>

          {/* <Card bg="success" text="light" className="mt-4 mx-auto col-6">
            <Card.Header>{infoCity.obj.name}</Card.Header>
            <div className="row">
              <div className="col-3 text-center p-0">
                <img
                  style={{ width: "100%" }}
                  src={
                    "http://openweathermap.org/img/w/" +
                    infoCity.obj.weather[0].icon +
                    ".png"
                  }
                  alt="icon"
                ></img>
              </div>
              <Card.Body className="col-9 p-0">
                <Card.Title>{infoCity.obj.weather[0].main} </Card.Title>
                <Card.Text>{infoCity.obj.weather[0].description}</Card.Text>
              </Card.Body>
            </div>
          </Card> */}
        </div>
      )}
    </>
  );
};
export default WeatherCountry;

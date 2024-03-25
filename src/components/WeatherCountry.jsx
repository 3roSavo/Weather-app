import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WeatherCountry = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null); // Attuali
  const [fiveDaysForecastData, setFiveDaysForecastData] = useState(null) // lista previsioni ogni 3 ore per 5 gg

  const [urlimage, setUrlImage] = useState("")

  const coordinates = useSelector(state => state.coordinates)

  const getCurrentWeatherData = () => {
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
        setCurrentWeatherData(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFiveDaysForecast = () => {

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?lat=" + coordinates.lat + "&lon=" + coordinates.lon + "&appid=a793bd006b5b59f0fb2f211b3e3cd738"
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
        setFiveDaysForecastData(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getLocalTime = (timezoneOffset) => {

    const currentUtcTime = new Date();
    const utcMilliseconds = currentUtcTime.getTime();
    const timezoneOffsetMs = timezoneOffset * 1000;
    const currentLocalTime = utcMilliseconds + timezoneOffsetMs + (new Date().getTimezoneOffset() * 60 * 1000); // Aggiunta del fuso orario locale
    return new Date(currentLocalTime);
  }

  const convertTimestampToTime = (timestamp) => {
    // Crea un oggetto data utilizzando il timestamp
    const date = new Date(timestamp * 1000); // Moltiplica per 1000 per convertire secondi in millisecondi

    // Ottieni ore e minuti dalla data
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Formatta l'output
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return formattedTime;
  }

  const getCountryPhoto = () => {

    fetch("https://api.pexels.com/v1/search?query=" + currentWeatherData.name + "&per_page=1", {
      headers: {
        "authorization": "ifbuQCuGTrbmEOof10n9yXGfVaWjUFcpLwodmFpq5GtLg0BZxQJcDjHy"
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json()
            .then(errorData => { throw new Error(errorData.message) })
        }
      })
      .then((obj) => {
        console.log(obj);
        if (obj.photos.length === 0) {
          setUrlImage("https://res.cloudinary.com/diklzegyw/image/upload/v1711306905/App_meteo/pexels-johannes-plenio-1118873_ftxt8u.jpg")
        }
        setUrlImage(obj.photos[0].src.landscape)
      })
      .catch((err) => {
        console.log(err);
      });
  }



  useEffect(() => {
    getCurrentWeatherData();
    getFiveDaysForecast();
  }, [coordinates]);

  useEffect(() => {
    if (currentWeatherData !== null) {
      getCountryPhoto()
    }
  }, [currentWeatherData])

  return (
    <>
      {fiveDaysForecastData && (
        <div className="row mx-auto mx-lg-4 mx-xl-5">

          <div className="col-12 col-md-5 p-3">
            <div className="card card-settings h-100  text-white rounded-4" style={{ backgroundImage: `url(${urlimage})` }}>

              <div className=" card-body ">
                <h1 className=" card-title text-center m-0">
                  {currentWeatherData.name}
                </h1>

                <div className="card-text text-center hour-time">
                  {getLocalTime(currentWeatherData.timezone).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                <div className="text-center">
                  <span className="weekday-time ">
                    {getLocalTime(currentWeatherData.timezone).toLocaleString('it-IT', { weekday: 'long', day: 'numeric', month: 'short' })}
                  </span>
                </div>

              </div>

            </div>
          </div>

          <div className="col-12 col-md-7 p-3">

            <div className=" px-3 py-3 rounded-4 side-card-currentWeather">

              <div className="row justify-content-center">

                <div className="col-6 col-lg-4 text-center">

                  <div className="">

                    <h1 className="main-degrees mb-0 mt-0 mb-0">{currentWeatherData.main.temp}°C</h1>

                    <div className=""><span className="sunrise-set">Percepiti: </span><strong>{currentWeatherData.main.feels_like}°C</strong></div>

                  </div>

                  <div className="mt-3">

                    <div className="row justify-content-center">

                      <i className="bi bi-sunrise-fill ps-0 fs-1 col-6 text-end"></i>

                      <div className="text-start col-6 px-0">
                        <div className=" fw-bold sunrise-set">Alba</div>
                        <div>{convertTimestampToTime(currentWeatherData.sys.sunrise)}</div>
                      </div>


                    </div>

                    <div className="row justify-content-center">

                      <i className="bi bi-sunset fs-1 col-6 text-end"></i>

                      <div className="text-start col-6 px-0">
                        <div className=" fw-bold sunrise-set">Tramonto</div>
                        <div>{convertTimestampToTime(currentWeatherData.sys.sunset)}</div>
                      </div>

                    </div>

                  </div>

                </div>

                <div className="col-6 col-lg-4">
                  <div className="row justify-content-center ">

                    <img className="weather-img col-12 px-3" src={`http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@4x.png`} alt="weather-icon"></img>

                    <p className="fs-3 fw-bold text-center title-spacing m-0">{currentWeatherData.weather[0].description}</p>

                  </div>
                </div>

                <div className="col-12 col-lg-4 col-lg-4 row mt-3 mt-lg-0 px-1">

                  <div className="col-3 col-lg-6 text-center px-0">
                    <i className="bi bi-water fs-2 "></i>
                    <div className="fw-bold data">{currentWeatherData.main.humidity}%</div>
                    <p className="side-info">Umidità</p>
                  </div>
                  <div className="col-3 col-lg-6 text-center px-0">
                    <i className="bi bi-wind fs-2 "></i>
                    <div className="fw-bold data">{currentWeatherData.wind.speed}m/s</div>
                    <p className="side-info">Vel. vento</p>
                  </div>
                  <div className="col-3 col-lg-6 text-center px-0">
                    <i className="bi bi-thermometer-snow fs-2 "></i>
                    <div className="fw-bold data">{currentWeatherData.main.temp_min}°C</div>
                    <p className="side-info">Min °C</p>
                  </div>
                  <div className="col-3 col-lg-6 text-center px-0">
                    <i className="bi bi-thermometer-sun fs-2 "></i>
                    <div className="fw-bold data">{currentWeatherData.main.temp_max}°C</div>
                    <p className="side-info">Max °C</p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
export default WeatherCountry;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cursorNav from "../assets/gps_navigation_arrow_geo_icon_148674.png"
import { useNavigate } from "react-router-dom";

const WeatherCountry = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null); // Attuali
  const [fiveDaysForecastData, setFiveDaysForecastData] = useState(null) // lista previsioni ogni 3 ore per 5 gg

  const [urlimage, setUrlImage] = useState("")

  const cityName = useSelector(state => state.cityName)

  const [currentTime, setCurrentTime] = useState(null)

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const getCurrentWeatherData = () => {

    setLoading(true)

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&lang=it&appid=a793bd006b5b59f0fb2f211b3e3cd738"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json()
            .then((errorData) => { throw new Error(errorData.message) })
        }
      })
      .then((obj) => {
        setTimeout(() => {
          setLoading(false)
          console.log(obj);
          setCurrentWeatherData(obj);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false)
        alert(err)
        console.log(err);
        navigate("/")
      });
  };

  const getFiveDaysForecast = () => {

    setLoading(true)

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=a793bd006b5b59f0fb2f211b3e3cd738"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel recupero informazioni");
        }
      })
      .then((obj) => {
        setTimeout(() => {
          console.log(obj);
          setFiveDaysForecastData(obj);
          setLoading(false)
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  }

  const getLocalTime = () => {

    const currentUtcTime = new Date();
    const utcMilliseconds = currentUtcTime.getTime();

    const timezoneOffsetMs = currentWeatherData.timezone * 1000;

    const currentLocalTime = utcMilliseconds + timezoneOffsetMs + (new Date().getTimezoneOffset() * 60 * 1000); // Aggiunta del fuso orario locale

    return new Date(currentLocalTime);
  }

  const transformTimeStamp = (timestamp) => {
    // Crea un oggetto Data utilizzando il timestamp (moltiplicato per 1000 per convertirlo da secondi a millisecondi)
    const date = new Date(timestamp * 1000);

    // Ottieni la data nel formato desiderato utilizzando toLocaleString()
    const options = { weekday: 'short', day: '2-digit' };
    const formattedDate = date.toLocaleString('it-IT', options);
    return formattedDate
  }

  const convertTimestampToTime = (sunriseOrSunsetUTC, timezone) => {
    // Crea un oggetto data utilizzando il timestamp
    const date = new Date(sunriseOrSunsetUTC * 1000 + timezone * 1000); // Moltiplica per 1000 per convertire secondi in millisecondi e aggiunge il fuso orario locale nostro
    // new date torna una data inclusiva del fuso orario locale reperito dal browser
    // con i metodi getUTC....() escludiamo il fuso orario locale per poi aggiungerci quello voluto (timezone)

    // Ottieni ore e minuti dalla data, eliminando il fuso orario locale nostro automaticamente aggiungo precedentemente dall'oggetto Date
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

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

    setCurrentTime(null)
    setCurrentWeatherData(null)
    setFiveDaysForecastData(null)

    getCurrentWeatherData();
    getFiveDaysForecast();
  }, [cityName]);

  useEffect(() => {

    if (currentWeatherData) {

      const dateUpdate = setInterval(() => {

        getLocalTime()
        setCurrentTime(getLocalTime)

        //console.log(new Date())
        //console.log(currentWeatherData.timezone * 1000)
        //console.log(new Date().getTimezoneOffset())


      }, 1000);

      return () => clearInterval(dateUpdate);

    }

  }, [currentWeatherData])

  useEffect(() => {
    if (currentWeatherData !== null) {
      getCountryPhoto()
    }
  }, [currentWeatherData])

  return (
    <div className="flex-grow-1">

      {loading &&
        <div className=" d-flex justify-content-center">
          <div className="loader"></div>
        </div>
      }

      <div className="">

        {fiveDaysForecastData && (

          <div className="row mx-auto mx-lg-4 mx-xl-5">

            <div className="col-12 col-md-8 p-3">
              <div className="card card-settings  text-white rounded-4" style={{ backgroundImage: `url(${urlimage})` }}>

                <div className=" card-body ">
                  <h1 className=" card-title text-center m-0">
                    {currentWeatherData.name} ({currentWeatherData.sys.country})
                  </h1>

                  <div className="card-text text-center hour-time">

                    {!currentTime &&
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    }

                    {currentTime &&
                      currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: "2-digit" })
                    }

                  </div>

                  <div className="text-center">
                    {currentTime && <span className="weekday-time ">
                      {currentTime.toLocaleString('it-IT', { weekday: 'long', day: 'numeric', month: 'short' })}
                    </span>}
                  </div>

                </div>

              </div>

              <div className="col-12 py-3">

                <div className=" px-3 py-3 rounded-4 side-card-currentWeather">

                  <div className="row justify-content-center mx-0">

                    <div className="col-6 col-lg-4 text-center d-flex flex-column justify-content-center px-0">

                      <div className="">

                        <h1 className="main-degrees mb-0 mt-0 mb-0">{currentWeatherData.main.temp}°C</h1>

                        <div className=""><span className="sunrise-set">Percepiti: </span><strong>{currentWeatherData.main.feels_like}°C</strong></div>

                      </div>

                      <div className="mt-3">

                        <div className="row justify-content-center">

                          <i className="bi bi-sunrise-fill ps-0 fs-1 col-6 text-end"></i>

                          <div className="text-start col-6 px-0">
                            <div className=" fw-bold sunrise-set">Alba</div>
                            <div>{convertTimestampToTime(currentWeatherData.sys.sunrise, currentWeatherData.timezone)}</div>
                          </div>


                        </div>

                        <div className="row justify-content-center">

                          <i className="bi bi-sunset fs-1 col-6 text-end"></i>

                          <div className="text-start col-6 px-0">
                            <div className=" fw-bold sunrise-set">Tramonto</div>
                            <div>{convertTimestampToTime(currentWeatherData.sys.sunset, currentWeatherData.timezone)}</div>
                          </div>

                        </div>

                      </div>

                    </div>

                    <div className="col-6 col-lg-4">
                      <div className="d-flex flex-column align-items-center justify-content-center mx-0">

                        <img className="weather-img col-12" src={`http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@4x.png`} alt="weather-icon"></img>

                        <p className="fs-3 fw-bold text-center title-spacing m-0 px-0">{currentWeatherData.weather[0].description}</p>

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
                        <div className="fw-bold data">{currentWeatherData.wind.speed.toString().slice(0, 4)}m/s</div>
                        <p className="side-info">Vel. vento</p>
                      </div>
                      <div className="col-3 col-lg-6 text-center px-0">
                        <i className="bi bi-thermometer-snow fs-2 "></i>
                        <div className="fw-bold data">{currentWeatherData.main.temp_min.toString().slice(0, 4)}°C</div>
                        <p className="side-info">Min °C</p>
                      </div>
                      <div className="col-3 col-lg-6 text-center px-0">
                        <i className="bi bi-thermometer-sun fs-2 "></i>
                        <div className="fw-bold data">{currentWeatherData.main.temp_max.toString().slice(0, 4)}°C</div>
                        <p className="side-info">Max °C</p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <div className="five-days-forecast-card p-3 rounded-4">

                <h5 className="text-center fw-bold">Previsioni 5 giorni</h5>

                <div className="row mx-0 justify-content-sm-center">

                  <div className="col-12 flex-sm-column col-sm-4 mb-sm-4 row mx-0 px-0 align-items-center justify-content-around">

                    <div className="fw-bold col-4 col-sm-12 text-center">{transformTimeStamp(fiveDaysForecastData.list[7].dt)}</div>

                    <div className="col-4 col-sm-12 text-center"><img className="five-days-icon" src={`http://openweathermap.org/img/wn/${fiveDaysForecastData.list[7].weather[0].icon}@4x.png`} alt="weather-icon" /></div>

                    <div className="fw-bold text-center col-4 col-sm-12">{fiveDaysForecastData.list[7].main.temp}°C</div>

                  </div>

                  <div className="col-12 flex-sm-column col-sm-4 mb-sm-4 row mx-0 px-0 align-items-center justify-content-around">

                    <div className="fw-bold col-4 col-sm-12 text-center">{transformTimeStamp(fiveDaysForecastData.list[15].dt)}</div>

                    <div className="col-4 col-sm-12 text-center"><img className="five-days-icon" src={`http://openweathermap.org/img/wn/${fiveDaysForecastData.list[15].weather[0].icon}@4x.png`} alt="weather-icon" /></div>

                    <div className="fw-bold text-center col-4 col-sm-12">{fiveDaysForecastData.list[15].main.temp}°C</div>

                  </div>

                  <div className="col-12 flex-sm-column col-sm-4 mb-sm-4 row mx-0 px-0 align-items-center justify-content-around">

                    <div className="fw-bold col-4 col-sm-12 text-center">{transformTimeStamp(fiveDaysForecastData.list[23].dt)}</div>

                    <div className="col-4 col-sm-12 text-center"><img className="five-days-icon" src={`http://openweathermap.org/img/wn/${fiveDaysForecastData.list[23].weather[0].icon}@4x.png`} alt="weather-icon" /></div>

                    <div className="fw-bold text-center col-4 col-sm-12">{fiveDaysForecastData.list[23].main.temp}°C</div>

                  </div>

                  <div className="col-12 flex-sm-column col-sm-4 row mx-0 px-0 align-items-center justify-content-around">

                    <div className="fw-bold col-4 col-sm-12 text-center">{transformTimeStamp(fiveDaysForecastData.list[31].dt)}</div>

                    <div className="col-4 col-sm-12 text-center"><img className="five-days-icon" src={`http://openweathermap.org/img/wn/${fiveDaysForecastData.list[31].weather[0].icon}@4x.png`} alt="weather-icon" /></div>

                    <div className="fw-bold text-center col-4 col-sm-12">{fiveDaysForecastData.list[31].main.temp}°C</div>

                  </div>

                  <div className="col-12 flex-sm-column col-sm-4 row mx-0 px-0 align-items-center justify-content-around">

                    <div className="fw-bold col-4 col-sm-12 text-center">{transformTimeStamp(fiveDaysForecastData.list[39].dt)}</div>

                    <div className="col-4 col-sm-12 text-center"><img className="five-days-icon" src={`http://openweathermap.org/img/wn/${fiveDaysForecastData.list[39].weather[0].icon}@4x.png`} alt="weather-icon" /></div>

                    <div className="fw-bold text-center col-4 col-sm-12">{fiveDaysForecastData.list[39].main.temp}°C</div>

                  </div>

                </div>
              </div>

            </div>

            <aside className="col-12 col-md-4 p-3 ps-md-1">

              <div className="card-aside h-100 d-flex flex-column  rounded-4 p-3">

                <h5 className="text-center fw-bold mb-md-0">Previsioni orarie</h5>

                <div className="row d-md-flex flex-md-column h-100 justify-content-around m-0">

                  <div className="d-flex flex-column flex-md-row flex-md-wrap col-6 col-sm-4 col-md-12  justify-content-around align-items-center pb-md-0 pb-lg-0 align-items-md-center p-0 text-center">

                    <div className="fs-5 fw-bold col-6 col-sm-4  col-md-12 col-lg-4">
                      {fiveDaysForecastData.list[0].dt_txt.slice(10, 16)}
                    </div>

                    <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                      <img className="hourly-icon" src={`http://openweathermap.org/img/wn/${fiveDaysForecastData.list[0].weather[0].icon}@4x.png`} alt="hourly-icon"></img>
                      <div className=" fw-bold">{fiveDaysForecastData.list[0].main.temp.toString().slice(0, 4)}°C</div>
                    </div>

                    <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                      <img className="navigation-icon mt-2 " style={{ transform: `rotate(${fiveDaysForecastData.list[0].wind.deg}deg)` }} src={cursorNav} alt="cursor-icon" />
                      <div className="fw-bold pt-2 ">{fiveDaysForecastData.list[0].wind.speed}m/s</div>
                    </div>

                  </div>

                  <div className="d-flex flex-column flex-md-row flex-md-wrap col-6 col-sm-4 col-md-12  justify-content-around align-items-center pb-md-0 pb-lg-0 align-items-md-center p-0 text-center">

                    <div className="fs-5 fw-bold col-6 col-sm-4  col-md-12 col-lg-4">
                      {fiveDaysForecastData.list[1].dt_txt.slice(10, 16)}
                    </div>

                    <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                      <img className="hourly-icon" src={`http://openweathermap.org/img/wn/${fiveDaysForecastData.list[1].weather[0].icon}@4x.png`} alt="hourly-icon"></img>
                      <div className=" fw-bold">{fiveDaysForecastData.list[1].main.temp.toString().slice(0, 4)}°C</div>
                    </div>

                    <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                      <img className="navigation-icon mt-2 " style={{ transform: `rotate(${fiveDaysForecastData.list[1].wind.deg}deg)` }} src={cursorNav} alt="cursor-icon" />
                      <div className="fw-bold pt-2 ">{fiveDaysForecastData.list[1].wind.speed}m/s</div>
                    </div>

                  </div>

                  <div className=" d-sm-none border border-black my-3 w-75 border-1 col-12"></div>

                  <div className="d-flex flex-column flex-md-row flex-md-wrap col-6 col-sm-4 col-md-12  justify-content-around align-items-center pb-md-0 pb-lg-0 align-items-md-center p-0 text-center">

                    <div className="fs-5 fw-bold col-6 col-sm-4  col-md-12 col-lg-4">
                      {fiveDaysForecastData.list[2].dt_txt.slice(10, 16)}
                    </div>

                    <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                      <img className="hourly-icon" src={`http://openweathermap.org/img/wn/${fiveDaysForecastData.list[2].weather[0].icon}@4x.png`} alt="hourly-icon"></img>
                      <div className=" fw-bold">{fiveDaysForecastData.list[2].main.temp.toString().slice(0, 4)}°C</div>
                    </div>

                    <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                      <img className="navigation-icon mt-2 " style={{ transform: `rotate(${fiveDaysForecastData.list[2].wind.deg}deg)` }} src={cursorNav} alt="cursor-icon" />
                      <div className="fw-bold pt-2 ">{fiveDaysForecastData.list[2].wind.speed}m/s</div>
                    </div>

                  </div>

                  <div className=" d-none d-sm-block d-md-none border border-black my-3 w-75 border-1 col-12"></div>

                  <div className="d-flex flex-column flex-md-row flex-md-wrap col-6 col-sm-4 col-md-12  justify-content-around align-items-center pb-sm-2 pb-md-0 pb-lg-0 align-items-md-center p-0 text-center">

                    <div className="fs-5 fw-bold col-6 col-sm-4  col-md-12 col-lg-4">
                      {fiveDaysForecastData.list[3].dt_txt.slice(10, 16)}
                    </div>

                    <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                      <img className="hourly-icon" src={`http://openweathermap.org/img/wn/${fiveDaysForecastData.list[3].weather[0].icon}@4x.png`} alt="hourly-icon"></img>
                      <div className=" fw-bold">{fiveDaysForecastData.list[3].main.temp.toString().slice(0, 4)}°C</div>
                    </div>

                    <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                      <img className="navigation-icon mt-2 " style={{ transform: `rotate(${fiveDaysForecastData.list[3].wind.deg}deg)` }} src={cursorNav} alt="cursor-icon" />
                      <div className="fw-bold pt-2 ">{fiveDaysForecastData.list[3].wind.speed}m/s</div>
                    </div>

                  </div>

                  <div className=" d-sm-none border border-black my-3 w-75 border-1 col-12"></div>

                  <div className="d-flex flex-column flex-md-row flex-md-wrap col-6 col-sm-4 col-md-12  justify-content-around align-items-center pb-2 pb-md-0 pb-lg-0 align-items-md-center p-0 text-center">

                    <div className="fs-5 fw-bold col-6 col-sm-4  col-md-12 col-lg-4">
                      {fiveDaysForecastData.list[4].dt_txt.slice(10, 16)}
                    </div>

                    <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                      <img className="hourly-icon" src={`http://openweathermap.org/img/wn/${fiveDaysForecastData.list[4].weather[0].icon}@4x.png`} alt="hourly-icon"></img>
                      <div className=" fw-bold">{fiveDaysForecastData.list[4].main.temp.toString().slice(0, 4)}°C</div>
                    </div>

                    <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                      <img className="navigation-icon mt-2 " style={{ transform: `rotate(${fiveDaysForecastData.list[4].wind.deg}deg)` }} src={cursorNav} alt="cursor-icon" />
                      <div className="fw-bold pt-2 ">{fiveDaysForecastData.list[4].wind.speed}m/s</div>
                    </div>

                  </div>

                  <div className="d-flex flex-column d-md-none flex-md-row flex-md-wrap col-6 col-sm-4 col-md-12  justify-content-around align-items-center pb-2 pb-md-0 align-items-md-center p-0 text-center">

                    <div className="fs-5 fw-bold col-6 col-sm-4  col-md-12 col-lg-4">
                      {fiveDaysForecastData.list[5].dt_txt.slice(10, 16)}
                    </div>

                    <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                      <img className="hourly-icon" src={`http://openweathermap.org/img/wn/${fiveDaysForecastData.list[5].weather[0].icon}@4x.png`} alt="hourly-icon"></img>
                      <div className=" fw-bold">{fiveDaysForecastData.list[5].main.temp.toString().slice(0, 4)}°C</div>
                    </div>

                    <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                      <img className="navigation-icon mt-2 " style={{ transform: `rotate(${fiveDaysForecastData.list[5].wind.deg}deg)` }} src={cursorNav} alt="cursor-icon" />
                      <div className="fw-bold pt-2 ">{fiveDaysForecastData.list[5].wind.speed}m/s</div>
                    </div>

                  </div>

                </div>

              </div>

            </aside>

          </div>

        )}

      </div>

    </div>
  );
};
export default WeatherCountry;

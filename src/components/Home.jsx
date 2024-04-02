import { useEffect, useState } from "react";
import photoPlaceholder from "../assets/pexels-johannes-plenio-1118873.jpg"
import loadingGif from "../assets/gifLoading.gif"

const Home = () => {

  const pexelsAuth = process.env.REACT_APP_PEXELS_AUTH
  const openweathermapAppId = process.env.REACT_APP_OPEN_WEATHER_MAP_APP_ID

  const [photoLocations, setPhotoLocations] = useState(null)

  const countries = ["New York", "Parigi", "Melbourne", "Casablanca", "Oslo", "Tokyo", "Riga", "Londra", "Madrid", "Reykjavik", "Berlino", "Nairobi", "Bucarest", "Dublino", "Seoul", "Algeri", "Bangkok", "Ankara"]
  const [weatherForecast, setWeatherForecast] = useState(null)

  const [userPosition, setUserPosition] = useState(null)
  const [userWeather, setUserWeather] = useState(null)

  const [loadingRandomWeather, setLoadingRandomWeather] = useState(false)
  const [loadingLocalWeather, setLoadingLocalWeather] = useState(false)

  const [geolocationPermissionDenied, setGeolocationPermissionDenied] = useState(false)

  const getCoordinates = () => {

    if (navigator.geolocation) { // qui controlliamo se l'oggetto navigator del browser possiede la geolocalizzazione

      setLoadingLocalWeather(true)

      navigator.geolocation.getCurrentPosition((position) => { // qui controlliamo se l'utente ha abilitato la condivisione della posizione (primo parametro logica per il si, secondo per il no)

        setGeolocationPermissionDenied(false)
        console.log(position)

        setUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      }, authDenied
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const authDenied = () => {
    console.log("Permessi per la localizzazione non concessi")
    setGeolocationPermissionDenied(true)
  }

  const getUserWeather = () => {

    setLoadingLocalWeather(true)

    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + userPosition.latitude + "&lon=" + userPosition.longitude + `&units=metric&lang=it&appid=${openweathermapAppId}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return response.json()
            .then(errorData => { throw new Error(errorData.message) })
        }
      })
      .then(data => {
        setTimeout(() => {
          console.log(data)
          setUserWeather(data)
        }, 1500);
      })
      .catch(error => {
        setLoadingLocalWeather(false)
        console.log(error)
        alert(error)
      })
  }

  const getPhotoLocations = async () => {

    setLoadingLocalWeather(true)

    try {
      fetch("https://api.pexels.com/v1/search?query=" + userWeather.name + "&per_page=10", {
        headers: {
          "Authorization": `${pexelsAuth}`
        }
      })
        .then(response => {
          if (!response.ok) {
            return response.json()
              .then(errorData => { throw new Error(errorData.message) })

          }
          return response.json();
        })
        .then(data => {
          setTimeout(() => {
            setPhotoLocations(data);
            console.log("Dati delle foto ottenuti:", data);
            setLoadingLocalWeather(false)
          }, 1500);
        })

    } catch (error) {
      console.error("Si è verificato un errore:", error);
      alert(error);
      setLoadingLocalWeather(false)
    }
  };

  const getRandomWeatherForecasts = async () => {

    setWeatherForecast(null)
    setLoadingRandomWeather(true)

    try {

      const requests = countries.map(location => {
        return fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&lang=it&appid=a793bd006b5b59f0fb2f211b3e3cd738")
          .then(response => {
            if (response.ok) {
              return response.json()
            } else {
              return response.json()
                .then(errorData => { throw new Error(errorData.message) })
            }
          })
      })

      const weatherData = await Promise.all(requests)

      setTimeout(() => {
        setLoadingRandomWeather(false)
        setWeatherForecast(weatherData)
        console.log(weatherData)
      }, 1500);

    } catch (error) {
      setLoadingRandomWeather(false)
      alert(error)
      console.log(error)
    }
  };

  useEffect(() => {

    getCoordinates()

    getRandomWeatherForecasts()
  }, [])

  useEffect(() => {

    if (userPosition) {
      getUserWeather()
    }
  }, [userPosition])

  useEffect(() => {
    if (userWeather) {
      getPhotoLocations()
    }
  }, [userWeather])


  return (

    <div className="flex-grow-1">

      <div className="imgHome row mx-0 px-3 justify-content-center pt-5">

        <div className="col-12 col-lg-6 col-xxl-5 ps-3 pe-0">

          <h1 className="headings">Il tempo, in tempo reale!</h1>
          <div className="roller">
            <div id="rolltext" className="headings fs-3">
              <div id="drop-down">Quando vuoi</div>
              <div>Dove vuoi</div>
              <div>Qualsiasi dettaglio</div>
              <div>Qualsiasi zona</div>
            </div>
          </div>

        </div>

        <div className="row mx-0 justify-content-center  col-12 col-lg-6 col-xxl-7 px-0 pt-4 pt-sm-5 pt-lg-0">

          <div className="main-box mb-4">

            {loadingRandomWeather &&
              <div className="d-flex justify-content-center">
                <div className="loader"></div>
              </div>
            }

            {weatherForecast &&
              <div className="row justify-content-center px-0 mx-0 overflow-y-hidden weather-box">

                {weatherForecast.map(element => {

                  return <div className="col-6 col-sm-4 col-md-3 col-lg-4 col-xxl-3 p-2" key={element.id}>

                    <div className="bg-info bg-opacity-75 rounded-4 card-weather-style text-center py-3">
                      <h6 className="fw-bold">{element.name}</h6>

                      <div>
                        <img className="five-days-icon" src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@4x.png`} alt="" />
                      </div>

                      <div className="fw-bold">{element.main.temp}°C</div>

                    </div>

                  </div>
                })}
              </div>
            }
          </div>

        </div>

        <div className="mt-4">

          {geolocationPermissionDenied &&
            <div className="text-center">
              <div className="px-2 py-1 mx-auto col-12 col-md-11 col-lg-10 bg-black bg-opacity-50 text-white text-center rounded-4">
                Abilita la condivisione della posizione per vedere il meteo della tua zona!<br />
                Una volta attivata, premi il pulsante!
              </div>
              <div className="btn btn-success mt-2" onClick={() => { getCoordinates() }}>Cerca il mio meteo!</div>
            </div>
          }

          {!geolocationPermissionDenied &&

            <>

              <div className="text-center"><span className="fs-3 bg-dark text-white bg-opacity-50 px-3 rounded-5 py-1">Meteo locale <i className="bi bi-cursor-fill cursor-icon d-inline-block "></i></span></div>

              <div className="row justify-content-center align-items-center px-0 pt-3 pb-5 mx-0">

                {loadingLocalWeather &&
                  <div className="text-center">
                    <div className="fs-4 text-white bg-dark bg-opacity-50 rounded-4">Stiamo cercando la tua posizione!</div>
                    <img style={{ width: "180px" }} className=" rounded-circle mt-3" src={loadingGif} alt="loading-weather-spinner" />
                  </div>
                }

                {photoLocations &&

                  <>

                    <div className="col-10 col-sm-9 col-md-6 col-lg-6 col-xl-5 col-xxl-4 px-0 px-md-2 py-3 py-md-0 align-self-lg-stretch">

                      {userWeather &&
                        <div className="local-position-weather-card rounded-4 p-3 h-100">

                          <h5 className="text-center fw-bold">{userWeather.name} ({userWeather.sys.country})</h5>

                          <div className="row mx-0 align-items-center justify-content-center">
                            <img className="local-weather-icon px-3" src={`https://openweathermap.org/img/wn/${userWeather.weather[0].icon}@4x.png`} alt="" />
                            <div className="col-4 px-0 ps-sm-3 fw-bold fs-5">{userWeather.main.temp}°C</div>
                            <div className="col-12 fw-bold fs-4 text-center">{userWeather.weather[0].description}</div>

                            <div className="col-12 row mx-0 px-0 mt-2 mt-lg-3">

                              <div className="col-6 col-sm-3 col-md-6 col-lg-3 text-center px-0">
                                <i className="bi bi-water fs-2"></i>
                                <div className="fw-bold">{userWeather.main.humidity}%</div>
                                <div>Umidità</div>
                              </div>

                              <div className="col-6 col-sm-3 col-md-6 col-lg-3 text-center px-0">
                                <i className="bi bi-wind fs-2"></i>
                                <div className="fw-bold">{userWeather.wind.speed}m/s</div>
                                <div>Vel. vento</div>
                              </div>

                              <div className="col-6 col-sm-3 col-md-6 col-lg-3 text-center px-0 mt-3 mt-sm-0">
                                <i className="bi bi-thermometer-snow fs-2"></i>
                                <div className="fw-bold">{userWeather.main.temp_min}°C</div>
                                <div>Min °C</div>
                              </div>

                              <div className="col-6 col-sm-3 col-md-6 col-lg-3 text-center px-0 mt-3 mt-sm-0">
                                <i className="bi bi-thermometer-sun fs-2"></i>
                                <div className="fw-bold">{userWeather.main.temp_max}°C</div>
                                <div>Max °C</div>
                              </div>

                            </div>

                          </div>

                        </div>
                      }

                    </div>

                    <div className="col-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4 px-2">

                      {photoLocations.photos.length !== 0 &&
                        <h5 className="text-center d mb-3 bg-dark bg-opacity-50 text-white rounded-4 py-1">
                          Foto {userWeather.name}
                        </h5>
                      }
                      {photoLocations.photos.length === 0 &&
                        <h5 className="text-center mb-3 bg-dark bg-opacity-50 text-white rounded-4 py-1">
                          Non sono disponibili foto per la tua zona 😢
                        </h5>
                      }

                      <div id="carouselExampleCaptions" className="carousel slide carousel-settings rounded-4 px-0" data-bs-ride="carousel" data-bs-interval="5000">

                        <div className="carousel-inner rounded-4">

                          {photoLocations.photos.length !== 0 &&
                            photoLocations.photos.map((photo, i) => {
                              return <div className={i === 0 ? "carousel-item active" : "carousel-item"} key={i}>

                                <div>
                                  <img className="img-carousel rounded-4" src={photo.src.original} alt="..." />
                                </div>

                                <span className="carousel-caption d-none d-sm-block bg-black bg-opacity-50 p-1 mb-4 rounded-4 fw-bold ">
                                  {photo.alt}
                                </span>

                              </div>
                            })
                          }

                          {photoLocations.photos.length === 0 &&

                            <div className="carousel-item active">

                              <div>
                                <img className="img-carousel rounded-4" src={photoPlaceholder} alt="..." />
                              </div>

                              <span className="carousel-caption  bg-black bg-opacity-50 p-1 mb-4 rounded-4">
                                Qui, quando possibile, ci sarà un'anteprima del posto 🏞️
                              </span>

                            </div>

                          }

                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>

                    </div>

                  </>

                }

              </div>

            </>

          }

        </div>



      </div>

    </div>
  );
};
export default Home;

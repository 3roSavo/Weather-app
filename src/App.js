import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/MyNav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import WeatherCountry from "./components/WeatherCountry";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  // const [nameCity, setNameCity] = useState("");

  const latAndLon = (properties) => {
    setCoordinates(properties);
  };
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lon: 0,
  });

  return (
    <BrowserRouter>
      <MyNav latAndLon={latAndLon} />

      <Routes>
        <Route element={<Home />} path="/"></Route>
        <Route
          element={<WeatherCountry coordinates={coordinates} />}
          path="/weatherCountry"
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

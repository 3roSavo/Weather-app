import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/MyNav";
import Home from "./components/Home";
import WeatherCountry from "./components/WeatherCountry";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route element={<Home />} path="/"></Route>

        <Route element={<WeatherCountry />} path="/weatherCountry"></Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;

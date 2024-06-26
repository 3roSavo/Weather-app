import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/MyNav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import WeatherCountry from "./components/WeatherCountry";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>

        <MyNav />

        <Routes>

          <Route element={<Home />} path="/"></Route>

          <Route element={<WeatherCountry />} path="/weatherCountry"></Route>

        </Routes>

        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;

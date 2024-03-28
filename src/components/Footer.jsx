/* eslint-disable jsx-a11y/anchor-is-valid */
import logoWeather from "../assets/logo-weather.png";
const Footer = () => {
  return (
    <div className="bg-footer mt-3 w-100">
      <footer className="mx-3 my-3 row justify-content-center justify-content-lg-around align-items-center">
        <p className="col-sm-8 col-md-6 col-lg-4 text-light m-0 mb-3 mb-sm-0 p-0 text-center fw-bold">
          © {new Date().getFullYear()} What's the weather like, Inc
        </p>

        <a
          href="/"
          className=" col-2 col-md-1 row align-items-center justify-content-center m-0 p-0"
        >
          <img
            className="m-0 p-0 p-sm-1 p-md-0 p-xl-1 p-xxl-2 rounded-circle logo-image"
            style={{ width: "70%" }}
            src={logoWeather}
            alt="logo"
          ></img>
        </a>

        <ul className="nav col-9 col-md-10 col-lg-4 mt-md-2 p-0 justify-content-around justify-content-md-around">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light">
              About
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
export default Footer;

/* eslint-disable jsx-a11y/anchor-is-valid */
import logoWeather from "../assets/logo-weather.png";
const Footer = () => {
  return (
    <div className="bg-footer position-fixed bottom-0 w-100 border-top shadow-lg">
      <footer className="mx-3 d-flex flex-wrap justify-content-between align-items-center my-2">
        <p className="col-md-4 mb-0 text-muted">
          © 2023 What's the weather like, Inc
        </p>

        <a
          href="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <img
            className="mx-2"
            style={{ width: "35px" }}
            src={logoWeather}
            alt="logo"
          ></img>
        </a>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              About
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
export default Footer;

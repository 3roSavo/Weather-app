import { useState } from "react";
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MyNav = () => {

  const dispatch = useDispatch()

  const [nameCity, setNameCity] = useState("");

  const Coordinates = (e) => {

    e.preventDefault()

    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      nameCity.replace(/ /g, "%20") +
      "&limit=1&appid=a793bd006b5b59f0fb2f211b3e3cd738"
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

        dispatch({
          type: "CITY_COORDINATES",
          payload: {
            lat: obj[0].lat,
            lon: obj[0].lon
          }
        })

        navigate("/weatherCountry");
      })
      .catch((err) => {
        alert("Luogo con nome '" + nameCity + "' non trovato")
        console.log(err);
      });
  };

  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-nav shadow-lg">
      <Container fluid>
        <Navbar.Brand href="#">What's the weather like</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-link" id="home-button">
              Home
            </Link>
            <Nav.Link href="#action2">Link</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={Coordinates}>
            <Form.Control
              type="search"
              placeholder="Inserisci città"
              value={nameCity}
              onChange={(e) => setNameCity(e.target.value)}
              className="me-2"
              aria-label="Search"
              style={{ width: "250px" }}
            />
            <Button
              className="text-light border-light"
              variant="outline-success"
              onClick={Coordinates}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNav;

import { useState } from "react";
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MyNav = () => {

  const dispatch = useDispatch()

  const [nameCity, setNameCity] = useState("");

  const [navExpanded, setNavExpanded] = useState(false);

  const navigate = useNavigate();

  const Coordinates = (e) => {

    e.preventDefault()

    if (nameCity === "") {
      alert("Attenzione inserisci prima una città")
    } else {

      dispatch({
        type: "CITY_NAME",
        payload: nameCity
      })

      navigate("/weatherCountry")

      setNavExpanded(false);

    }
  };

  return (
    <Navbar expand="lg" expanded={navExpanded} className="bg-body-tertiary bg-nav shadow-lg">
      <Container fluid>
        <Navbar.Brand href="#">What's the weather like</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" onClick={() => setNavExpanded(!navExpanded)} />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-link" id="home-button" onClick={() => setNavExpanded(false)}>
              Home
            </Link>
            <Nav.Link target="blank" href="https://github.com/3roSavo/Weather-app.git">GitHub <i className="bi bi-github"></i></Nav.Link>
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
              Cerca
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNav;

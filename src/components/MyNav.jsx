import { useState } from "react";
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MyNav = () => {

  const dispatch = useDispatch()

  const [nameCity, setNameCity] = useState("");

  const navigate = useNavigate();

  const Coordinates = (e) => {

    e.preventDefault()

    dispatch({
      type: "CITY_NAME",
      payload: nameCity
    })

  };

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

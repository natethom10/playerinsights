import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";

const Navigation = ({ setStep, league, setLeague }) => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid className="d-flex">
          <div className="d-flex">
            <Navbar.Brand onClick={() => setStep("home")} className="homepage-name">
              PlayerInsights
            </Navbar.Brand>
            <Dropdown>
              <Dropdown.Toggle>{league !== "League" ? league.toUpperCase() : league}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setLeague("nba")}>
                  NBA
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setLeague("mlb")}>
                  MLB
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Nav>
            <Nav.Link onClick={() => setStep("recents")}>Recents</Nav.Link>
            <Nav.Link onClick={() => setStep("lines")}>Lines</Nav.Link>
            <Nav.Link onClick={() => setStep("builder")}>Builder</Nav.Link>
            <Nav.Link onClick={() => setStep("login")}>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;

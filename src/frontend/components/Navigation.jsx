import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ league, setLeague }) => {
  const navigate = useNavigate();

  const handleLeagueChange = (newLeague) => {
    setLeague(newLeague);
    navigate(`${newLeague}/lines`);
  };
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid className="d-flex">
          <div className="d-flex">
            <Navbar.Brand className="homepage-name">
              <Link to="/" className="text-decoration-none text-white">PlayerInsights</Link>
            </Navbar.Brand>
            <Dropdown>
              <Dropdown.Toggle>
                {league !== "League" ? league.toUpperCase() : league}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleLeagueChange("nba")}>
                  NBA
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleLeagueChange("mlb")}>
                  MLB
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Nav>
            <Nav.Link as={Link} to={`/${league}/recents`}>
              Recents
            </Nav.Link>
            <Nav.Link as={Link} to={`/${league}/lines`}>
              Lines
            </Nav.Link>
            <Nav.Link as={Link} to="/builder">
              Builder
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;

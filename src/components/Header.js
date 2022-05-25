import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="sm"
        className="navbar-costum  border-bottom box-shadow"
        variant="light"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className=" justify-content-end"
          >
            <Nav>            
              <Nav.Link href="/" exact className="nav-color">
                LibraryItems
              </Nav.Link>
              <Nav.Link as={Link} to="/add-item">
                Create Library Item
              </Nav.Link>
              <Nav.Link as={Link} to="/categories">
                Categories
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

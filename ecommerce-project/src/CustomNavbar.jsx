import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

// took this nav bar from react-bootstrap site, added the links/pages I needed
function CustomNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Shop 'til you Drop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Product List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/customers">
              <Nav.Link>Our Members</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add-customer">
              <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/place-order">
              <Nav.Link>Shop NOW</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/order-lookup">
              <Nav.Link>Track Order</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;

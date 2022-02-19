import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const navbar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav>
          <Nav.Link href="/projects"><h4>Projects</h4></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default navbar;
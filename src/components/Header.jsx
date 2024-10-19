import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({insideHome}) => {
  return (
    <Navbar className="bg-primary fixed-top w-100  " style={{ height: '70px' }}>
      <Container>
        <Navbar.Brand>
          <Link
            style={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: '800',
              fontFamily: '"Oswald", system-ui'
            }}
            to={"/"}
          >
            <i className="fa-solid fa-car me-2"></i>
            Employee Management App
          </Link>
        </Navbar.Brand>
        {
          insideHome && 
          <Nav className="ms-auto">
          <Link className="text-white me-4" to={'/add'}>Add Employee</Link>
        </Nav>
        }
      </Container>
    </Navbar>
  );
};

export default Header;

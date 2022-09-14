import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.css';
import {Link} from "react-router-dom";

export default function NavBar() {
    return (
        <Navbar style={{paddingTop: '50px'}} expand="lg">
        <Container>
        <Navbar.Brand href="/">Laura García Hernández</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Link to="/portfolio/about" className="nav-link">Sobre mí</Link>
            <Link to="/portfolio/contact" className="nav-link">Contacto</Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                Separated link
                </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

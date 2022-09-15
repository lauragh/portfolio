import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.css';
import {Link} from "react-router-dom";

export default function NavBar(props) {
    return (
        <Navbar id={props.id} style={{paddingTop: '50px'}} expand="lg">
            <Container>
            <Navbar.Brand className={props.id === "light" ? "darkColorText" : "lightColorText"} href="/portfolio">Laura García Hernández</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <NavDropdown className={props.id === "light" ? "darkColorText" : "lightColorText"}  title="Proyectos" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/portfolio/projects/mobbler">Mobbler</NavDropdown.Item>
                    {/* <NavDropdown.Divider /> */}
                    <NavDropdown.Item href="#action/3.4">Rain of</NavDropdown.Item>
                </NavDropdown>
                <Link to="/portfolio/about" className={props.id === "light" ? "darkColorText nav-link " : "lightColorText nav-link"}>Sobre mí</Link>
                <Link to="/portfolio/contact" className={props.id === "light" ? "darkColorText nav-link " : "lightColorText nav-link"}>Contacto</Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

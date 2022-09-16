import {React, createContext, useState} from 'react';
import About from './About';
import Contact from './Contact';
import Mobbler from './Mobbler';
import NotFoundPage from './NotFoundPage';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";
export const ThemeContext = createContext(null);

export default function App() {
    const [theme, setTheme] = useState("dark");
    
    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    };

    console.log(theme);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <BrowserRouter>
                <Navbar id={theme} style={{paddingTop: '50px'}} expand="lg">
                <Container>
                <Navbar.Brand className={theme === "light" ? "darkColorText" : "lightColorText"} href="/portfolio">Laura García Hernández</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <NavDropdown className={theme === "light" ? "darkColorText" : "lightColorText"}  title="Proyectos" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/portfolio/projects/mobbler">Mobbler</NavDropdown.Item>
                        {/* <NavDropdown.Divider /> */}
                        <NavDropdown.Item href="#action/3.4">Rain of</NavDropdown.Item>
                    </NavDropdown>
                    <Link to="/portfolio/about" className={theme === "light" ? "darkColorText nav-link " : "lightColorText nav-link"}>Sobre mí</Link>
                    <Link to="/portfolio/contact" className={theme === "light" ? "darkColorText nav-link " : "lightColorText nav-link"}>Contacto</Link>
                    <div className="iconsNavBar">
                        <div onClick={toggleTheme}  className={theme === "dark" ? "switchButtonDark" : "switchButtonLight"}>
                            {theme==="dark" ? 
                            <div className="switchButtonLeft">
                                <div className="moon"></div>
                                <div className="stars"></div>
                                <div className="four-pointed-star"></div>
                            </div>
                            :
                            <div className="switchButtonRight"></div>}
                        </div>
                        <img alt="idioma" class="icon" src={require("../assets/globo.png")}/>
                    </div>
                    </Nav>
                </Navbar.Collapse>
                </Container>
                </Navbar>
                   
                    <Routes>
                        <Route path="/portfolio" />
                        <Route path="/portfolio/projects/mobbler"  element={<Mobbler/>}/>
                        <Route path="/portfolio/about"  element={<About/>}/>
                        <Route path="/portfolio/contact"  element={<Contact/>}/>
                        <Route path="*"  element={<NotFoundPage/>}/>
                    </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
      
    );
  }

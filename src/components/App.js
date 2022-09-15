import {React, createContext, useState} from 'react';
import NavBar from '../shared/components/NavBar';
import About from './About';
import Contact from './Contact';
import Mobbler from './Mobbler';
import NotFoundPage from './NotFoundPage';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

export const ThemeContext = createContext(null);

function App() {
    const [theme, setTheme] = useState("dark");
    
    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <BrowserRouter>
                    <NavBar id={theme} />
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

export default App;
import React from 'react';
import NavBar from '../shared/components/NavBar';
import About from './About';
import Contact from './Contact';
import NotFoundPage from './NotFoundPage';

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path="/portfolio" />
            <Route path="/portfolio/about"  element={<About/>}/>
            <Route path="/portfolio/contact"  element={<Contact/>}/>
            <Route path="*"  element={<NotFoundPage/>}/>

        </Routes>
        </BrowserRouter>
    );
  }

export default App;
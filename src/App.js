import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import Header from './pages/Header';
import Gallery from './pages/Gallery';
import MonthImgs from './pages/MonthImgs';
import './App.scss';

function App() {
    return (
        <Router>
            <div><Header /></div>
            <Routes>
                <Route path='/' element={<Gallery storageURL={process.env.REACT_APP_AZURE_URL} />} />
                <Route path='/month/:shortname' element={<MonthImgs />} />
            </Routes>
        </Router>
    );
}

export default App;
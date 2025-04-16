import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './componant/Home';
import FormPage from './componant/FormPage';
import './App.css'

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="nav">
          <Link to="/">HOME</Link>
          <Link to="/form">FORM</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


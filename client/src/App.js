/* App.js */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sender from './components/Sender';
import Receiver from './components/Receiver';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>🔐 Secure Chat App</h1>
        <nav>
          <Link to="/sender">Sender</Link> | <Link to="/receiver">Receiver</Link>
        </nav>
        <Routes>
          <Route path="/sender" element={<Sender />} />
          <Route path="/receiver" element={<Receiver />} />
          <Route path="/" element={<div style={{ textAlign: 'center' }}><p>Select Sender or Receiver</p></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
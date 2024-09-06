import React from 'react';
import './App.css';
import Home from '../src/pages/Home';
import Sidebar from './pages/Sidebar';

import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
      <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


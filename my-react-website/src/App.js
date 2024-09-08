import React from 'react';
import './App.css';
import Home from '../src/pages/Home';
import Sidebar from './pages/Sidebar';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';

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

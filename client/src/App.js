// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sidebar from './Sidebar';
import Login from './Login';
import SearchResult from './SearchResult';

const App = () => {
  return (
    <Router>
      <div className="app-container"> {/* Add a container for positioning */}
        <Sidebar />
        <div className="content-container"> {/* Container for routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/profile" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
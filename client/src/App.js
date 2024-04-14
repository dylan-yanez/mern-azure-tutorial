// App.js
import React from 'react';
import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sidebar from './Sidebar';
import Login from './Login';
import NewUser from './NewUser';
import SearchResult from './SearchResult';

const App = () => {
  const [showNewUser, setShowNewUser] = useState(false);

  const handleSignUp = () => {
    setShowNewUser(true);
  };

  return (
    <Router>
      <div className="app-container"> {/* Add a container for positioning */}
        <Sidebar />
        <div className="content-container"> {/* Container for routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/profile" element={showNewUser ? <NewUser /> : <Login onSignUp={handleSignUp} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
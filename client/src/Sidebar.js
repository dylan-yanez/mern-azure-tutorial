import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo">
        <Link to="/">
          <img src="logo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/playlists">
            Playlists
          </Link>
        </li>
        <li>
          <Link to="/likedsongs">
            Liked Songs
          </Link>
        </li>
        <li>
          <Link to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/settings">
            Settings
          </Link>
        </li>
      </ul>
      <button className="collapse-button" onClick={toggleSidebar}>
        {collapsed ? '<' : '>'}
      </button>
    </div>
  );
};

export default Sidebar;

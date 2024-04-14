import React, { useState } from 'react';
import './NewUser.css';

const NewUser = ({ onSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    onSignUp(username, password);
  };

  return (
    <div className='new-user-wrapper'>
        <div className="new-user-container">
        <h2>Create New Account</h2>
        <form onSubmit={handleSignUp}>
            <div className="form-group">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div className="form-group">
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit">Sign Up</button>
        </form>
        </div>
    </div>
  );
};

export default NewUser;

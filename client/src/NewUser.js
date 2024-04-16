import React, { useState } from 'react';
import bcrypt from 'bcryptjs'; // Import bcrypt library
import './NewUser.css'; // Import the CSS file for styling

const NewUser = ({ onSignUp }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Pass hashed password to onSignUp function
    onSignUp({ firstname, lastname, email, username, password: hashedPassword });
  };

  return (
    <div className='new-user-wrapper'>
      <div className="new-user-container">
        <h2>Create New Account</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/save', {
        username,
        password,
      });
  
      if (response.status === 200) {
        onRegister(response.data.user);
        navigate('/login');
      } else {
        console.error('Error registering user:', response.data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleRegister}>Register</button>
      
      {/* Link to go back to the login page */}
      <p>Already have an account? <Link to="/login">Back to Login</Link></p>
    </div>
  );
};

export default Register;

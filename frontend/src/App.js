import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ContactList from './components/ContactList';

const App = () => {
  const [user, setUser] = useState(null);

  const handleRegister = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        {user ? (
          <Route path="/contacts" element={<ContactList />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;

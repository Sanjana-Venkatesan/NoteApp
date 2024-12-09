import React from 'react';
import './mystyles.css'; 

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div>
        <input
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </div>
      <div>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button className="login-button" type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
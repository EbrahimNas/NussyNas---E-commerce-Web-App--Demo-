import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../services/auth";
import { Link } from "react-router-dom";

const Login = ({style, redirectPath = "/"}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);
      setEmail("");
      setPassword("");
      navigate(redirectPath);
    } catch (error) {
      setError(error.message);
    }
  };

  return (

    <div className={style}>
        <form onSubmit={handleLogin} className={style}>
          <label htmlFor="emailInput">Email:</label>
           <input
             type="email"
             placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />
      
          <label htmlFor="password">Password:</label>
           <input
             type="password"
             placeholder="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
          <Link to="/loginReset">Forgot Password?</Link>
        </form>
    </div>
  );
};

export default Login;

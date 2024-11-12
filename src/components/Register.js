import React, { useState } from "react";
import { registerUser } from "../services/auth";
import { useNavigate } from 'react-router-dom';

const Register = ({ style }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userData = { firstName, lastName, email };
      await registerUser(email, password, userData);

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      navigate('/access');
    } catch (error) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style}>
      
      <form onSubmit={handleRegister} className={style}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div
            onClick={togglePasswordVisibility}
            style={{ right: "8px", cursor: "pointer", position: 'absolute' }}
            >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#000"
                viewBox="0 0 512 512"
                >
                <path fillRule="evenodd" d="M47.0849493,2.84217094e-14 L185.740632,138.655563 C194.095501,134.657276 203.45297,132.418278 213.333333,132.418278 C248.679253,132.418278 277.333333,161.072358 277.333333,196.418278 C277.333333,206.299034 275.094157,215.656855 271.095572,224.011976 L409.751616,362.666662 L379.581717,392.836561 L320.374817,333.628896 C291.246618,353.329494 255.728838,367.084945 213.333333,367.084945 C64,367.084945 7.10542736e-15,196.418278 7.10542736e-15,196.418278 C7.10542736e-15,196.418278 22.862032,135.452859 73.1408088,86.3974274 L16.9150553,30.169894 L47.0849493,2.84217094e-14 Z M103.440016,116.694904 C74.7091717,144.512844 55.9626236,177.598744 46.7136,196.424891 C64.7370667,233.114811 119.071573,324.418278 213.333333,324.418278 C242.440012,324.418278 267.739844,315.712374 289.339919,302.595012 L240.926035,254.180993 C232.571166,258.17928 223.213696,260.418278 213.333333,260.418278 C177.987413,260.418278 149.333333,231.764198 149.333333,196.418278 C149.333333,186.537915 151.572331,177.180445 155.570618,168.825577 Z M213.333333,25.7516113 C362.666667,25.7516113 426.666667,196.418278 426.666667,196.418278 C426.666667,196.418278 412.428071,234.387867 381.712212,274.508373 L351.151213,243.941206 C364.581948,225.697449 374.142733,208.239347 379.954347,196.410385 C361.9296,159.721745 307.595093,68.418278 213.333333,68.418278 C201.495833,68.418278 190.287983,69.858232 179.702584,72.449263 L145.662385,38.4000762 C165.913597,30.494948 188.437631,25.7516113 213.333333,25.7516113 Z" transform="translate(42.667 59.582)"/>
              </svg>
             ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#000"
                viewBox="0 0 302.623 302.623"
                >
                <path d="M148.185,78.801c-88.048,0-144.647,69.607-147.013,72.579c-1.682,2.114-1.54,5.14,0.334,7.076 c41.827,43.37,89.258,65.365,140.992,65.365c87.583,0,155.568-62.5,158.423-65.167c1.083-1.013,1.691-2.415,1.701-3.895 c0.011-1.486-0.576-2.896-1.648-3.92C251.237,103.045,199.829,78.801,148.185,78.801z M142.487,213.081 c-47.292,0-90.941-19.706-129.805-58.573c12.746-14.097,63.71-64.948,135.503-64.948c47.312,0,94.753,21.862,141.068,65.002 C273.106,168.02,213.777,213.081,142.487,213.081z" />
                <path d="M110.218,152.691c0,22.656,18.434,41.094,41.095,41.094c22.658,0,41.088-18.438,41.088-41.094 s-18.431-41.095-41.088-41.095C128.658,111.602,110.218,130.035,110.218,152.691z" />
              </svg>
            )}
          </div>
        </div>

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          <div
            onClick={togglePasswordVisibility}
            style={{ right: "8px", cursor: "pointer", position: 'absolute' }}
            >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#000"
                viewBox="0 0 512 512"
                >
                <path fillRule="evenodd" d="M47.0849493,2.84217094e-14 L185.740632,138.655563 C194.095501,134.657276 203.45297,132.418278 213.333333,132.418278 C248.679253,132.418278 277.333333,161.072358 277.333333,196.418278 C277.333333,206.299034 275.094157,215.656855 271.095572,224.011976 L409.751616,362.666662 L379.581717,392.836561 L320.374817,333.628896 C291.246618,353.329494 255.728838,367.084945 213.333333,367.084945 C64,367.084945 7.10542736e-15,196.418278 7.10542736e-15,196.418278 C7.10542736e-15,196.418278 22.862032,135.452859 73.1408088,86.3974274 L16.9150553,30.169894 L47.0849493,2.84217094e-14 Z M103.440016,116.694904 C74.7091717,144.512844 55.9626236,177.598744 46.7136,196.424891 C64.7370667,233.114811 119.071573,324.418278 213.333333,324.418278 C242.440012,324.418278 267.739844,315.712374 289.339919,302.595012 L240.926035,254.180993 C232.571166,258.17928 223.213696,260.418278 213.333333,260.418278 C177.987413,260.418278 149.333333,231.764198 149.333333,196.418278 C149.333333,186.537915 151.572331,177.180445 155.570618,168.825577 Z M213.333333,25.7516113 C362.666667,25.7516113 426.666667,196.418278 426.666667,196.418278 C426.666667,196.418278 412.428071,234.387867 381.712212,274.508373 L351.151213,243.941206 C364.581948,225.697449 374.142733,208.239347 379.954347,196.410385 C361.9296,159.721745 307.595093,68.418278 213.333333,68.418278 C201.495833,68.418278 190.287983,69.858232 179.702584,72.449263 L145.662385,38.4000762 C165.913597,30.494948 188.437631,25.7516113 213.333333,25.7516113 Z" transform="translate(42.667 59.582)"/>
              </svg>
             ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#000"
                viewBox="0 0 302.623 302.623"
                >
                <path d="M148.185,78.801c-88.048,0-144.647,69.607-147.013,72.579c-1.682,2.114-1.54,5.14,0.334,7.076 c41.827,43.37,89.258,65.365,140.992,65.365c87.583,0,155.568-62.5,158.423-65.167c1.083-1.013,1.691-2.415,1.701-3.895 c0.011-1.486-0.576-2.896-1.648-3.92C251.237,103.045,199.829,78.801,148.185,78.801z M142.487,213.081 c-47.292,0-90.941-19.706-129.805-58.573c12.746-14.097,63.71-64.948,135.503-64.948c47.312,0,94.753,21.862,141.068,65.002 C273.106,168.02,213.777,213.081,142.487,213.081z" />
                <path d="M110.218,152.691c0,22.656,18.434,41.094,41.095,41.094c22.658,0,41.088-18.438,41.088-41.094 s-18.431-41.095-41.088-41.095C128.658,111.602,110.218,130.035,110.218,152.691z" />
              </svg>
            )}
          </div>
        </div>

        <button type="submit">Register</button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;

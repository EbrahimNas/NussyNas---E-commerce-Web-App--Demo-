import React, { useState } from 'react';
import { requestPasswordReset } from '../services/auth';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/LoginReset.module.css";

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const response = await requestPasswordReset(email);
    setMessage(response.message);
    navigate('/')
  };

  return (
    <div>
        <div className={styles.reset}>
          <div className={styles.resetContainer}>
              <Link to="/"><img src='/otherResources/images/NussyXnas-brand-logoBX.png' alt='NussyNas logo'/></Link>

              <div className={styles.pageTitle}>
                    <h2> ≫ Reset Your Password ≪ </h2>
                </div>

              <form onSubmit={handlePasswordReset} className={styles.resetForm}>
                  <label>Enter your email address:</label>
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                   />
        
                   <button type="submit">Send Password Reset Email</button>
               </form>
               {message && <p>{message}</p>}
          </div>
        </div>
    </div>
  );
};

export default PasswordReset;


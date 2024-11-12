import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";
import { signInWithGoogle } from '../services/auth.js';
import styles from "../CSS/Access.module.css";

const Access = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialForm = queryParams.get("form") || "login";
  const redirectPath = queryParams.get("redirect") || "/";
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(initialForm === "login");

  useEffect(() => {
    setIsLogin(initialForm === "login");
  }, [initialForm]);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result?.errorCode) {
      console.error("Google Sign-In Error:", result.errorMessage);
      alert("Failed to sign in with Google. Please try again.");
    } else {
      console.log("Signed in with Google successfully:", result);
      navigate('/')
    }
};

  return (
    <div>

        <div className={styles.access}>
            <div className={styles.accessContainer}>

              <Link to="/"><img src='/otherResources/images/NussyXnas-brand-logoBX.png' alt='NussyNas logo'/></Link>

              {isLogin ? (
                <>
                  <div className={styles.accessContainerm}>
                      <div className={styles.pageTitle}>
                         <h2> ≫ Sign In ≪ </h2>
                      </div>

                      <Login style={styles.accessForm} redirectPath={redirectPath}/>

                      <div className={styles.ask}>
                         <p>Don't have an account?{" "}</p>
                         <button onClick={toggleForm}>Join</button>
                      </div>
                  </div>
                 
                </>
               ) : (
                <>

                  <div className={styles.accessContainerm}>
                      <div className={styles.pageTitle}>
                         <h2> ≫ Join Us ≪ </h2>
                      </div>

                      <Register style={styles.accessForm}/>

                     <div className={styles.ask}>
                         <p>Already have an account?{" "}</p>
                         <button onClick={toggleForm}>Sign In</button>
                     </div>
                  </div>
                 
                </>
              )}

              <div className={styles.googleButton}>
                <p>or</p>
                <p>Sign in / join with Google</p>
                <button onClick={handleGoogleSignIn}>
                  <img src='/otherResources/images/google-logo.png' alt='google logo'/>
                </button>
              </div>
            </div>

        </div>

    
    </div>
  );
};

export default Access;

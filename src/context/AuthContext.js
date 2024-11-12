import React, { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserData } from "../services/userService.js";
import { loginUser, logoutUser } from "../services/auth.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const userData = await fetchUserData(user.uid);
        setCurrentUser({ ...user, ...userData });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const user = await loginUser(email, password);
      const userData = await fetchUserData(user.uid);
      setCurrentUser({ ...user, ...userData });
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
export default AuthProvider;

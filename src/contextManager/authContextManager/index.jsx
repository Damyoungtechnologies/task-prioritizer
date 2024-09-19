import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthenticationProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const cleanup = onAuthStateChanged(auth, handleUserChange);
    return cleanup;
  }, []);

  async function handleUserChange(userInfo) {
    if (userInfo) {
      setUser({ ...userInfo });
      setLoggedIn(true);
    } else {
      setUser(null);
      setLoggedIn(false);
    }

    setIsDataLoading(false);
  }

  const contextValue = {
    loggedIn,
    user,
    isDataLoading,
    setUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!isDataLoading && children}
    </AuthContext.Provider>
  );
}

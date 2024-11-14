// import React, { createContext, useContext, useState, useEffect } from "react";
// import { auth } from "../../Firebase/firebase";
// import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

// const AuthContext = React.createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthenticationProvider({ children }) {
//   const [user, setUser] = useState(null); // Tracks the user object
//   const [loggedIn, setLoggedIn] = useState(false); // Tracks login state (true/false)
//   const [isDataLoading, setIsDataLoading] = useState(true); // Tracks whether data is loading

//   useEffect(() => {
//     // Listen for Firebase auth state changes
//     const unsubscribe = onAuthStateChanged(auth, (userInfo) => {
//       handleUserChange(userInfo); // Call handleUserChange when auth state changes
//     });

//     // Cleanup the listener on unmount
//     return unsubscribe;
//   }, []);

//   // Function to handle user change and update state
//   function handleUserChange(userInfo) {
//     if (userInfo) {
//       console.log("User is authenticated:", userInfo);  // Debugging line
//       setUser(userInfo);  // Set the user object
//       setLoggedIn(true);  // Set loggedIn to true when user is authenticated
//     } else {
//       console.log("No user found or user signed out"); // Debugging line
//       setUser(null);  // Reset the user object if no one is logged in
//       setLoggedIn(false);  // Set loggedIn to false when user is not authenticated
//     }

//     setIsDataLoading(false); // Set loading to false when auth state is determined
//   }

//   // Value provided to context consumers (e.g., components)
//   const contextValue = {
//     loggedIn,  // Boolean: is the user logged in or not
//     user,  // The current user object
//     isDataLoading,  // Boolean: whether data (auth state) is still loading
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {!isDataLoading && children}  {/* Only render children when auth state is loaded */}
//     </AuthContext.Provider>
//   );
// }

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../Firebase/firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

// Create the AuthContext
const AuthContext = createContext();

// AuthenticationProvider component
export function AuthenticationProvider({ children }) {
  const [user, setUser] = useState(null); // Tracks the user object
  const [loggedIn, setLoggedIn] = useState(false); // Tracks login state (true/false)
  const [isDataLoading, setIsDataLoading] = useState(true); // Tracks whether data is loading

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (userInfo) => {
      handleUserChange(userInfo); // Call handleUserChange when auth state changes
    });

    // Cleanup the listener on unmount
    return unsubscribe;
  }, []);

  // Function to handle user change and update state
  function handleUserChange(userInfo) {
    if (userInfo) {
      console.log("User is authenticated:", userInfo);  // Debugging line
      setUser(userInfo);  // Set the user object
      setLoggedIn(true);  // Set loggedIn to true when user is authenticated
    } else {
      console.log("No user found or user signed out"); // Debugging line
      setUser(null);  // Reset the user object if no one is logged in
      setLoggedIn(false);  // Set loggedIn to false when user is not authenticated
    }

    setIsDataLoading(false); // Set loading to false when auth state is determined
  }

  // Function to register a new user
  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Do not update the user or loggedIn state here
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  // Value provided to context consumers (e.g., components)
  const contextValue = {
    loggedIn,  // Boolean: is the user logged in or not
    user,  // The current user object
    isDataLoading,  // Boolean: whether data (auth state) is still loading
    register,  // Function to register a new user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!isDataLoading && children}  {/* Only render children when auth state is loaded */}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
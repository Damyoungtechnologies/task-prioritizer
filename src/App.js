import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom"; // Import BrowserRouter and useLocation
import { AuthenticationProvider } from "./contextManager/authContextManager";
import { useRoutes } from "react-router-dom";
import './App.css';
import { GetStarted, SignInPage, Register, Homepage, NavigationBar } from "./components";

// Create a separate component for Routes
function AppRoutes() {
  const appRoutes = [
    {
      path: "*", // This will match all undefined paths
      element: <GetStarted />,
    },
    {
      path: "/Login",
      element: <SignInPage />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
    {
      path: "/Homepage",
      element: <Homepage />,
    },
  ];

  return useRoutes(appRoutes);
}

function Layout() {
  const location = useLocation();

  // Conditionally show the NavigationBar only if the route is NOT GetStarted
  const hideNavbarOnPaths = ["/", "/GetStarted"];
  const shouldShowNavbar = !hideNavbarOnPaths.includes(location.pathname);

  return (
    <div className="App">
      {/* Conditionally render the NavigationBar based on the current route */}
      {shouldShowNavbar && <NavigationBar />}

      <div className="app-container">
        <AppRoutes />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;

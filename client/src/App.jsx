import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import NotSignin from "./pages/NotSignin";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/errorlogin" element={<NotSignin />} />
        <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />

        </Route>
      </Routes>
    </BrowserRouter>
    /*
    <BrowserRouter>
      
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Routes>
                <Route
                  path="/sign-in"
                  element={
                    <>
                      <Signin />
                    </>
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    <>
                      <Signup />
                    </>
                  }
                />
                <Route
                  path="/"
                  element={
                    <>
                      <Header />
                      <Home />
                    </>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <>
                      <Header />
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    </>
                  }
                />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
    */
  );
}

export default App;

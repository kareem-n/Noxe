import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Home from "./components/Home/Home";
import Movies from "./components/Movies/Movies";
import Tv from "./components/Tv/Tv";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Moviedetail from "./components/Moviedetail/Moviedetail";
import Tvdetail from "./components/tvDetail/TvDetail";
import Popular from "./components/People/Popular";
import Persondetail from "./components/persondetail/Persondetail";

export default function App() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  function userDataTokenDecode() {
    const token = localStorage.getItem("userToken");
    const decode = jwtDecode(token);
    setUser(decode);
  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      userDataTokenDecode();
    }
  }, []);

  function logOut() {
    setUser(null);
    localStorage.removeItem("userToken");
    nav("/login");
  }

  // kobry 3la ... ?
  function ProtectedRoute(props) {
    if (localStorage.getItem("userToken") === null) {
      return <Navigate to={"/login"} />;
    } else {
      return props.children;
    }
  }
  return (
    <>
      <Navbar logout={logOut} userState={user} />
      <div className="container py-5">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {" "}
                <Home />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="home"
            element={
              <ProtectedRoute>
                {" "}
                <Home />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="movies"
            element={
              <ProtectedRoute>
                {" "}
                <Movies />{" "}
              </ProtectedRoute>
            }
          />

          <Route path={"moviedetail"}>
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  {" "}
                  <Moviedetail />{" "}
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path={"tvdetail"}>
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  {" "}
                  <Tvdetail />{" "}
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="tv"
            element={
              <ProtectedRoute>
                {" "}
                <Tv />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="people"
            element={
              <ProtectedRoute>
                {" "}
                <Popular />{" "}
              </ProtectedRoute>
            }
          />

          <Route path={"persondetail"}>
            <Route
              path=":name/:id"
              element={
                <ProtectedRoute>
                  {" "}
                  <Persondetail />{" "}
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="about"
            element={
              <ProtectedRoute>
                {" "}
                <About />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login token={userDataTokenDecode} />} />
          <Route path="register" element={<Register />} />
          <Route
            path="*"
            element={
              <>
                <h1>ERROR 404</h1>
                <h3>Page not found</h3>
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  window.addEventListener("scroll", function () {
    let top = $(window).scrollTop();
    if (top > 100) {
      $(".navbar").css("backgroundColor", "rgba(0, 0, 0 ,0.9)");
    } else {
      $(".navbar").css("backgroundColor", "rgba(0, 0, 0 ,0.7)");
    }
  });

  return (
    <>
      <nav className="navbar fixed-top shadow-lg navbar-expand-lg navbar-dark">
        <div className="container-fluid px-5">
          <Link className="navbar-brand me-4" to={"/"}>
            NOXE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {props.userState === null ? (
              ""
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"home"}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"movies"}>
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"tv"}>
                    TV Show
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"people"}>
                    People
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"about"}>
                    About
                  </Link>
                </li>
              </ul>
            )}

            <ul className="navbar-nav d-flex ms-auto mb-2 mb-lg-0">
              <li className="nav-item order-lg-first order-last d-flex align-items-center">
                <i className="fa-brands me-2 me-lg-0 nav-link fa-facebook"></i>
                <i className="fa-brands me-2 me-lg-0 nav-link fa-youtube"></i>
                <i className="fa-brands me-2 me-lg-0 nav-link fa-twitter"></i>
                <i className="fa-brands me-2 me-lg-0 nav-link fa-instagram"></i>
              </li>

              {props.userState === null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"login"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"register"}>
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <span onClick={props.logout} id="logout" className="nav-link">
                    logout
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

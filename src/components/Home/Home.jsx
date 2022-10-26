import React from "react";
import { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [preson, setPreson] = useState([]);

  async function getApi(type, callBack) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=ee3d9c0552ad42f229b5ca281a29f904`
    );
    data.results = data.results.slice(0, 15);
    if (type === "person") {
      filterdata(data.results);
    } else {
      callBack(data.results);
    }
  }
  useEffect(() => {
    setPaddingTop();
    getApi("movie", setMovies);
    getApi("tv", setTv);
    getApi("person", setPreson);
  }, []);

  useEffect(() => {
    if (movies === null && tv === null && preson === null) {
      return;
    } else {
      $("img").addClass("rounded-3");
    }
  }, [movies, tv, preson]);

  function filterdata(array) {
    let filterd = array.filter((xx) => xx.profile_path);
    setPreson(filterd);
  }

  function setPaddingTop() {
    const height = $(".navbar").innerHeight();
    $("#home").css("marginTop", height);
  }
  return (
    <>
      <div id="home" className="container-fluid px-5 pt-5">
        {movies ? (
          <div className="row gy-3 justify-content-center">
            <div className="col-md-4 col-lg-6">
              <div className="h-100 rounded-3 bg-lighted d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <h1>The Movie DB</h1>
                  <p className="h4">Trending Movies Right Now</p>
                </div>
              </div>
            </div>
            {movies.map((movie, i) => (
              <div key={i} className="col-md-4 col-lg-3 col-xxl-2">
                <Link to={`/moviedetail/${movie.id}`}>
                  <div className="position-relative">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/w500` + movie.poster_path
                      }
                      className="w-100"
                      alt=""
                    />
                    <h3 className="h4 py-2 text-center">
                      {movie.title} <br />{" "}
                      <span className="lead text-muted">
                        ({movie.release_date.substr(0, 4)})
                      </span>{" "}
                    </h3>
                    <div className="text-warning top-0 m-2 end-0 position-absolute d-flex justify-content-center align-items-center">
                      <i className="fa-solid fa-star fa-3x "></i>
                      <p className="position-absolute text-black h5 fw-bolder m-0 p-0">
                        {movie.vote_average.toString().substr(0, 3)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="bg-danger vh-100 d-flex align-items-center justify-content-center">
              <i className="fas fa-spinner fa-spin fa-3x"></i>
            </div>
          </>
        )}

        {tv ? (
          <div className="row gy-3 justify-content-center">
            <div className="col-md-4 col-lg-6">
              <div className="shadow h-100 rounded-3 bg-lighted d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <h1>The Movie DB</h1>
                  <p className="h4">Trending TV shows Right Now</p>
                </div>
              </div>
            </div>
            {tv.map((tv, i) => (
              <div key={i} className="col-md-4 col-lg-3 col-xxl-2">
                <Link to={`/tvdetail/${tv.id}`}>
                  <div className="position-relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500` + tv.poster_path}
                      className="w-100 rounded-3"
                      alt=""
                    />
                    <h3 className="h4 py-2 text-center">
                      {tv.name} <br />{" "}
                      <span className="lead text-muted">
                        ({tv.first_air_date.substr(0, 4)})
                      </span>{" "}
                    </h3>
                    <div className="text-warning top-0 m-2 end-0 position-absolute d-flex justify-content-center align-items-center">
                      <i className="fa-solid fa-star fa-3x "></i>
                      <p className="position-absolute text-black h5 fw-bolder m-0 p-0">
                        {tv.vote_average.toString().substr(0, 3)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="bg-danger vh-100 d-flex align-items-center justify-content-center">
              <i className="fas fa-spinner fa-spin fa-3x"></i>
            </div>
          </>
        )}

        {preson ? (
          <div className="row gy-3 justify-content-center">
            <div className="col-md-4 col-lg-6">
              <div className="shadow h-100 rounded-3 bg-lighted d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <h1>The Movie DB</h1>
                  <p className="h4">Trending people Right Now</p>
                </div>
              </div>
            </div>
            {preson.map((person, i) => (
              <div key={i} className="col-md-4 col-lg-3 col-xxl-2">
                {person.profile_path ? (
                  <Link to={`/persondetail/${person.name}/${person.id}`}>
                    <img
                      src={
                        `https://image.tmdb.org/t/p/w500` + person.profile_path
                      }
                      className="w-100"
                      alt=""
                    />
                    <h3 className="h4 py-2 text-center">{person.name}</h3>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="vh-100 d-flex align-items-center justify-content-center">
              <i className="fas fa-spinner fa-spin fa-3x"></i>
            </div>
          </>
        )}
      </div>
    </>
  );
}

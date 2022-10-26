import React from "react";
import $ from "jquery";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Moviedetail() {
  const [movie, setMovie] = useState(null);
  let params = useParams();

  useEffect(() => {
    if (movie === null) {
      return;
    } else {
      const url = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
      $(".content").css("background-image", `url(${url})`);
    }
  }, [movie]);

  useEffect(() => {
    setPaddingTop();
    movieDetailApi(params.id);
  }, []);

  async function movieDetailApi(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=ee3d9c0552ad42f229b5ca281a29f904&language=en-US`
    );
    setMovie(data);
  }

  function setPaddingTop() {
    const height = $(".navbar").innerHeight();
    $("#home").css("paddingTop", height);
  }
  return (
    <>
      <div
        id="home"
        className="container d-flex justify-content-center align-items-center"
      >
        {movie ? (
          <div className="w-100 content rounded-3 overflow-hidden">
            <div className="overlay"></div>
            <div className="row position-relative align-items-center">
              <div className="col-lg-3">
                <img
                  src={`https://image.tmdb.org/t/p/w500` + movie.poster_path}
                  className="w-100"
                  alt=""
                />
              </div>
              <div className="col-lg-9 fw-bold pt-4 px-5 ">
                <div className="row py-2 align-items-center justify-content-between">
                  <h2 className="col-lg-6 py-2 m-0 fw-bolder">{movie.title}</h2>
                  {movie.tagline ? (
                    <>
                      <h4 className="col-lg-6 border m-0 border-1 rounded-pill px-4 py-2 text-white border-white">
                        {movie.tagline}
                      </h4>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <p className="lead">{movie.overview}</p>
                <ul className="list-unstyled d-flex mt-4">
                  {movie.genres.map((gg, i) => (
                    <li
                      className="rounded-pill border me-2 border-1 px-3 py-1"
                      key={i}
                    >
                      {gg.name}
                    </li>
                  ))}
                </ul>
                <div className="d-flex flex-wrap align-items-center mt-4">
                  <h5 className="border border-1 px-4 py-1  rounded-pill me-3">
                    {movie.vote_average}{" "}
                    <i className="fas ms-3 fa-star text-warning"></i>
                  </h5>
                  <h5 className="border border-1 px-4 py-1 rounded-pill me-3">
                    {movie.popularity}{" "}
                    <i className="fa-solid ms-3 text-danger fa-fire-flame-curved"></i>
                  </h5>
                  <h5 className="border border-1 px-4 py-1 rounded-pill me-3">
                    {movie.spoken_languages.map(
                      (ll) => ll.english_name + ` - `
                    )}{" "}
                    <i className="fas ms-3 solid  text-success fa-language"></i>
                  </h5>
                </div>
                <ul className="mt-3">
                  <li className="lead">realease date : {movie.release_date}</li>
                  <li className="lead mt-2">
                    Countries :{" "}
                    {movie.production_countries.map((ccc) => ccc.name + ` `)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <i className="fas fa-3x fa-spinner fa-spin"></i>
          </div>
        )}
      </div>
    </>
  );
}

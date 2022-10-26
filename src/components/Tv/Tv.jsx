import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import WOW from "wowjs";

export default function Movies() {
  const [movies, setMovies] = useState(null);
  let numbers = new Array(100).fill(0).map((x, i) => i + 1);

  useEffect(() => {
    setPaddingTop();
    getMoviesApi(1);
  }, []);

  useEffect(() => {}, [numbers]);

  useEffect(() => {
    if (movies === null) {
      return;
    } else {
      new WOW.WOW().init();
    }
  }, [movies]);

  async function getMoviesApi(page) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=ee3d9c0552ad42f229b5ca281a29f904&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    setMovies(data.results);
  }
  function page(page) {
    setMovies(null);
    getMoviesApi(page);
  }
  async function search(e) {
    if (e.target.value === "") {
      getMoviesApi(1);
    } else {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=ee3d9c0552ad42f229b5ca281a29f904&language=en-US&query=${e.target.value}&page=1`
      );
      filterdata(data.results);
    }
  }

  function filterdata(array) {
    let filterd = array.filter((xx) => xx.poster_path);
    setMovies(filterd);
  }
  function setPaddingTop() {
    const height = $(".navbar").innerHeight();
    $("#home").css("paddingTop", height);
  }
  return (
    <>
      <div id="home" className="container-fluid">
        {movies ? (
          <>
            <div className="row px-5 px-md-0 flex-column justify-content-center align-items-center mt-4">
              <div className="col-md-6 p-0 position-relative">
                <input
                  onChange={search}
                  type="text"
                  placeholder="tv show name ... "
                  className="form-control text-black"
                />
                <i className="fa-solid fa-magnifying-glass position-absolute text-black translate-middle-y top-50 end-0 me-2"></i>
              </div>
              <div className="col-md-6 position-relative d-flex align-items-center mt-4">
                <i className="fa-solid fa-circle-chevron-right text-muted position-absolute start-100"></i>
                <i className="fa-solid fa-circle-chevron-left text-muted position-absolute end-100"></i>
                <Swiper spaceBetween={10} slidesPerView={3}>
                  {numbers.map((number, i) => (
                    <SwiperSlide
                      key={i}
                      onClick={() => {
                        page(number);
                      }}
                      className="slider-item"
                    >
                      {number}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="row my-4 justify-content-center">
              {movies.map((movie, ii) => (
                <div
                  key={ii}
                  data-wow-duration="1s"
                  className="col-sm-6 col-md-4 col-lg-3 col-xxl-2 wow animate__bounceInUp"
                >
                  <Link to={`/tvdetail/${movie.id}`}>
                    <div className="item text-center position-relative">
                      <img
                        src={
                          `https://image.tmdb.org/t/p/w500` + movie.poster_path
                        }
                        className="w-100 rounded-3"
                        alt=""
                      />
                      <h3 className="py-4">{movie.name}</h3>
                      <div className="text-warning top-0 m-2 end-0 position-absolute d-flex justify-content-center align-items-center">
                        <i className="fa-solid fa-star fa-3x "></i>
                        <p className="position-absolute text-black h5 fw-bolder m-0 p-0">
                          {movie.vote_average}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
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

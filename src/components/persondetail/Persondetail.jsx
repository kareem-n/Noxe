import React from "react";
import $ from "jquery";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Persondetail() {
  let params = useParams();
  const [personDetail, setPersonDetail] = useState(null);

  useEffect(() => {
    setPaddingTop();
    getPersonDetails(params.id);
  }, []);

  async function getPersonDetails(id) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=ee3d9c0552ad42f229b5ca281a29f904&language=en-US`
    );
    console.log(data.cast);
    setPersonDetail(() => filteredData(data.cast));
  }

  function filteredData(data) {
    const filterd = data.filter((ele) => ele.poster_path);
    return filterd;
  }

  function setPaddingTop() {
    const height = $(".navbar").innerHeight();
    $("#home").css("paddingTop", height);
  }

  return (
    <>
      <div id="home" className="container-fluid px-5">
        {personDetail ? (
          <>
            <div className="row my-5">
                <div className="d-flex justify-content-center">
                    <h1 className="bg-info text-black fw-bold mb-3 py-2 px-5 rounded-pill">{params.name}</h1>
                </div>
                
              {personDetail.map((ele, i) => (
                <div key={i} className="col-md-2 ">
                  <div className="position-relative h-100">
                    <Link
                      to={`/moviedetail/${ele.id}`}
                    >
                      <img
                        src={
                          `https://image.tmdb.org/t/p/w500` + ele.poster_path
                        }
                        className="w-100 rounded-3"
                        alt=""
                      />
                      <h2 className="py-3 h3 text-center">{ele.title} <br /><span className="lead text-muted"> ({ele.release_date.substr(0,4)})</span></h2>
                      <div className="top-0 m-2 end-0 position-absolute d-flex justify-content-center align-items-center">
                        <i className="fa-solid text-warning fa-star fa-3x "></i>
                        <p className="position-absolute text-black h5 fw-bolder m-0 p-0">
                          {ele.vote_average.toString().substr(0,3)}
                        </p>
                      </div>
                    </Link>
                  </div>
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

import React from "react";
import $ from "jquery";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";

export default function Login(props) {
  const nav = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  function getUserData(e) {
    let userData = { ...user };
    userData[e.target.name] = e.target.value;
    setUser(userData);
  }

  useEffect(() => {
    setPaddingTop();
  }, []);

  function setPaddingTop() {
    const height = $(".navbar").innerHeight();
    $("#login").css("paddingTop", height);
  }

  function validation() {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    return schema.validate(user, { abortEarly: false });
  }

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    const validationFunction = validation();
    if (validationFunction.error) {
      setErrors(validationFunction.error.details);
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, user.email, user.password).then(
        (data) => {
          nav("/home");
          localStorage.setItem("userToken", data.user.accessToken);
          props.token();
          setLoading(false);
        }
      ).catch( error => {
        setError("Invalid Login Attempt");
        console.log(error);
        
        setLoading(false);
      } );

      
    }
  }
  return (
    <>
      <div id="login" className="container vh-100">
        <h1 className="pt-5 text-center">Login</h1>

        <form
          onSubmit={submitForm}
          action=""
          className="w-75 mx-auto pb-4 mt-4 text-white"
        >
          <ul className="list-unstyled">
            {errors.map((error, i) => (
              <li key={i} className="w-100 alert p-1 my-1 alert-danger">
                {error.message}
              </li>
            ))}
          </ul>
          {error !== null ? (
            <label className="alert alert-danger form-label w-100" htmlFor="">
              {error}
            </label>
          ) : (
            ""
          )}

          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={getUserData}
            autoComplete="off"
            className="form-control bg-transparent mb-3"
            type="email"
            name="email"
            id="email"
          />

          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={getUserData}
            autoComplete="off"
            className="form-control bg-transparent mb-3"
            type="password"
            name="password"
            id="password"
          />

          <button type="submit" className="btn btn-outline-primary btn-lg">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

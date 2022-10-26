import React from "react";
import $ from "jquery";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Register() {
  const nav = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
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
    $("#register").css("paddingTop", height);
  }

  function validation() {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
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
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signup",
        user
      );
      if (data.message === "success") {
        nav("/login");
        setLoading(false);
      } else {
        setError(data.message);
        setLoading(false);
      }
    }
  }
  return (
    <>
      <div id="register" className="container vh-100">
        <h1 className="pt-5 text-center">Register Now</h1>

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

          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            onChange={getUserData}
            autoComplete="off"
            className="form-control bg-transparent mb-3"
            type="text"
            name="first_name"
            id="first_name"
          />

          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            onChange={getUserData}
            autoComplete="off"
            className="form-control bg-transparent mb-3"
            type="text"
            name="last_name"
            id="last_name"
          />

          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            onChange={getUserData}
            autoComplete="off"
            className="form-control bg-transparent mb-3"
            type="number"
            name="age"
            id="age"
          />

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
              "REGISTER"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

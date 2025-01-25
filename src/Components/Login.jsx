import React from "react";
import { Link } from "react-router-dom";
import { CiAt } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Typewriter from "typewriter-effect";

const Login = () => {
  return (
    <>
      <div className="login">
        <div className="contain d-flex align-items-center">
          <div className="left w-50 d-flex flex-column justify-content-evenly align-items-center">
            <Typewriter
              options={{
                strings: ["Welcome To Your Second Home"],
                autoStart: true,
                loop: true,
              }}
            />
            <div
              data-aos="zoom-in"
              data-aos-duration="3000"
              className="img d-flex justify-content-center align-items-center"
            >
              <img className="w-75" src="./img/login.jpg" alt="#login" />
            </div>
          </div>
          <div className="right w-50 d-flex justify-content-center align-items-center">
            <form className="form w-50 h-50">
              <p
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="heading"
              >
                Login
              </p>
              <div
                data-aos="fade-left"
                data-aos-duration="1500"
                className="field"
              >
                <CiAt className="input-icon" />
                <input
                  autocomplete="off"
                  placeholder="Username"
                  className="input-field"
                  type="text"
                />
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="1500"
                className="field"
              >
                <CiLock className="input-icon" />
                <input
                  placeholder="Password"
                  className="input-field"
                  type="password"
                />
              </div>
              <Link to="/dashboard">
                <button
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  className="button mt-5"
                >
                  <span>Login</span>
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

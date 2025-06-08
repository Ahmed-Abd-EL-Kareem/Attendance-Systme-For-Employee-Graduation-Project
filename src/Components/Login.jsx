import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiAt } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Typewriter from "typewriter-effect";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userIn, setUserIn] = useState(true);
  const [passwordIn, setPasswordIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if username and password are entered
    if (!userName.trim() && !password.trim()) {
      toast.error("Please enter your UserName and Password", {
        theme: "colored",
      });
      setPasswordIn(false);
      setUserIn(false);
      return;
    }
    if (!userName.trim()) {
      toast.error("Please enter your UserName", {
        theme: "colored",
      });
      setUserIn(false);
      setPasswordIn(true);
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter your Password", {
        theme: "colored",
      });
      setPasswordIn(false);
      setUserIn(true);
      return;
    }
    setPasswordIn(true);
    setUserIn(true);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://attendancesystem-back-end-production.up.railway.app/api/v1/accounts/login",
        {
          userName: userName.toUpperCase().trim(),
          password: password.trim(),
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        // Store user information in localStorage
        localStorage.setItem(
          "employeeId",
          JSON.stringify(response.data.data.account.employee._id)
        );
        localStorage.setItem(
          "Role",
          JSON.stringify(response.data.data.account.role)
        );

        localStorage.setItem(
          "loginToast",
          JSON.stringify({
            message: "Login Successful",
            type: "success",
          })
        );

        if (response.data.data.account.role === "admin") {
          navigate(
            `/admin/${response.data.data.account.employee._id}/dashboard`
          );
        } else {
          navigate(
            `/employee/${response.data.data.account.employee._id}/attendance-form`
          );
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login Error", {
          theme: "colored",
        });
      } else {
        toast.error("Connection Error", {
          theme: "colored",
        });
      }
    } finally {
      setLoading(false);
    }
  };

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
            <form onSubmit={handleSubmit} className="form w-50 h-50">
              <p
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="heading"
              >
                Login
              </p>
              <div
                {...(userIn ? {} : { style: { border: "2px solid #a91e1e" } })}
                data-aos="fade-left"
                data-aos-duration="1500"
                className="field"
              >
                <CiAt
                  className="input-icon"
                  {...(userIn ? {} : { style: { fill: "#a91e1e" } })}
                />
                <input
                  autoComplete="off"
                  placeholder="Username"
                  className={userIn ? "input-field" : "input-field error"}
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div
                {...(passwordIn
                  ? {}
                  : { style: { border: "2px solid #a91e1e" } })}
                data-aos="fade-right"
                data-aos-duration="1500"
                className="field"
              >
                <CiLock
                  className="input-icon"
                  {...(passwordIn ? {} : { style: { fill: "#a91e1e" } })}
                />
                <input
                  placeholder="Password"
                  className={passwordIn ? "input-field" : "input-field error"}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="button mt-5"
                type="submit"
                disabled={loading}
              >
                <span>{loading ? "Loading..." : "Login"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;

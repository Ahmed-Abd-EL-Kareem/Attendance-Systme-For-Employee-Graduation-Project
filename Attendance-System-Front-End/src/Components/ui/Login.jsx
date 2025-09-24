import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiAt } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Typewriter from "typewriter-effect";
import "react-toastify/dist/ReactToastify.css";
import { useLogin } from "../../hooks/useApiQueries";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../hooks/useApiQueries";
import { apiService } from "../../services/api";
import SmallLoad from "./SmallLoad";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userIn, setUserIn] = useState(true);
  const [passwordIn, setPasswordIn] = useState(true);

  // Use React Query login mutation
  const loginMutation = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if username and password are entered
    if (!userName.trim() && !password.trim()) {
      setPasswordIn(false);
      setUserIn(false);
      return;
    }
    if (!userName.trim()) {
      setUserIn(false);
      setPasswordIn(true);
      return;
    }

    if (!password.trim()) {
      setPasswordIn(false);
      setUserIn(true);
      return;
    }
    setPasswordIn(true);
    setUserIn(true);

    const loginData = {
      userName: userName.toUpperCase().trim(),
      password: password.trim(),
    };

    loginMutation.mutate(loginData, {
      onSuccess: async (response) => {
        if (response.data.status === "success") {
          if (response.data.data.account.role === "admin") {
            // Prefetch dashboard counts before navigating
            navigate(
              `/admin/${response.data.data.account.employee._id}/dashboard`
            );
            await queryClient.prefetchQuery({
              queryKey: queryKeys.dashboard,
              queryFn: () => apiService.dashboard.getCounts(),
              staleTime: 2 * 60 * 1000,
            });
          } else {
            navigate(
              `/employee/${response.data.data.account.employee._id}/attendance-form`
            );
          }
        }
      },
    });
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
                disabled={loginMutation.isPending}
              >
                <span>
                  {loginMutation.isPending ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <SmallLoad /> Login...
                    </div>
                  ) : (
                    "Login"
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

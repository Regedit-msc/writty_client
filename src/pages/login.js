/* eslint-disable no-undef */
import { Link, useNavigate } from "react-router-dom";
// import PropTypes from "prop-types"
import React from "react";
import { API_ENDPOINT } from "./url";
import { useContext, useState, useEffect } from "react";
import { userContext } from "../contexts/userContext";
import InfoBar from "../components/info";
import { useTitle } from "../utils/title";
import GoogleLogin from "react-google-login";
import { useSnackbar } from "notistack";
import LoginGithub from "react-login-github";
import LogoPlaceholder from "../images/logo.png";
import Google from "../images/google-icon.png";
import GitHub from "../images/github-icon.png";
import LoginBackgroundImage from "../images/login-background.png";
import styled from "styled-components";
import { device } from "../utils/responsive";

// import withPageTransition from "../components/page_transition/page_transition";

const LoginBox = styled.div`
  width: 500px;
  margin: 90px 0;
  border-radius: var(--brd_rad_small);
  z-index: 1;

  background-color: #ffffff;
  border: 1px solid #ffffff;
  text-align: center;

  box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.25);
  h3 {
    padding: 1.5rem;
  }

  @media ${device.tablet} {
    width: 300px;
    h3 {
      padding: 1rem;
    }
  }
`;
const LoginForm = styled.div`
  padding: 30px;
  > * {
    margin-bottom: 25px;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  p {
    font-weight: 700;
  }
  input,
  .login_options {
    display: block;

    box-sizing: border-box;
    width: 100%;
    padding: 20px 36px;
    border: none;
    border-radius: var(--brd_rad_big);

    font-family: inherit;
    font-weight: 400;
    font-style: normal;
  }
  input {
    background-color: #eeeeee;
  }
  input[type="submit"] {
    background-color: #000000;
    color: #ffffff;
  }
  .login_options {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #000000;
    padding: 12px 36px;
    background-color: #ffffff;
    img {
      width: 40px;
      margin-right: 20px;
    }
  }
  .or {
    line-height: 1em;
    outline: 0;
    border: 0;
    color: #000000;
    text-align: center;
    background-color: transparent;
    height: 1.5em;
    width: 100%;
    position: relative;
  }
  .or::before {
    content: "";
    background-color: #000000;

    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 2px;
  }
  .or::after {
    content: "OR";
    display: inline-block;

    position: relative;
    padding: 0 0.5em;
    color: #bbbbbb;
    background-color: #ffffff;
    line-height: 1.5em;
  }
  @media ${device.tablet} {
    padding: 20px;
    > * {
      margin-bottom: 20px;
    }
    input,
    .login_options {
      padding: 10px 18px;
    }
    .login_options > img {
      width: 20px;
    }
  }
`;
const LoginFooter = styled.div`
  padding: 0 30px 35px 30px;
  font-weight: 700;
  > * {
    margin-bottom: 7px;
  }
  a {
    color: #3137dc;
  }
  @media ${device.tablet} {
    padding: 0 20px 35px 20px;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useTitle("Login.");
  const [err, setErr] = useState();
  const [showErr, setShowErr] = useState(false);
  const { setUserToken } = useContext(userContext);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      enqueueSnackbar("Auto login.", { variant: "success" });
      navigate(
        localStorage.getItem("lastVisited")
          ? localStorage.getItem("lastVisited")
          : "/dash",
        { replace: true }
      );
    }
  }, [enqueueSnackbar, navigate]);

  function handleChange(e) {
    switch (e.target.name) {
      case "username":
        setFormState({ ...formState, username: e.target.value });
        break;
      case "password":
        setFormState({ ...formState, password: e.target.value });
        break;
      default:
        break;
    }
  }
  function handleSubmit() {
    console.log(formState);
    fetch(`${API_ENDPOINT}/auth/login`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify(formState),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        if (jsonRes.success) {
          setUserToken(jsonRes.message);

          navigate(
            localStorage.getItem("lastVisited")
              ? localStorage.getItem("lastVisited")
              : "/dash",
            { replace: true }
          );
        } else {
          enqueueSnackbar(jsonRes.message, {
            variant: "error",
          });
        }
      });
  }

  function PopupBlocked() {
    var PUtest = window.open(null, "", "width=1,height=1");
    try {
      PUtest.close();
      return false;
    } catch (e) {
      return true;
    }
  }
  const responseGoogle = (d) => {
    if (PopupBlocked()) {
      setErr("You have to enable popups to use this feature.");
      setShowErr(true);
      setTimeout(() => {
        setErr("");
        setShowErr(false);
      }, 3000);
    } else {
      saveToken(d.accessToken, "google");
    }
  };

  const saveToken = async (access_token, provider) => {
    const payload = {
      access_token,
    };
    const payloadG = {
      code: access_token,
    };
    fetch(`${API_ENDPOINT}/login/${provider}`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body:
        provider === "google"
          ? JSON.stringify(payload)
          : JSON.stringify(payloadG),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        if (jsonRes.success) {
          setUserToken(jsonRes.message);
      
          if (jsonRes.profileStatus) {
            localStorage.setItem("new_user", "notreg");
            navigate(
              localStorage.getItem("lastVisited")
                ? localStorage.getItem("lastVisited")
                : "/dash",
              { replace: true }
            );
          } else {
    
            navigate("/auth/onboard");
            localStorage.setItem("new_user", "reg");
          }
        } else {
          setErr(jsonRes.message);
          setShowErr(true);
          setTimeout(() => {
            setErr("");
            setShowErr(false);
          }, 3000);
        }
      });
  };
  const onSuccess = ({ code }) => {
    saveToken(code, "github");
  };
  const onFailure = (response) => {
    console.log(response);
    enqueueSnackbar("Github auth failed.", { variant: "error" });
  };
  return (
    <>
      {showErr ? <InfoBar color="red" text={err} /> : ""}

      <section style={{ display: "grid", placeItems: "center" }}>
        <Link to="/" className="logo">
          <img src={LogoPlaceholder} alt="Logo Placeholder" />
        </Link>
        <LoginBox>
          <header>
            <h3>Login</h3>
            <hr />
          </header>
          <LoginForm>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              autoComplete="off"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              autoComplete="off"
            />
            <input type="submit" value="Login" onClick={handleSubmit} />
            <div>
              <hr className="or" data-content="OR" />
            </div>

            <GoogleLogin
              clientId={process.env.REACT_APP_G_CLIENT_ID}
              render={(renderProps) => (
                <div
                  className="login_options"
                  onClick={() => {
                    renderProps.onClick();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src={Google} alt="Google Logo" />
                  <p>Sign in with Google</p>
                </div>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              isSignedIn={false}
              cookiePolicy={"single_host_origin"}
            />

            <LoginGithub
              clientId={process.env.REACT_APP_GH_CLIENT_ID}
              onSuccess={onSuccess}
              onFailure={onFailure}
              className="login_options github"
            >
              <img src={GitHub} alt="GitHub Logo" />
              <p>Sign in with GitHub</p>
            </LoginGithub>
          </LoginForm>
          <LoginFooter>
            <div>
              <Link to="#">Forgot Password?</Link>
            </div>
            <div>
              <span>Don&apos;t have an account?</span>{" "}
              <Link to="/auth/signup" className="signup_link">
                Sign up
              </Link>
            </div>
          </LoginFooter>
        </LoginBox>
        <img
          src={LoginBackgroundImage}
          alt="Login Background"
          style={{ position: "fixed", top: "50%", right: "0", width: "25vw" }}
        />
      </section>
    </>
  );
};

export default Login;

/* eslint-disable no-undef */
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "./url";
import { useTitle } from "../utils/title";
import { useSnackbar } from "notistack";
import LogoPlaceholder from "../images/logo.png";
import Google from "../images/google-icon.png";
import GitHub from "../images/github-icon.png";
import { device } from "../utils/responsive";
import SignupBackgroundImage from "../images/login-background.png";

const SignupBox = styled.div`
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
const SignupForm = styled.div`
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
  .signup_options {
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
  .signup_options {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #000000;
    padding: 12px 36px;
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
    .signup_options {
      padding: 10px 18px;
    }
    .signup_options > img {
      width: 20px;
    }
  }
`;
const SignupFooter = styled.div`
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

const Signup = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useTitle("Sign Up.");
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    passwordCrosscheck: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      enqueueSnackbar("Auto login.", { variant: "success" });
      navigate("/dash", { replace: true });
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
      case "password_crosscheck":
        setFormState({ ...formState, passwordCrosscheck: e.target.value });
        break;

      case "email":
        setFormState({ ...formState, email: e.target.value });
        break;
      default:
        break;
    }
  }
  function handleSubmit() {
    if (!validate(formState)) return;
    console.log(formState);
    fetch(`${API_ENDPOINT}/register`, {
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
          console.log(jsonRes);
          localStorage.setItem("user_token", jsonRes.message);
          enqueueSnackbar(
            "A mail containing a one time password\n has been sent to your registered email address."
          );
          enqueueSnackbar("If you don't see the mail check your spam.");
          navigate("/otp", { replace: true });
        } else {
          enqueueSnackbar(jsonRes.message);
        }
      });
  }

  function validate(formState) {
    if (formState.username.length < 7) {
      enqueueSnackbar("Username is too short.");
      return false;
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        formState.email
      )
    ) {
      enqueueSnackbar("Invalid email address.");
      return false;
    } else if (formState.password !== formState.passwordCrosscheck) {
      enqueueSnackbar("Passwords do not match.");
      return false;
    } else if (
      formState.username === "" ||
      formState.passwordCrosscheck === "" ||
      formState.email === "" ||
      formState.password === ""
    ) {
      enqueueSnackbar("All fields are required.");
      return false;
    }
    return true;
  }

  return (
    <>
      <section style={{ display: "grid", placeItems: "center" }}>
        <Link to="/home" className="logo">
          <img src={LogoPlaceholder} alt="Logo Placeholder" />
        </Link>
        <SignupBox>
          <header>
            <h3>Join Live-Gists</h3>
            <hr />
          </header>
          <SignupForm>
            <div>
              <p style={{ alignSelf: "flex-start", marginBottom: "5px" }}>
                Username
              </p>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
            <div>
              <p style={{ alignSelf: "flex-start", marginBottom: "5px" }}>
                Email Address
              </p>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
            <div>
              <p style={{ alignSelf: "flex-start", marginBottom: "5px" }}>
                Password
              </p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
            <div>
              <p style={{ alignSelf: "flex-start", marginBottom: "5px" }}>
                Password Confirmation
              </p>
              <input
                type="password"
                name="password_crosscheck"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="submit"
                value="Join Live-Gists"
                onClick={handleSubmit}
              />
            </div>
            <div>
              <hr className="or" data-content="OR" />
            </div>
            <div className="signup_options">
              <img src={Google} alt="Google Logo" />
              <span>Sign Up with Google</span>
            </div>

            <div className="signup_options">
              <img src={GitHub} alt="GitHub Logo" />
              <span>Sign Up with GitHub</span>
            </div>
          </SignupForm>
          <SignupFooter>
            <div>
              <span>By signing up, you agree to our </span>
              <Link to="#">Terms </Link>
              <span>and </span>
              <Link to="#">Privacy Policy</Link>.
            </div>
            <div>
              <span>Already have an account?</span>{" "}
              <Link to="/auth/login">Login</Link>
            </div>
          </SignupFooter>
        </SignupBox>

        <img
          src={SignupBackgroundImage}
          alt="Signup Background"
          style={{ position: "fixed", top: "50%", right: "0", width: "25vw" }}
        />
      </section>
    </>
  );
};

export default Signup;

/* eslint-disable no-undef */
import { useState } from "react";
import { themeContext } from "../App";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/otp.css";
import { API_ENDPOINT } from "./url";
import React from "react";
// import PropTypes from "prop-types"
import { useTitle } from "../utils/title";
import backgroundAccountCreation from "../images/background-account-creation.png";
import LogoPlaceholder from "../images/logo.png";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { makePriv } from "../auth_hoc/checkAuth";

const OTP = () => {
  const navigate = useNavigate();
  const { theme } = useContext(themeContext);
  const { enqueueSnackbar } = useSnackbar();
  useTitle("OTP Verification.");
  const [otpState, setOtpState] = useState("");
  function handleClick() {
    if (otpState.length > 9) return enqueueSnackbar("OTP not complete");
    enqueueSnackbar("Processing...");
    fetch(`${API_ENDPOINT}/verify/email`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      method: "POST",
      body: JSON.stringify({ otp: otpState }),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        if (jsonRes.success) {
          navigate("/onboard", { replace: true });
          enqueueSnackbar(jsonRes.message, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(jsonRes.message, {
            variant: "error",
          });
        }
      });
  }
  function handleChange(e) {
    setOtpState(e.target.value);
  }

  useEffect(() => {
    if (!localStorage.getItem("user_token"))
      return navigate("/signup", { replace: true });
    if (
      localStorage.getItem("new_user") === "notreg" ||
      !localStorage.getItem("new_user")
    ) {
      return;
    } else {
      navigate(localStorage.getItem("last_visited") ?? "/dash", {
        replace: true,
      });
    }
  }, [navigate]);
  return (
    <>
      <div className={theme === "light" ? "otp-main_light" : "otp-main"}>
        <div>
          <Link to="/home">
            <img
              src={LogoPlaceholder}
              className="logo"
              alt="Logo Placeholder"
            />
          </Link>
        </div>

        <div className="grid-col-2">
          <div id={theme === "light" ? "otp_box_light" : "otp_box"}>
            <header>
              <h3 id="otp_head">OTP Verification</h3>
              <hr />
            </header>
            <div className="otp_body">
              <div id="otp_message">
                Enter the 6-digit OTP code sent to your registered email.
              </div>

              <div id={theme === "light" ? "otp_form_light" : "otp_form"}>
                <input
                  name="otp"
                  pattern="[a-zA-Z0-9]{6}"
                  maxLength="6"
                  placeholder="******"
                  onChange={handleChange}
                  value={otpState}
                />
                <input type="submit" value="Continue" onClick={handleClick} />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-col-3">
          <img
            src={backgroundAccountCreation}
            alt="background_account_creation"
          />
        </div>
      </div>
    </>
  );
};

export default makePriv(OTP);
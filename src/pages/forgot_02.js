import { Link } from "react-router-dom";
import "../css/forgot.css";
// import { API_ENDPOINT } from "./url";
// import { themeContext } from "../App";
// import { useContext, useState, useEffect } from "react";
// import { userContext } from "../contexts/userContext";
// import InfoBar from "../components/info";
import { useTitle } from "../utils/title";
import backgroundAccountCreation from "../images/background-account-creation.png";
import LogoPlaceholder from "../images/logo.png";

const Forgot_02 = () => {
  useTitle("Forgot Password");

  return (
    <>
      <div className="forgot-password-main">
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
          <div id="forgot-password_box">
            <header>
              <div>
                <h5 className="lnk-prev_next">PREVIOUS</h5>
                <h5 id="setup-step">STEP 2 OF 4</h5>
                <h5 className="lnk-prev_next">NEXT</h5>
              </div>
              <hr />
            </header>
            <div className="forgot-password_body">
              <div>
                <h3 id="forgot-password_head">OTP Verification</h3>
              </div>
              <div id="forgot-password_message">
                Enter the 6-digit OTP code sent to *****11@gmail.com
              </div>
              <div id="forgot-password_form">
                <input
                  type="number"
                  name="otp"
                  pattern="[0-9]{6}"
                  maxlength="6"
                  placeholder="******"
                  id="forgot-otp"
                />
                <input type="submit" value="Continue" />
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

export default Forgot_02;

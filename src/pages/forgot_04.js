import { Link } from "react-router-dom";
import "../css/forgot.css";
import "../css/setup.css";
// import { API_ENDPOINT } from "./url";
// import { themeContext } from "../App";
// import { useContext, useState, useEffect } from "react";
// import { userContext } from "../contexts/userContext";
// import InfoBar from "../components/info";
import { useTitle } from "../utils/title";
import backgroundAccountCreation from "../images/background-account-creation.png";
import LogoPlaceholder from "../images/logo.png";
import doneImage from "../images/image-done.png";

const Forgot_04 = () => {
  useTitle("Done!");

  return (
    <>
      <div className="done-main">
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
          <div id="done_box">
            <div className="done_body">
              <div id="done_message">Details successfully updated</div>
              <div id="done_img">
                <img src={doneImage} alt="done" />
              </div>
              <Link to="/auth/login" id="done_login">
                Back to Login Page
              </Link>
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

export default Forgot_04;

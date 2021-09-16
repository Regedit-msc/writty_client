import { Link, withRouter } from "react-router-dom"
import "../css/otp.css";
// import { API_ENDPOINT } from "./url";
// import { themeContext } from "../App";
// import { useContext, useState, useEffect } from "react";
// import { userContext } from "../contexts/userContext";
// import InfoBar from "../components/info";
import { useTitle } from "../utils/title";
import backgroundAccountCreation from "../images/background-account-creation.png";
import LogoPlaceholder from "../images/logo.png"


const OTP = ({ history }) => {
    useTitle("OTP Verification.");

    return (
        <>
            <div className="otp-main">
                <div>
                    <Link to="/home"><img src={LogoPlaceholder} className="logo" alt="Logo Placeholder" /></Link>
                </div>

                <div className="grid-col-2">
                    <div id="otp_box">
                        <header>
                            <h3 id="otp_head">OTP Verification</h3>
                            <hr />
                        </header>
                        <div className="otp_body">
                            <div id="otp_message">
                                Enter the 6-digit OTP code sent to *****11@gmail.com
                            </div>
                            <div id="otp_form">
                                <input type="number" name="otp" pattern="[0-9]{6}" maxlength="6" placeholder="******" />
                                <input type="submit" value="Continue" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid-col-3">
                    <img src={backgroundAccountCreation} alt="background_account_creation" />
                </div>
            </div>
        </>
    )
}

export default withRouter(OTP);
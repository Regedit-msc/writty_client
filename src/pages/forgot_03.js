import { Link, withRouter } from "react-router-dom"
import "../css/forgot.css";
// import { API_ENDPOINT } from "./url";
// import { themeContext } from "../App";
// import { useContext, useState, useEffect } from "react";
// import { userContext } from "../contexts/userContext";
// import InfoBar from "../components/info";
import { useTitle } from "../utils/title";
import backgroundAccountCreation from "../images/background-account-creation.png";
import LogoPlaceholder from "../images/logo.png"


const Forgot_03 = ({ history }) => {
    useTitle("Forgot Password");

    return (
        <>
            <div className="forgot-password-main">
                <div>
                    <Link to="/home"><img src={LogoPlaceholder} className="logo" alt="Logo Placeholder" /></Link>
                </div>

                <div className="grid-col-2">
                    <div id="forgot-password_box">
                        <header>
                            <div>
                                <h5 className="lnk-prev_next">PREVIOUS</h5>
                                <h5 id="setup-step">STEP 3 OF 4</h5>
                                <h5 className="lnk-prev_next">NEXT</h5>
                            </div>
                            <hr />
                        </header>
                        <div className="forgot-password_body">
                            <div>
                                <h3 id="forgot-password_head">New Password</h3>
                            </div>
                            <div id="new-password-form">
                                <div class="new-pass-div">
                                    Password
                                    <input type="password" name="password" placeholder="Password" />
                                </div>
                                <div class="new-pass-div">
                                    Password Confirmation
                                    <input type="password" name="confirm-password" placeholder="Confirm Password" />
                                </div>
                            </div>
                            <input type="submit" value="Continue" />
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

export default withRouter(Forgot_03);
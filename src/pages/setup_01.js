import { Link, withRouter } from "react-router-dom"
import "../css/setup.css";
// import { API_ENDPOINT } from "./url";
// import { themeContext } from "../App";
// import { useContext, useState, useEffect } from "react";
// import { userContext } from "../contexts/userContext";
// import InfoBar from "../components/info";
import { useTitle } from "../utils/title";
import backgroundAccountCreation from "../images/background-account-creation.png";
import LogoPlaceholder from "../images/logo.png"
import PlaceholderProfileImage from "../images/placeholder-profile-image.png"


const Setup_01 = ({ history }) => {
    useTitle("Upload Photo");

    return (
        <>
            <div className="setup-main">
                <div>
                    <Link to="/home"><img src={LogoPlaceholder} className="logo" alt="Logo Placeholder" /></Link>
                </div>

                <div className="grid-col-2">
                    <div className="setup_box">
                        <header>
                            <div>
                                <h5 className="lnk-prev_next">PREVIOUS</h5>
                                <h5 id="setup-step">STEP 1 OF 5</h5>
                                <h5 className="lnk-prev_next">NEXT</h5>
                            </div>
                            <hr />
                        </header>
                        <div className="setup_body">
                            <div className="setup_message">
                                <h5>Upload Photo</h5>
                                Get your face easily regognized by your network
                            </div>
                            <img src={PlaceholderProfileImage} class="placeholder-profile-image" alt="background_account_creation" />
                            <div id="image-upload_form">
                                <div className="upload_photo" >Upload Photo</div>
                                <input type="submit" value="Continue" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid-col-3">
                    <img src={backgroundAccountCreation} alt="background_account_creation" />
                </div>
            </div>
        </>
    )
}

export default withRouter(Setup_01);
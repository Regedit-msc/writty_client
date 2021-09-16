import { Link, withRouter } from "react-router-dom"
import "../css/setup.css";
import { API_ENDPOINT } from "./url";
import { themeContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { userContext } from "../contexts/userContext";
import InfoBar from "../components/info";
import { useTitle } from "../utils/title";
import backgroundAccountCreation from "../images/background-account-creation.png";
import LogoPlaceholder from "../images/logo.png"


const Setup_02 = ({ history }) => {
    useTitle("Introduce Yourself");

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
                                <h5 class="lnk-prev_next">PREVIOUS</h5>
                                <h5 id="setup-step">STEP 2 OF 5</h5>
                                <h5 class="lnk-prev_next">NEXT</h5>
                            </div>
                            <hr />
                        </header>
                        <div className="setup_body">
                            <div className="setup_message">
                                <h5>Introduce Yourself</h5>
                                Let us know a little about you.
                            </div>
                            <div className="setup_crux">
                                <div>About</div>
                                <textarea></textarea>
                            </div>
                            <input type="submit" value="Done" />
                        </div>
                    </div>
                </div>
                <div className="grid-col-3">
                    <img src={backgroundAccountCreation} />
                </div>
            </div>
        </>
    )
}

export default withRouter(Setup_02);
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


const Setup_05 = ({ history }) => {
    useTitle("Skills");

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
                                <h5 id="setup-step">STEP 5 OF 5</h5>
                                <h5 class="lnk-prev_next">NEXT</h5>
                            </div>
                            <hr />
                        </header>
                        <div className="setup_body">
                            <div className="setup_message">
                                <h5>Skills</h5>
                                Let others know your abilities and areas of expertise.
                            </div>
                            <div className="setup_crux">
                                <div className="skill-instruction">Add a skill. To add multiple, click enter.</div>
                                <input type="text" placeholder="e.g. user interface..." className="skill-input" />
                                <div className="skills-list">
                                    <span>ML Expert</span>
                                    <span>Flutter Developer</span>
                                    <span>Backend</span>
                                    <span>Graphics, UI/UX designer</span>
                                    <span>React Developer</span>
                                </div>
                            </div>
                            <input type="submit" value="Done" />
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

export default withRouter(Setup_05);
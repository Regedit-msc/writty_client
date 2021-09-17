import { withRouter } from "react-router-dom"
import "../css/setup.css";
// import { API_ENDPOINT } from "./url";
// import { themeContext } from "../App";
// import { useContext, useState, useEffect } from "react";
// import { userContext } from "../contexts/userContext";
// import InfoBar from "../components/info";
import { useTitle } from "../utils/title";
// import backgroundAccountCreation from "../images/background-account-creation.png";
// import LogoPlaceholder from "../images/logo.png"

import BaseForm from "../components/step_forms/form";


const Setup_01 = ({ history }) => {
    useTitle("Upload Photo");

    return (
        <>
            <BaseForm />

        </>
    )
}

export default withRouter(Setup_01);
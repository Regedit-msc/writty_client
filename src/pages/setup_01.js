import { withRouter } from "react-router-dom"
import "../css/setup.css";
// import { API_ENDPOINT } from "./url";
// import { themeContext } from "../App";
// import { useContext, useState, useEffect } from "react";
// import { userContext } from "../contexts/userContext";
// import InfoBar from "../components/info";
// import backgroundAccountCreation from "../images/background-account-creation.png";
// import LogoPlaceholder from "../images/logo.png"

import BaseForm from "../components/step_forms/base_form";
import { useEffect } from "react";
import { makePriv } from "../auth_hoc/checkAuth";




const Setup_01 = ({ history }) => {

    useEffect(() => {
        if (localStorage.getItem("new_user") === "notreg") {
            return;
        } else {
            history.replace(localStorage.getItem("last_visited") ?? "/dash");
        };
    }, [history]);
    return (
        <>
            <BaseForm />

        </>
    )
}

export default withRouter(makePriv(Setup_01));
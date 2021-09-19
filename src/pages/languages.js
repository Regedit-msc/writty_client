import { Link, withRouter } from "react-router-dom"
import "../css/forgot.css";
// import { API_ENDPOINT } from "./url";
// import { themeContext } from "../App";
// import { useContext, useState, useEffect } from "react";
// import { userContext } from "../contexts/userContext";
// import InfoBar from "../components/info";
import { useTitle } from "../utils/title";
import LangCSS from "../components/languages/css";



const Languages = () => {
    useTitle("CSS - Overview");

    return (
        <>
            <LangCSS />
        </>
    )
}

export default withRouter(Languages);
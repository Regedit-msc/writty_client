/* eslint-disable no-undef */
import { useNavigate } from "react-router-dom";
import "../css/setup.css";
// import PropTypes from "prop-types"
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
import React from "react";

const Setup_01 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user_token"))
      return navigate("/signup", { replace: true });
    if (
      localStorage.getItem("new_user") === "notreg" ||
      !localStorage.getItem("new_user")
    ) {
      return;
    } else {
      navigate(localStorage.getItem("last_visited") ?? "/dash", {
        replace: true,
      });
    }
  }, [navigate]);
  return (
    <>
      <BaseForm />
    </>
  );
};

export default makePriv(Setup_01);
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useEffect, useState, useContext } from "react";
import { API_ENDPOINT } from "./url";
import { Link } from "react-router-dom"
import SideBar from "../components/sidebar";
import Search from "../images/search-button.svg";
import "../css/public_gists.css";
import "../css/main.css";
import injectSheet from "react-jss";
import { StyleSheet } from "../utils/shimmer";
import { makePriv } from "../auth_hoc/checkAuth";
import { themeContext } from "../App";
import { useTitle } from "../utils/title";
import CustomShimmer from "../components/shimmerComp";
import React from "react";
import LanguageButton from "../components/language_button/language_button";

const Home = (props) => {
  const defaultImage =
    "https://cdn3.vectorstock.com/i/thumb-large/76/57/portrait-young-bearded-man-in-eyeglasses-vector-34397657.jpg";

  useTitle("Public gists.");
  const { theme } = useContext(themeContext);
  const [username, setUsername] = useState();
  const [docs, setDocs] = useState();
  const [docsBackUp, setDocsBackUp] = useState([]);
  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    fetch(`${API_ENDPOINT}/details`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${userToken}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        if (jsonRes.success) {
          setUsername(jsonRes.username);
          // setIsLoading(false);
        } else {
          /// show error
        }
      });
  }, []);
  useEffect(() => {
    fetch(API_ENDPOINT + "/public/docs")
      .then((res) => res.json())
      .then((response) => {
        setDocs(response.message);
        setDocsBackUp(response.message);
        console.log(response.message);
      });
  }, []);

  function handleChange(e) {
    switch (e.target.name) {
      case "search":
        if (e.target.value.length > 3) {
          setDocs(
            docs.filter((d) => d.name.toLowerCase().includes(e.target.value))
          );
        }

        if (e.target.value === "") {
          setDocs(docsBackUp);
        }
        break;
      default:
        break;
    }
  }

  return (
    <>
      <SideBar page="home" />

      <div id="main">
        <h3 id="greeting">
          Hi,{" "}
          {username ? (
            username
          ) : (
            <>
              <CustomShimmer>
                <div className={props.classes.line} />
              </CustomShimmer>
            </>
          )}
        </h3>

        <div
          className={
            theme === "light" ? "search_wrapper_light" : "search_wrapper"
          }
        >
          <button>
            {" "}
            <img className="search-icon" src={Search} alt="search" />{" "}
          </button>
          <input
            className="search"
            type="search"
            name="search"
            placeholder="Search by name"
            onChange={handleChange}
          />
        </div>

        <h4 id="heading">Public Gists</h4>
        <p id="view_code">Codes</p>

        <div id="languages">
          {docs ? (
            docs.map(
              (
                {
                  name,
                  language,
                  // private: priv,
                  publicLink,
                  // collabLink,
                  user,
                },
                index
              ) => {
                return (
                  <div
                    className={
                      theme === "light" ? "language_box_light" : "language_box"
                    }
                    key={index}
                  >
                    <LanguageButton language={language} />
                    <div className={theme === "light" ? "big_light" : "big"}>
                      <Link
                        className="point"
                        to={`/public/editor/${publicLink}`}
                      >
                        {name.slice(0, 6).toUpperCase() + "..."}
                      </Link>
                    </div>
                    <div className="info">
                      <img
                        loading="lazy"
                        src={user?.profileImageUrl ?? defaultImage}
                        alt="user_profile_image"
                      />
                      <Link to={`/@/${user.username}`}>
                        <span>{user.username}</span>
                      </Link>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <>
              <CustomShimmer>
                <div className={props.classes.projectBox} />
              </CustomShimmer>
              <CustomShimmer>
                <div className={props.classes.projectBox} />
              </CustomShimmer>
              <CustomShimmer>
                <div className={props.classes.projectBox} />
              </CustomShimmer>
              <CustomShimmer>
                <div className={props.classes.projectBox} />
              </CustomShimmer>
              <CustomShimmer>
                <div className={props.classes.projectBox} />
              </CustomShimmer>
              <CustomShimmer>
                <div className={props.classes.projectBox} />
              </CustomShimmer>
              <CustomShimmer>
                <div className={props.classes.projectBox} />
              </CustomShimmer>
              <CustomShimmer>
                <div className={props.classes.projectBox} />
              </CustomShimmer>
              <CustomShimmer>
                <div className={props.classes.projectBox} />
              </CustomShimmer>
              <CustomShimmer>
                <div className={props.classes.projectBox} />
              </CustomShimmer>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default makePriv(injectSheet(StyleSheet)(Home));
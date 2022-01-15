/* eslint-disable no-undef */
import "./navbar.css"
import "../../css/main.css";
import "../../css/landing.css";
import LogoPlaceholder from "../../images/logo.png";
import MobileMenu from "../../images/mobile_menu.svg";
import React from "react";
// import Jorja from "../../images/jorja.png"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { API_ENDPOINT } from "../../pages/url";
// import { useCallback } from "react";
import { themeContext } from "../../App";
import { useMemo } from "react";
import { useRef } from "react";
import { debounce } from "@material-ui/core";
import { defaultImage } from "../../utils/defaultProfileImage";
import { MainNavDiv, MobileNavDiv } from "./styles";
const NavBar = () => {
  const { setTheTheme, theme } = useContext(themeContext);
  const location = useLocation();
  const checkBox1 = useRef();
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const onlyInclude = useMemo(
    () => [
      "/gists",
      "/dash",
      "/settings",
      "/chat",
      "/new/gist",
      "/notifications",
      "/feed",
    ],
    []
  );
  const [token, setToken] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const inputRef = useRef();
  const [value, setValue] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("user_token"));
  }, [location]);

  // const searchUsers = useCallback(() => searchByWordOrLetters, [searchByWordOrLetters])
  useEffect(() => {
    inputRef.current = debounce(searchByWordOrLetters, 700);
  }, []);
  function searchByWordOrLetters(v) {
    fetch(API_ENDPOINT + `/search/users?wol=${v}`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setUsers(response.message);
        console.log(response.message);
      });
  }

  useEffect(() => {
    if (onlyInclude.includes(window.location.pathname)) {
      localStorage.setItem("lastVisited", window.location.pathname);
    } else {
      return;
    }
  }, [location, onlyInclude]);
  useEffect(() => {
    if (!token) return;
    fetch(`${API_ENDPOINT}/user/name`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      method: "GET",
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((jsonRes) => {
        setProfileImage(jsonRes.message.profileImageUrl);
        localStorage.setItem(
          "profile_user_pic",
          jsonRes.message.profileImageUrl
        );
        localStorage.setItem("profile_user_id", jsonRes.message._id);
        localStorage.setItem("profile_user_name", jsonRes.message.username);
      })
      .catch(() => {
        localStorage.removeItem("user_token");
        navigate("/auth/login", { replace: true });
        enqueueSnackbar("Unable to sync.", {
          variant: "error",
        });
      });
  }, [token, enqueueSnackbar, navigate]);

  function logOut() {
    localStorage.removeItem("user_token");
    localStorage.setItem("new_user", "notreg");
    localStorage.removeItem("profile_user_image");
    localStorage.removeItem("profile_user_id");
    navigate("/");
  }
  const handleChange = (event) => {
    setValue(event.target.value);
    const input = event.target.value;
    if (event.target.value === "" || input.length < 4) {
      return;
    }
    document.querySelector(".search_suggestions").style.display = "flex";
    inputRef.current(input);
  };
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      document.querySelector(".search_suggestions").style.display = "none";
      setValue("");
      navigate(`/search?user=${value}`, { replace: true });
    }
  }
  function handleTheme(e) {
    if (e.target.checked) {
      setTheTheme("light");
      document.body.classList.replace("dark", "light");
      localStorage.setItem("theme_app", "light");
    } else {
      document.body.classList.replace("light", "dark");
      setTheTheme("dark");
      localStorage.setItem("theme_app", "dark");
    }
  }
  useEffect(() => {
    if (
      document.querySelector(
        theme === "light" ? ".dropdown-content" : ".dropdown-content_dark"
      )?.style.display === "none" ||
      !document.querySelector(
        theme === "light" ? ".dropdown-content" : ".dropdown-content_dark"
      )
    )
      return;
    checkBox1.current.checked = theme === "light" ? true : false;
  }, [theme]);
  return (
    <>
      {location.pathname === "/" || location.pathname === "/home" ? (
        ""
      ) : (
        <>
          <MainNavDiv light={theme === "light"}>
            <ul>
              <li>
                <img className="comments" src={LogoPlaceholder} alt="icon" />
              </li>
              <li>
                <Link
                  to="/gists"
                  className={location.pathname === "/gists" ? "active" : ""}
                >
                  Public Gists
                </Link>
              </li>
              {token ? (
                <li>
                  <Link
                    to="/feed"
                    className={location.pathname === "/feed" ? "active" : ""}
                  >
                    Feed
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
            {token ? (
              <ul className="search-tab">
                <li>
                  <input
                    type="search"
                    name="search"
                    id="search-nav"
                    className="search-c"
                    placeholder="Search"
                    autoComplete="off"
                    onClick={() => {
                      document.querySelector(
                        ".search_suggestions"
                      ).style.display = "flex";
                    }}
                    onChange={handleChange}
                    onFocus={() => {
                      document.querySelector(
                        ".search_suggestions"
                      ).style.display = "flex";
                    }}
                    value={value}
                    onKeyPress={handleKeyPress}
                  />
                </li>

                <div
                  className="search_suggestions"
                  onMouseLeave={() => {
                    document.querySelector(
                      ".search_suggestions"
                    ).style.display = "none";
                  }}
                >
                  {users
                    ? users.map((user, index) => {
                        return (
                          <div key={index}>
                            <div
                              className="search_suggestion"
                              onClick={() => {
                                setValue("");
                                navigate(`/${user?.username}`, {
                                  replace: true,
                                });
                                document.querySelector(
                                  ".search_suggestions"
                                ).style.display = "none";
                              }}
                            >
                              {" "}
                              <img
                                alt="search_user"
                                className="profile-img"
                                src={user?.profileImageUrl ?? defaultImage}
                              />{" "}
                              <span>{user?.username}</span>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </ul>
            ) : (
              <></>
            )}
            {token ? (
              <ul>
                <li className="create-g">
                  <Link to="/new/gist">Create Gist</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/chat">
                    <i className="fas fa-comment-dots"></i>
                  </Link>
                </li>
                <Link to="/notifications">
                  <li>
                    <i className="far fa-bell"></i>
                  </li>
                </Link>

                <li>
                  <Link
                    to={
                      localStorage.getItem("profile_user_name")
                        ? `/${localStorage.getItem("profile_user_name")}`
                        : "/dash"
                    }
                  >
                    <img
                      src={profileImage ?? defaultImage}
                      className="profile-img"
                      alt="profile"
                    />
                  </Link>
                </li>
                <li>
                  <i
                    className="fas fa-chevron-circle-down dropdown"
                    onMouseOver={() => {
                      document.querySelector(
                        theme === "light"
                          ? ".dropdown-content"
                          : ".dropdown-content_dark"
                      ).style.display = "block";
                    }}
                  ></i>
                </li>
                <div
                  className={
                    theme === "light"
                      ? "dropdown-content"
                      : "dropdown-content_dark"
                  }
                  style={{ right: 0 }}
                  onMouseLeave={() => {
                    document.querySelector(
                      theme === "light"
                        ? ".dropdown-content"
                        : ".dropdown-content_dark"
                    ).style.display = "none";
                  }}
                >
                  <p
                    onClick={() => {
                      navigate("/dash");
                      document.querySelector(
                        theme === "light"
                          ? ".dropdown-content"
                          : ".dropdown-content_dark"
                      ).style.display = "none";
                    }}
                  >
                    <i className="fas fa-house-user"></i> <span>Dashboard</span>{" "}
                  </p>
                  <p
                    onClick={() => {
                      navigate("/settings");
                      document.querySelector(
                        theme === "light"
                          ? ".dropdown-content"
                          : ".dropdown-content_dark"
                      ).style.display = "none";
                    }}
                  >
                    <i className="fas fa-sliders-h"></i> <span>Settings</span>
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        marginRight: "1rem",
                      }}
                    >
                      {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </span>{" "}
                    <div className="switch">
                      <input
                        id="toggle1"
                        onChange={handleTheme}
                        className={
                          theme === "light" ? "toggle-round1" : "toggle-round"
                        }
                        name="toggle"
                        type="checkbox"
                        ref={checkBox1}
                      />
                      <label htmlFor="toggle1"></label>
                    </div>
                  </div>
                  <p onClick={logOut}>
                    <i className="fas fa-sign-out-alt"></i>{" "}
                    <span>Sign Out</span>
                  </p>
                </div>
              </ul>
            ) : (
              <></>
            )}
          </MainNavDiv>
          <MobileNavDiv light={theme === "light"}>
            <img className="comments" src={LogoPlaceholder} alt="icon" />
            <img
              className="comments"
              src={MobileMenu}
              alt="icon"
              onClick={() => {
                logOut();
              }}
              style={{ width: "2.5rem" }}
            />
          </MobileNavDiv>
        </>
      )}
    </>
  );
};
export default NavBar;
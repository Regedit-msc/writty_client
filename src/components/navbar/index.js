import "./navbar.css"
import LogoPlaceholder from "../../images/logo.png";
// import Jorja from "../../images/jorja.png"
import { Link, useLocation, useHistory } from "react-router-dom";
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


const NavBar = () => {

    const { theme } = useContext(themeContext);
    const location = useLocation();
    const history = useHistory();
    const [users, setUsers] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const dontInclude = useMemo(() => ["/", '/login', '/register', "/otp", "/setup_01", "/onboard", "/signup"], [])
    const [token, setToken] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const inputRef = useRef();
    useEffect(() => {
        setToken(localStorage.getItem("user_token"));
    }, []);


    // const searchUsers = useCallback(() => searchByWordOrLetters, [searchByWordOrLetters])
    useEffect(() => {
        inputRef.current = debounce(searchByWordOrLetters, 700);
    }, []);
    function searchByWordOrLetters(v) {
        fetch(API_ENDPOINT + `/search/users?wol=${v}`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem("user_token")}`
            },
            method: "GET",
        }).then(res => res.json()).then((response) => {
            setUsers(response.message);
            console.log(response.message);
        });
    }

    useEffect(() => {
        if (dontInclude.includes(window.location.pathname)) {
            return;
        } else {
            localStorage.setItem("lastVisited", window.location.pathname);
        }

    }, [location, dontInclude]);
    useEffect(() => {
        if (!token) return;
            fetch(`${API_ENDPOINT}/user/name`, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.getItem("user_token")}`
                },
                method: "GET",
            }).then(res => {
                if (res.ok) return res.json();
                return res.json().then(json => Promise.reject(json));
            }
            ).then(jsonRes => {
                setProfileImage(jsonRes.message.profileImageUrl);
                localStorage.setItem("profile_user_pic", jsonRes.message.profileImageUrl);
                localStorage.setItem("profile_user_name", jsonRes.message.username);
            }).catch(() => {
                enqueueSnackbar("Unable to sync.", {
                    variant: "error"
                });
            });
    }, [token, enqueueSnackbar]);
    const notAllowed = ["/", "/register", "/login", "/otp", "/onboard", "/chat"];

    function logOut() {
        localStorage.removeItem("user_token");
        localStorage.removeItem("profile_user_image");
        history.push('/');
    }
    const handleChange = (event) => {
        const input = event.target.value;
        if (event.target.value === "" || input.length < 4) {
            return;
        }
        document.querySelector(".search_suggestions").style.display = "flex";
        inputRef.current(input);
    };

    return <>
        {
            notAllowed.includes(location.pathname) || location.pathname.includes("chat") || location.pathname.includes("setup") ? '' :
                <nav className={theme === "light" ? "navbar" : "navbar_dark"}>
                    <ul>
                        <li>
                            <img className="comments" src={LogoPlaceholder} alt="icon" />
                        </li>
                        <li><Link to="/gists" className={location.pathname === "/gists" ? "active" : ""}>Public Gists</Link></li>
                        {token ? <li><Link to="/feed" className={location.pathname === "/feed" ? "active" : ""}>Feed</Link></li> : <></>}
                    </ul>
                    {
                        token ? <ul className="search-tab">
                            <li><input type="search" name="search" id="search-nav" class="search-c" placeholder="Search" autoComplete="off" onClick={() => {
                                document.querySelector(".search_suggestions").style.display = "flex";
                            }} onChange={handleChange} onFocus={
                                () => {
                                    document.querySelector(".search_suggestions").style.display = "flex";
                                }
                            } /></li>

                            <div className="search_suggestions" onMouseLeave={() => {
                                document.querySelector(".search_suggestions").style.display = "none";
                            }}>
                                {
                                    users ? users.map((user, index) => {
                                        return <div key={index}>


                                            <div className="search_suggestion" onClick={() => {
                                                history.replace(`/@/${user?.username}`);
                                                document.querySelector(".search_suggestions").style.display = "none";
                                            }}> <img alt="search_user" className="profile-img" src={user?.profileImageUrl ?? defaultImage} /> <span>{user?.username}</span></div>
                                        </div>
                                    }) : ''
                                }

                            </div>
                        </ul> : <></>
                    }
                    {
                        token ? <ul>
                            <li className="create-g"><Link to="#">Create Gist</Link></li>
                            <li > <Link to="/chat"><i class="fas fa-comment-dots"></i></Link></li>
                            <li><i className="far fa-bell"></i></li>
                            <li><Link to="/dash" ><img src={profileImage ?? defaultImage} className="profile-img" alt="profile" /></Link></li>
                            <li><i className="fas fa-chevron-circle-down dropdown" onMouseOver={() => {

                                document.querySelector(theme === "light" ? ".dropdown-content" : ".dropdown-content_dark").style.display = "block"
                            }}
                            ></i></li>
                            <div className={theme === "light" ? "dropdown-content" : "dropdown-content_dark"} style={{ right: 0 }} onMouseLeave={() => {
                                document.querySelector(theme === "light" ? ".dropdown-content" : ".dropdown-content_dark").style.display = "none"
                            }} >
                                <p onClick={() => {
                                    history.push("/dash");
                                    document.querySelector(theme === "light" ? ".dropdown-content" : ".dropdown-content_dark").style.display = "none";
                                }}  ><i className="fas fa-house-user"  ></i> <span>Dashboard</span> </p>
                                <p
                                    onClick={() => {
                                        history.push("/settings");
                                        document.querySelector(theme === "light" ? ".dropdown-content" : ".dropdown-content_dark").style.display = "none";
                                    }}

                                ><i class="fas fa-sliders-h"></i>  <span>Settings</span></p>
                                <p onClick={logOut} ><i className="fas fa-sign-out-alt"></i>  <span>Sign Out</span></p>
                            </div>
                        </ul> :
                            (
                                <></>
                            )
                    }
                </nav>

        }

    </>
}
export default NavBar;
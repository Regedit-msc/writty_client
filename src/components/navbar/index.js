import "./navbar.css"
import LogoPlaceholder from "../../images/logo.png";
import Jorja from "../../images/jorja.png"
import { Link, useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { API_ENDPOINT } from "../../pages/url";
import { useCallback } from "react";
import { themeContext } from "../../App";


const NavBar = () => {
    const { theme } = useContext(themeContext);
    const location = useLocation();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [token, setToken] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    useEffect(() => {
        setToken(localStorage.getItem("user_token"));
    }, []);
    const getProfileImage = useCallback((tokenKey) => {
        fetch(`${API_ENDPOINT}/user/name`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${tokenKey}`
            },
            method: "GET",
        }).then(res => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        }
        ).then(jsonRes => {
            setProfileImage(jsonRes.message.profileImageUrl);
            localStorage.setItem("profile_user_name", jsonRes.message.username);
        }).catch(() => {
            enqueueSnackbar("Unable to sync.", {
                variant: "error"
            });
        });
    }, [enqueueSnackbar])


    useEffect(() => {
        if (!token) return;
        getProfileImage(token);
    }, [token, getProfileImage]);
    const notAllowed = ["/", "/register", "/login"];

    function logOut() {
        localStorage.removeItem("user_token");
        history.push('/');
    }

    return <>
        {
            notAllowed.includes(location.pathname) || location.pathname.includes("chat") ? '' :
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
                            <li><input type="search" name="search" id="search-nav" class="search-c" placeholder="Search" autoComplete="off" /></li>
                        </ul> : <></>
                    }
                    {
                        token ? <ul>
                            <li className="create-g"><Link to="#">Create Gist</Link></li>
                            <li><i className="far fa-envelope"></i></li>
                            <li><i className="far fa-bell"></i></li>
                            <li><Link to="/dash" ><img src={profileImage ?? Jorja} class="profile-img" alt="profile" /></Link></li>
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
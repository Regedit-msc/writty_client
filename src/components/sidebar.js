import "./sidebar.css";
import { useContext } from "react"
import { Link, withRouter } from "react-router-dom"
import FaceBook from "../images/facebook-icon.png";
import Github from "../images/github-icon.png";
import LinkedIn from "../images/linkedin-icon.png"
import { themeContext } from "../App";

const SideBar = ({ page, history }) => {
    const { theme } = useContext(themeContext);
    function logOut() {
        localStorage.removeItem("user_token");
        history.push('/');
    }
    let themeToUse = (theme === "light" ? "focus_light" : "focus");

    return (
        <div id={theme === "light" ? "sidenav_light" : "sidenav"}>
            <h3 id={theme === "light" ? "gists_light" : "gists"}>GISTS.</h3>
            <div id={theme === "light" ? "links_light" : "links"}>
                <Link to="/home" className="point" id={page === "home" ? themeToUse : ""} ><span><p>Home</p></span> </Link>
                <Link to="/dash" id={page === "gists" ? themeToUse : ""} className="point" ><span>Your gists</span> </Link>
                <Link to="/settings" className="point" id={page === "settings" ? themeToUse : ""}><span>Settings</span> </Link>
                <Link to="" onClick={logOut} className="point"><span>Logout</span> </Link>
            </div>

            <div id="socials">
                <img src={FaceBook} alt="Facebook" className="point" />
                <img src={LinkedIn} alt="LinkedIn" className="point" />
                <img src={Github} alt="Github" className="point" />
            </div>

        </div>
    )
}
export default withRouter(SideBar);
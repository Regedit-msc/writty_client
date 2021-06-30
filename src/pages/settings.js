import SideBar from "../components/sidebar";
import Jorja from "../images/jorja.png";
import "../css/account_settings.css";
import "../css/main.css"
import { Link } from "react-router-dom"
import { themeContext } from "../App";
import { useContext, useRef, useEffect } from "react";
import { makePriv } from "../auth_hoc/checkAuth";
const Settings = () => {
    const checkBox1 = useRef();
    const { setTheTheme, theme } = useContext(themeContext)

    useEffect(() => {
        checkBox1.current.checked = theme === "light" ? true : false
    }, [theme])

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
    return (
        <>
            <SideBar
                page="settings"
            />
            <div id="main">
                <h4 id="settings">Account Settings</h4>
                <div>
                    <img src={Jorja} id="profile_pic1" />
                    <Link id={theme === "light" ? "change_button_light" : "change_button"}>Change</Link>
                </div>
                <div>
                    <div id={theme === "light" ? "form1_light" : "form1"}>
                        <input type="text" id={theme === "light" ? "Name_light" : "Name"} name="Name" placeholder="NAME" />
                        <input type="email" id={theme === "light" ? "Email_light" : "Email"} name="Email" placeholder="EMAIL" />
                        <input type="password" id={theme === "light" ? "Password_light" : "Password"} name="Password" placeholder="PASSWORD" />
                        <div id={theme === "light" ? "dark_mode_light" : "dark_mode"}>
                            <span>Dark Mode</span>
                            <div class="switch">
                                <input id="toggle1" onChange={handleTheme} className={theme === "light" ? "toggle-round1" : "toggle-round"} name="toggle" type="checkbox" ref={checkBox1} />
                                <label for="toggle1"></label>
                            </div>
                        </div>
                        <input type="submit" value="SAVE CHANGES" />
                    </div>
                </div>

            </div>
        </>
    )
}
export default makePriv(Settings)
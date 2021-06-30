import { Link } from "react-router-dom"
import "../css/signup.css";
import { themeContext } from "../App";
import { useContext, useEffect } from "react";

const Signup = () => {
    const { theme } = useContext(themeContext);
    return (
        <>

            <h3 id={theme === "light" ? "form_head_signup_light" : "form_head_signup"}>SIGNUP</h3>
            <div id={theme === "light" ? "form_signup_light" : "form_signup"}>
                <input type="email" id="Email_signup" name="Email" placeholder="Email"></input>
                <input type="text" id="Username_signup" name="Username" placeholder="Username" />
                <input type="password" id="Password_signup" name="Password" placeholder="Password" />
            </div>
            <div id="submit_box">
                <input id={theme === "light" ? "submit_signup_light" : "submit_signup"} type="submit" value="Submit" />
                <Link to="/login" id={theme === "light" ? "login_link_light" : "login_link"}>Have an Account?</Link>
            </div>
        </>
    )
}

export default Signup;
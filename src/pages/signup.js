import { Link, withRouter } from "react-router-dom"
import "../css/signup.css";
import { themeContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { API_ENDPOINT } from "./url";
import { useTitle } from "../utils/title";
import { useSnackbar } from 'notistack';
import LogoPlaceholder from "../images/logo.png"
import Google from "../images/google-icon.png"
import GitHub from "../images/github-icon.png"
import SignupBackgroundImage from "../images/login-background.png"
const Signup = ({ history }) => {
    const { enqueueSnackbar } = useSnackbar();
    useTitle("Sign Up.")
    const { theme } = useContext(themeContext);
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        email: ""
    });

    useEffect(() => {

        const token = localStorage.getItem("user_token");
        if (token) {
            enqueueSnackbar("Auto login.", { variant: "success" })
            history.replace('/dash')
        }
    }, [enqueueSnackbar, history])
    function handleChange(e) {
        switch (e.target.name) {
            case "username":
                setFormState({ ...formState, username: e.target.value })
                break;
            case "password":
                setFormState({ ...formState, password: e.target.value })
                break;
            case "email":
                setFormState({ ...formState, email: e.target.value });
                break;
            default:
                break;
        }
    }
    function handleSubmit() {
        console.log(formState);
        fetch(`${API_ENDPOINT}/register`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            method: "POST",
            body: JSON.stringify(formState)
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes)
            if (jsonRes.success) {
                console.log(jsonRes)
                enqueueSnackbar("You are all set proceed to login.");



            } else {
                enqueueSnackbar(jsonRes.message);
            }
        })
    }

    return (
        <>
            <div className={theme === "light" ? "signup-main_light" : "signup-main"}>
                <div>
                    <Link to="/home"><img src={LogoPlaceholder} className="logo" alt="Logo Placeholder" /></Link>
                </div>

                <div>
                    <div id={theme === "light" ? "signup_form_box_light" : "signup_form_box"}>
                        <header>
                            <h3 id={theme === "light" ? "signup_form_head_light" : "signup_form_head"}>Join Live-Gists</h3>
                            <hr />
                        </header>
                        <div id={theme === "light" ? "signup_form_light" : "signup_form"}>
                            <div>
                                Username
                                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                            </div>
                            <div>
                                Email Address
                                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
                            </div>
                            <div>
                                Password
                                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                            </div>
                            <div>
                                Password Confirmation
                                <input type="password" name="Password Confirmation" placeholder="Confirm Password" />
                            </div>
                            <input type="submit" value="Join Live-Gists" onClick={handleSubmit} />
                            <div>
                                <hr className={theme === "light" ? "or_light" : "or"} data-content="OR" />
                            </div>
                                <div className="signup_options">
                                <img src={Google} alt="Google Logo" />
                                        <span>
                                            Sign Up with Google
                                        </span>
                                </div>

                                <div className="signup_options">
                                <img src={GitHub} alt="GitHub Logo" />
                                        <span>
                                            Sign Up with GitHub
                                        </span>
                                </div>
                        </div>
                        <div id="signup_footer">
                            <div id="signup_policy"><span>By signing up, you agree to our </span><Link to="#">Terms </Link><span>and </span><Link to="#">Privacy Policy</Link>.</div>
                            <div><span>Already have an account?</span> <Link to="/login">Login</Link></div>
                        </div>
                    </div>
                </div>
                <div className="grid-col-3">
                    <img src={SignupBackgroundImage} alt="Signup Background" />
                </div>

            </div>
        </>
    )
}

export default withRouter(Signup);
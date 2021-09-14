import { Link, withRouter } from "react-router-dom"
import "../css/login.css";
import { API_ENDPOINT } from "./url";
import { themeContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { userContext } from "../contexts/userContext";
import InfoBar from "../components/info";
import { useTitle } from "../utils/title";
import GoogleLogin from 'react-google-login';
import { useSnackbar } from 'notistack';
import LoginGithub from 'react-login-github';
import LogoPlaceholder from "../images/logo.png"
import Google from "../images/google-icon.png"
import GitHub from "../images/github-icon.png"
import LoginBackgroundImage from "../images/login-background.png"

const Login = ({ history }) => {
    const { enqueueSnackbar } = useSnackbar();
    useTitle("Login.")
    const [err, setErr] = useState();
    const [showErr, setShowErr] = useState(false);
    const { theme } = useContext(themeContext);
    const { setUserToken } = useContext(userContext);
    const [formState, setFormState] = useState({
        username: '',
        password: '',
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
            default:
                break;
        }
    }
    function handleSubmit() {
        console.log(formState);
        fetch(`${API_ENDPOINT}/login`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            method: "POST",
            body: JSON.stringify(formState)
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes)
            if (jsonRes.success) {
                setUserToken(jsonRes.message);


                history.replace('/dash');

            } else {
                enqueueSnackbar(jsonRes.message, {
                    variant: "error"
                });
            }
        })
    }

    function PopupBlocked() {
        var PUtest = window.open(null, "", "width=1,height=1");
        try { PUtest.close(); return false; }
        catch (e) { return true; }
    }
    const responseGoogle = (d) => {

        if (PopupBlocked()) {
            setErr("You have to enable popups to use this feature.");
            setShowErr(true);
            setTimeout(() => {
                setErr("");
                setShowErr(false);
            }, 3000)

        }
        else {
            saveToken(d.accessToken, 'google');
        }
    };

    const saveToken = async (access_token, provider) => {
        const payload = {
            access_token
        };
        const payloadG = {
            code: access_token
        };
        console.log(access_token, "Access token");
        fetch(`${API_ENDPOINT}/login/${provider}`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            method: "POST",
            body: provider === "google" ? JSON.stringify(payload)
                : JSON.stringify(payloadG)
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes)
            if (jsonRes.success) {
                setUserToken(jsonRes.message);
                console.log("Success", jsonRes)

                history.replace('/dash');

            } else {
                setErr(jsonRes.message);
                setShowErr(true);
                setTimeout(() => {
                    setErr("");
                    setShowErr(false);
                }, 3000)
            }
        })
    };
    const onSuccess = ({ code }) => {
        saveToken(code, "github")
    };
    const onFailure = response => {
        console.log(response);
        enqueueSnackbar("Github auth failed.", { variant: "error" })
    };
    return (
        <>
            {showErr ? <InfoBar
                color="red"
                text={err}
            /> : ""}

            <div className={theme === "light" ? "login-main_light" : "login-main"}>
                <div>
                    <Link to="/home"><img src={LogoPlaceholder} className="logo" alt="Logo Placeholder" /></Link>
                </div>

                <div>
                    <div id={theme === "light" ? "login_form_box_light" : "login_form_box"}>
                        <header>
                            <h3 id={theme === "light" ? "login_form_head_light" : "login_form_head"}>Login</h3>
                            <hr />
                        </header>
                        <div id={theme === "light" ? "login_form_light" : "login_form"}>
                            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                            <input type="submit" value="Login" onClick={handleSubmit} />
                            <div>
                                <hr className={theme === "light" ? "or_light" : "or"} data-content="OR" />
                            </div>

                            <GoogleLogin
                                clientId={process.env.REACT_APP_G_CLIENT_ID}
                                render={(renderProps) => (
                                    <div className="login_options"
                                        onClick={() => {
                                            renderProps.onClick();
                                        }}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img src={Google} alt="Google Logo" />
                                        <p>
                                            Sign in with Google
                                        </p>
                                    </div>
                                )}
                                buttonText='Login'
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                isSignedIn={false}
                                cookiePolicy={'single_host_origin'}
                            />


                            <div className="login_options github">
                                <img src={GitHub} alt="GitHub Logo" />
                                <LoginGithub
                                    clientId={process.env.REACT_APP_GH_CLIENT_ID}
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                />
                            </div>
                        </div>
                        <div id="login_footer">
                            <div><Link to="#">Forgot Password?</Link></div>
                            <div><span>Don't have an account?</span> <Link to="/signup" class="signup_link">Sign up</Link></div>
                        </div>
                    </div>
                </div>
                <div className="grid-col-3">
                    <img src={LoginBackgroundImage} alt="Login Background" />
                </div>

            </div>
        </>
    )
}

export default withRouter(Login);
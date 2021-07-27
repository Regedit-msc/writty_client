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


    const responseGoogle = (d) => {
        function PopupBlocked() {
            var PUtest = window.open(null, "", "width=1,height=1");
            try { PUtest.close(); return false; }
            catch (e) { return true; }
        }

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
    const onFailure = response => enqueueSnackbar("Github auth failed.", { variant: "error" });
    return (
        <>
            {showErr ? <InfoBar
                color="red"
                text={err}
            /> : ""}
            <h3 id={theme === "light" ? "form_head_login_light" : "form_head_login"}>LOGIN</h3>
            <div id={theme === "light" ? "form_login_light" : "form_login"}>
                <input type="text" id="Username" name="username" placeholder="Username" onChange={handleChange} />
                <input type="password" id="Password" name="password" placeholder="Password" onChange={handleChange} />
            </div>
            <div id="submit_box">
                <input type="button" id={theme === "light" ? "submit_login_light" : "submit_login"} onClick={handleSubmit} value="Submit" />
                <GoogleLogin
                    clientId={process.env.REACT_APP_G_CLIENT_ID}
                    render={(renderProps) => (
                        <button
                            onClick={() => {
                                renderProps.onClick();
                            }}
                        >
                            Google
                        </button>
                    )}
                    buttonText='Login'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    isSignedIn={false}
                    cookiePolicy={'single_host_origin'}
                />
                <LoginGithub clientId={process.env.REACT_APP_GH_CLIENT_ID}
                    onSuccess={onSuccess}
                    onFailure={onFailure}

                />
                <Link to="/signup" id={theme === "light" ? "signup_link_light" : "signup_link"}>Not yet registered?</Link>
            </div>


        </>
    )
}

export default withRouter(Login);
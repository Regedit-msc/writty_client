import { Link, withRouter } from "react-router-dom"
import "../css/login.css";
import { API_ENDPOINT } from "./url";
import { themeContext } from "../App";
import { useContext, useState } from "react";
import { userContext } from "../contexts/userContext";
import InfoBar from "../components/info";

const Login = ({ history }) => {
    const [err, setErr] = useState();
    const [showErr, setShowErr] = useState(false);
    const { theme } = useContext(themeContext);
    const { setUserToken } = useContext(userContext);
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });
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


                history.push('/dash');

            } else {
                setErr(jsonRes.message);
                setShowErr(true);
                setTimeout(() => {
                    setErr("");
                    setShowErr(false);
                }, 3000)
            }
        })
    }
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
                <Link to="/signup" id={theme === "light" ? "signup_link_light" : "signup_link"}>Not yet registered?</Link>
            </div>
        </>
    )
}

export default withRouter(Login);
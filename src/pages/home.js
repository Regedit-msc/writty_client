import { useEffect, useState, useContext } from "react";
import { API_ENDPOINT } from "./url";
import { Link } from "react-router-dom"
import SideBar from "../components/sidebar";
import Search from "../images/search-button.svg";
import "../css/public_gists.css";
import "../css/main.css";
import Jorja from "../images/jorja.png";
import { makePriv } from "../auth_hoc/checkAuth";
import { themeContext } from "../App";




const Home = () => {
    const { theme } = useContext(themeContext);
    const [username, setUsername] = useState();
    const [docs, setDocs] = useState();
    // const [setIsLoading] = useState(true);
    const [docsBackUp, setDocsBackUp] = useState([]);
    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        fetch(`${API_ENDPOINT}/details`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${userToken}`
            },
            method: "GET",
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes);
            if (jsonRes.success) {
                setUsername(jsonRes.username);
                // setIsLoading(false);
            } else {
                /// show error 
            }
        })
    }, []);
    useEffect(() => {
        fetch(API_ENDPOINT + "/public/docs").then(res => res.json()).then((response) => {
            setDocs(response.message);
            setDocsBackUp(response.message)
            console.log(response.message)
        });
    }, []);

    function handleChange(e) {
        switch (e.target.name) {
            case "search":
                if (e.target.value.length > 3) {
                    setDocs(docs.filter((d) => d.name.toLowerCase().includes(e.target.value)));
                }

                if (e.target.value === "") {
                    setDocs(docsBackUp);
                }
                break;
            default:
                break;
        }
    }

    return (

        <>
            <SideBar
                page="home"
            />

            <div id="main">
                <h3 id="greeting">Hi, {username ?? "Noob coder."}</h3>

                <div className={theme === "light" ? "search_wrapper_light" : "search_wrapper"}>
                    <button> <img className="search-icon" src={Search} alt="search" /> </button>
                    <input className="search" type="search" name="search" placeholder="Search by name" onChange={handleChange} />
                </div>

                <h4 id="heading">Public Gists</h4>
                <p id="view_code">Codes</p>

                <div id="languages">
                    {
                        docs && docs.map(({
                            name,
                            _id,
                            language,
                            private: priv,
                            publicLink,
                            collabLink,
                            user
                        }) => {
                            return (
                                <div className={theme === "light" ? "language_box_light" : "language_box"} key={_id}>
                                    <div className="language_button" id={language[0].toUpperCase() + language.slice(1, language.length)}>{language[0].toUpperCase() + language.slice(1, language.length)}</div>
                                    <div className={theme === "light" ? "big_light" : "big"}><Link className="point" to={`/public/editor/${publicLink}`}>{name.slice(0, 6).toUpperCase() + "..."}</Link></div>
                                    <div className="info">
                                        <img src={Jorja} alt="user_profile_image" />
                                        <span>{user.username}</span>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        </>



    );
}

export default makePriv(Home);
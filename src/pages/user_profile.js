import { useContext } from "react"
import { API_ENDPOINT } from "./url"
import { Link, withRouter } from "react-router-dom"
import { Controlled as CodeMirror } from 'react-codemirror2';
import "../css/user_profile.css";
import { themeContext } from "../App";
import Search from "../images/search-button.svg";
import FaceBook from "../images/facebook-icon.png";
import Github from "../images/github-icon.png";
import LinkedIn from "../images/linkedin-icon.png"
import LiveLogo from "../images/livegists_logo.png";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { useTitle } from "../utils/title";
import Code from "../images/code.svg";
import like from "../images/like.png";
import Mail from "../images/mail.png"
import notLike from "../images/not_like.png"
import comment from "../images/comments.png";
import moment from "moment";
import InfoBar from "../components/info";
import injectSheet from "react-jss";
import { StyleSheet } from "../utils/shimmer";
import CustomShimmer from "../components/shimmerComp";

const UserProfile = (props) => {

    const { name } = useParams();
    useTitle(name.toUpperCase() + "'s Profile page");
    const { theme } = useContext(themeContext);
    const [info, setInfo] = useState();
    const [showInfo, setShowInfo] = useState(false);
    const [err, setErr] = useState();
    const [showErr, setShowErr] = useState(false);
    const [docsB, setDocsB] = useState([]);
    const [userData, setUserData] = useState(null);
    const [userID, setUserID] = useState('');
    useEffect(() => {
        fetch(API_ENDPOINT + `/details/public?name=${name.trim()}`).then(res => res.json()).then((response) => {
            if (response.success) {
                setUserData(response.message);
                setDocsB(response.message.code);
                setUserID(response.message.userID);
            } else {
                props.history.push('/user_does_not_exist')
            }

        });
    }, [name, props.history]);


    function sortBy(stringToSortBy) {
        switch (stringToSortBy) {
            case "date":
                setUserData({ ...userData, code: [...userData.code.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))] });
                break;
            case "name":
                console.log([...userData.code.sort(

                    function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    }
                )])
                setUserData({ ...userData, code: [...userData.code.sort()] });
                break;
            default:
                setUserData(userData);
                break;
        }
    }
    function handleChange(e) {
        console.log(e.target.value);
        switch (e.target.name) {
            case "sort":
                sortBy(e.target.value);
                break;
            case "search":
                if (e.target.value.length > 3) {
                    setUserData({ ...userData, code: [...userData.code.filter((d) => d.language.toLowerCase().includes(e.target.value))] });
                }

                if (e.target.value === "") {
                    setUserData({ ...userData, code: docsB });
                }
                break;
            default:
                break;
        }

    }
    function handleCopy(val, text) {
        navigator.clipboard.writeText(val);
        setInfo(text);
        setShowInfo(true);
        setTimeout(() => {
            setInfo("");
            setShowInfo(false);
        }, 3000)
    }


    function handleLikeClick(id) {
        fetch(`${API_ENDPOINT}/like`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            },
            method: "POST",
            body: JSON.stringify({ publicLink: id })

        }).then(res => res.json()
        ).then(jsonRes => {

            console.log(jsonRes);
            if (jsonRes.success) {
                let newArr = [];
                for (let i = 0; i < userData.code.length; i++) {
                    if (userData.code[i].publicLink === id) {
                        newArr.push({
                            ...userData.code[i],
                            likes: userData.code[i]?.likes.findIndex(e => e.user === userID) === -1 ? [...userData.code[i]?.likes, { user: userID }] : [...userData.code[i]?.likes.filter(e => e.user !== userID)]
                        })
                    } else {
                        newArr.push(userData.code[i])
                    }

                }

                setUserData({ ...userData, code: newArr });
            } else {
                setErr("You have to be logged in to like.");
                setShowErr(true);
                setTimeout(() => {
                    setErr("");
                    setShowErr(false);
                }, 3000)

            }
        })
    }


    function handleCommentClick(id) {
        props.history.push(`/comments/editor/${id}`)

    }

    return (
        <>

            {showInfo ? <InfoBar
                color="green"
                text={info}
            /> : ""}
            {showErr ? <InfoBar
                color="red"
                text={err}
            /> : ""}
            <div className={theme === "light" ? "the_user_page_light" : "the_user_page"}>
                <div className={theme === "light" ? "side_info_light" : "side_info"}>
                    <Link to="/gists" className={theme === "light" ? "profile_pubgists_light" : "profile_pubgists"}>Public Gists.</Link>
                    <div className="invisible_side">
                        <div className={theme === "light" ? "nice_box_light" : "nice_box"}>
                            {userData ? <img alt="profile" src={userData.image} className="big_profile_pic" /> :
                                <CustomShimmer>
                                    <div className={props.classes.circleBig} />
                                </CustomShimmer>
                            }
                            <span>{name}</span>

                            <div className={theme === "light" ? "connect_boxes_light" : "connect_boxes"}>
                                <Link onClick={() => handleCopy(userData.email, "Copied email to clipboard.")}  >Connect</Link>
                                <Link to={`/@/${name}/chat`} >Chat</Link>
                            </div>
                            {/* className={theme === "light" ? "connect_light" : "connect"} */}
                        </div>
                        <div className={theme === "light" ? "email_label_light" : "email_label"}>
                            <img src={Mail} alt="email" />
                            {userData !== null ? userData.email : <CustomShimmer>
                                <div className={props.classes.line} />
                            </CustomShimmer>}
                        </div>
                    </div>

                    <div id="socials">
                        <Link to={{ pathname: "https://www.facebook.com/efusanyaayomide/" }} target="_blank" rel="noopener noreferrer">
                            <img src={FaceBook} alt="Facebook" className="point" />
                        </Link>
                        <Link to={{ pathname: "https://www.linkedin.com/in/efusanya-ayomide-692008192/" }} target="_blank" rel="noopener noreferrer">
                            <img src={LinkedIn} alt="LinkedIn" className="point" />
                        </Link>
                        <Link to={{ pathname: "https://www.github.com/regedit-msc" }} target="_blank" rel="noopener noreferrer">
                            <img src={Github} alt="Github" className="point" />
                        </Link>
                    </div>
                </div>

                <div className="gists_body">
                    <div className={theme === "light" ? "search_wrapper_light" : "search_wrapper"}>
                        <button> <img className="search-icon" src={Search} alt="search" /> </button>
                        <input className="search" type="search" name="search" placeholder="Search by language" onChange={handleChange} />
                    </div>
                    <div className={theme === "light" ? "gists_buttons_light" : "gists_buttons"}>
                        <button> All gists <span style={{ fontSize: "15px", marginLeft: "20px" }}>{userData !== null ? userData.code.length : 0}</span></button>
                        <select name="sort" placeholder="Sort By" onChange={handleChange} >
                            <option value="date">Date</option>
                            <option value="name">Name</option>

                        </select>
                    </div>
                    <div className="personal_gists">

                        {
                            userData !== null ? userData.code.map((doc, index) => {
                                return <div key={index}>
                                    <div className={theme === "light" ? "mac1_light" : "mac1"}>
                                        <img src={Code} alt="mac_buttons" />
                                        <p>{moment(doc.createdAt).startOf('hour').fromNow()}</p>
                                        <p >{doc.name.toUpperCase()} / <span className="language_button" style={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "2px", paddingBottom: "2px" }} id={doc.language[0].toUpperCase() + doc.language.slice(1, doc.language.length)}>{doc.language[0].toUpperCase() + doc.language.slice(1, doc.language.length)} </span>   </p>

                                    </div>
                                    <CodeMirror
                                        className="code11"
                                        value={doc.data}
                                        options={{
                                            lineWrapping: true,
                                            lint: true,
                                            mode: doc?.language,
                                            theme: "elegant",
                                            lineNumbers: false,
                                            scrollbarStyle: "null"
                                        }}
                                    />
                                    <div className={theme === "light" ? "mac2_light" : "mac2"}>

                                        <p className="user_info"><img className="profile_pic" src={doc.user?.profileImageUrl ?? LiveLogo} alt="profile." /></p>

                                        <div className="like_comment">
                                            <div id="likes"><img src={doc?.likes?.findIndex(e => e.user === userID) === -1 ? notLike : like} alt="like button" onClick={() => handleLikeClick(doc.publicLink)} /> <span>{doc?.likes?.length ?? 0}</span></div>

                                            <div id="comments"><img src={comment} alt="comment button" onClick={() => handleCommentClick(doc.publicLink)} /> <span>{doc?.comments?.length ?? 0}</span></div>
                                        </div>
                                    </div>
                                </div>



                            }) : <div>
                                <div >

                                        <CustomShimmer>
                                        <div className={props.classes.codeBox} />
                                        </CustomShimmer>
                                </div>
                                    <div >

                                        <CustomShimmer>
                                            <div className={props.classes.codeBox} />
                                        </CustomShimmer>
                                    </div>
                                <div>


                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>


        </>
    )
}
export default withRouter(injectSheet(StyleSheet)(UserProfile));
import "./profile.css"
import "../../css/user_profile.css"
// import Jorja from "../../images/jorja.png";
import like from "../../images/like.png";
// import Mail from "../images/mail.png";
import { API_ENDPOINT } from "../../pages/url"
import notLike from "../../images/not_like.png"
import comment from "../../images/comments.png";
import moment from "moment";
import Code from "../../images/code.svg";
import { useState, useEffect, useContext } from "react"
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Link, useParams, withRouter } from "react-router-dom";
import { useTitle } from "../../utils/title";
import injectSheet from "react-jss";
import { StyleSheet } from "../../utils/shimmer";
import CustomShimmer from "../shimmerComp";
import InfoBar from "../info";
import LiveLogo from "../../images/livegists_logo.png";
import { themeContext } from "../../App";
const Profile = (props) => {
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


    // function sortBy(stringToSortBy) {
    //     switch (stringToSortBy) {
    //         case "date":
    //             setUserData({ ...userData, code: [...userData.code.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))] });
    //             break;
    //         case "name":
    //             console.log([...userData.code.sort(

    //                 function (a, b) {
    //                     if (a.name > b.name) {
    //                         return 1;
    //                     }
    //                     if (b.name > a.name) {
    //                         return -1;
    //                     }
    //                     return 0;
    //                 }
    //             )])
    //             setUserData({ ...userData, code: [...userData.code.sort()] });
    //             break;
    //         default:
    //             setUserData(userData);
    //             break;
    //     }
    // }
    // function handleChange(e) {
    //     console.log(e.target.value);
    //     switch (e.target.name) {
    //         case "sort":
    //             sortBy(e.target.value);
    //             break;
    //         case "search":
    //             if (e.target.value.length > 3) {
    //                 setUserData({ ...userData, code: [...userData.code.filter((d) => d.language.toLowerCase().includes(e.target.value))] });
    //             }

    //             if (e.target.value === "") {
    //                 setUserData({ ...userData, code: docsB });
    //             }
    //             break;
    //         default:
    //             break;
    //     }

    // }
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
        console.log(docsB);
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
    return <>
        {showInfo ? <InfoBar
            color="green"
            text={info}
        /> : ""}
        {showErr ? <InfoBar
            color="red"
            text={err}
        /> : ""}
        <main>
            <section className="profile-container">
                <div>


                    {userData ? <img className="display-p" src={userData?.image} alt="dp" /> :
                        <CustomShimmer>
                            <div className={props.classes.circleBig} />
                        </CustomShimmer>
                    }

                    <p>{name}</p>
                    <p className="graphics">Graphics, UI/UX Designer</p>
                </div>
                <div>
                    <p>
                        246
                        <br />
                        <span className="sub-p">Followers</span>
                    </p>
                    <p>
                        87
                        <br />
                        <span className="sub-p">Following</span>
                    </p>
                    <p>
                        {userData !== null ? userData?.code?.length : 0}
                        <br />
                        <span className="sub-p"> Gists</span>
                    </p>
                </div>
                <div>
                    {
                        name === localStorage.getItem("profile_user_name") ? "" : <>
                            <p>
                                <Link to="/dash">Follow</Link>
                            </p>
                            <p>
                                <Link to={`/@/${name}/chat`}>Message</Link>
                            </p>
                            <p>
                                <Link onClick={() => handleCopy(userData.email, "Copied email to clipboard.")} >Connect</Link>
                            </p></>
                    }
                </div>
            </section>
            <section className="profile-overview">
                <aside className="profile-summary">
                    <div className="about">
                        <h2>
                            <span className="style">About</span>
                        </h2>
                        <p>
                            The best bios are often concise (around 200–300 words), so you don't
                            have a lot of room to play around. But a single sentence that tees
                            your reader up. Recruiters feature only 3-5 of your absolute best
                            projects.
                        </p>
                    </div>
                    <div className="experience">
                        <div>
                            <h2>
                                <span className="style">Exper</span>ience
                            </h2>
                            <h3>LIVE-GISTS TECH</h3>
                            <h4>Senior UI/UX Designer</h4>
                            <p>
                                When reviewing candidates, recruiters and design leads check their
                                portfolios first. So, all UX designers – juniors and seniors alike –
                                need a UX portfolio.{" "}
                            </p>
                        </div>
                        <div>
                            <h3>SANNI MUIZ TECHNOLOGIES</h3>
                            <h4>Project Manager</h4>
                            <p>
                                So, all UX designers – juniors and seniors alike – need a UX
                                portfolio. Though putting one together might seem like a huge task,
                                once you get an idea of what makes a great portfolio it’ll come
                                easy. And the fastest way to get that idea is to look up
                                inspiration.
                            </p>
                        </div>
                        <div>
                            <h3>SCHOLARS UNITED</h3>
                            <h4>Graphics and Web Designer</h4>
                            <p>
                                So, all UX designers – juniors and seniors alike – need a UX
                                portfolio. Though putting one together might seem like a huge task,
                                once you get an idea of what makes a great portfolio it’ll come
                                easy. And the fastest way to get that idea is to look up
                                inspiration.{" "}
                            </p>
                        </div>
                        <div className="skill">
                            <h3>
                                <span className="style">Skills </span>
                            </h3>
                            <p>
                                <i className="fas fa-star" />
                                User Interface
                            </p>
                            <p>
                                <i className="fas fa-star" />
                                Mobile Design
                            </p>
                            <p>
                                <i className="fas fa-star" />
                                User Experience
                            </p>
                            <p>
                                <i className="fas fa-star" />
                                Brand Design
                            </p>
                        </div>
                    </div>
                    <div className="social-media">
                        <h3>
                            <span className="style">Social</span> Media Links
                        </h3>
                        <p>
                            <a href="https://www.instagram.com/izzy_graphix">
                                <i className="fab fa-instagram" />
                            </a>
                        </p>
                        <p>
                            <a href="https://www.facebook.com/izzy_graphix">
                                <i className="fab fa-facebook" />
                            </a>
                        </p>
                        <p>
                            <a href="https://www.polywork.com/izzy_graphix">
                                <i className="fas fa-cube" />
                            </a>
                        </p>
                        <p>
                            <a href="https://www.behance.net/izzy_graphix">
                                <i className="fab fa-behance" />
                            </a>
                        </p>
                    </div>
                    <div className="languages">
                        <h3>
                            <span className="style">Lang</span>uages
                        </h3>
                        <div>
                            <p>Python</p>
                            <p>Javascript</p>
                            <p>Java</p>
                            <p>HTML</p>
                            <p>Dart</p>
                        </div>
                    </div>
                    <div className="badges">
                        <h3>
                            <span className="style">Badge</span>s
                        </h3>
                        <p>Answered a question</p>
                        <p>Organized a competition</p>
                        <p>Posted 20 gists</p>
                        <p>Reached 100 favourites</p>
                        <p>Solved a complex problem</p>
                    </div>
                </aside>
                {/* <section className="code-content">
                    <p>
                        <span className="gists">All Gists</span>{" "}
                        <span className="filter">
                            Name <i className="fas fa-chevron-circle-down" />
                        </span>
                    </p>


                </section> */}
                <div className="profile-editors">
                    <div className="profile_gists">

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

            </section>
        </main>

    </>
}
export default withRouter(injectSheet(StyleSheet)(Profile));
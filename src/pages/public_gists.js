import { useState, useEffect, useRef, useContext } from "react";
import { Controlled as CodeMirror } from 'react-codemirror2';
import { themeContext } from "../App";
import Code from "../images/code.svg";
import like from "../images/like.png";
import notLike from "../images/not_like.png"
import comment from "../images/comments.png";
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import "codemirror/mode/dart/dart"
import "codemirror/mode/python/python"
import "codemirror/mode/cmake/cmake"
import "codemirror/mode/dockerfile/dockerfile"
import "codemirror/mode/django/django"
import "codemirror/mode/vb/vb"
import "codemirror/mode/julia/julia"
import "codemirror/mode/go/go"
import "codemirror/mode/haml/haml"
import "codemirror/mode/jsx/jsx"
import "codemirror/mode/pug/pug"
import "codemirror/mode/yaml/yaml"
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-ocean.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/colorforth.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/erlang-dark.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/abcdef.css';
import 'codemirror/theme/hopscotch.css';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/mbo.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/liquibyte.css';
import "../css/not_auth_public_gists.css"
import { useTitle } from "../utils/title";
import Search from "../images/search-button.svg";
import { Link, withRouter } from "react-router-dom";
import InfoBar from "../components/info";
import moment from "moment"
import injectSheet from "react-jss";
import { StyleSheet } from "../utils/shimmer";
import Shimmer from "react-shimmer-effect";
const { API_ENDPOINT } = require("./url");

const PublicGists = (props) => {
    const defaultImage = 'https://cdn3.vectorstock.com/i/thumb-large/76/57/portrait-young-bearded-man-in-eyeglasses-vector-34397657.jpg'
    const { theme } = useContext(themeContext);
    let init = localStorage.getItem("initPage") ?? 1;
    const [err, setErr] = useState();
    const [showErr, setShowErr] = useState(false);
    useTitle(`Public gists page ${init}.`);
    const inputRef = useRef()
    const [initialPage, setInitPage] = useState(1);
    const [pagePrev, setPagePrev] = useState();
    const [pageNext, setPageNext] = useState();
    const [userID, setUserID] = useState(null);
    const [limit] = useState(6);
    const codeEditorRef = useRef();
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        let init = localStorage.getItem("initPage") ?? 1;
        setInitPage(parseInt(init));

        fetch(API_ENDPOINT + `/public/docs/paginated?page=${initialPage}&limit=${limit}`).then(res => res.json()).then((response) => {
            setPageNext(response.message.next?.page);
            setPagePrev(response.message.previous?.page);
            setDocs(response.message.results);
        });
        console.log(initialPage);
    }, [initialPage, limit]);
    useEffect(() => {
        if (localStorage.getItem("user_token") !== null) {
            fetch(`${API_ENDPOINT}/user/name`, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    "Authorization": `Bearer ${localStorage.getItem("user_token")}`
                },
                method: "GET",
            }).then(res => res.json()
            ).then(jsonRes => {
                console.log(jsonRes);
                if (jsonRes.success) {
                    setUserID(jsonRes.message._id);
                    console.log(jsonRes.message._id)
                } else {

                }
            })
        }

    }, [])

    function previous() {
        setDocs([])
        setPageNext(null)
        setPagePrev(null)
        localStorage.setItem("initPage", pagePrev);
        setInitPage(pagePrev);
    }

    function next() {
        setDocs([])
        setPageNext(null)
        setPagePrev(null)
        localStorage.setItem("initPage", pageNext);
        setInitPage(pageNext);
    }

    function handleCommentClick(id) {
        props.history.push(`/comments/editor/${id}`)

    }
    const debounce = function (fn, d) {
        let timer;
        return function () {
            let context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(context, args);
            }, d)
        }
    }

    useEffect(() => {
        inputRef.current = debounce(searchByWordOrLetters, 500);
    }, []);
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
                for (let i = 0; i < docs.length; i++) {
                    if (docs[i].publicLink === id) {
                        newArr.push({
                            ...docs[i],
                            likes: docs[i]?.likes.findIndex(e => e.user === userID) === -1 ? [...docs[i]?.likes, { user: userID }] : [...docs[i]?.likes.filter(e => e.user !== userID)]
                        })
                    } else {
                        newArr.push(docs[i])
                    }

                }
                console.log(newArr)
                setDocs(newArr);
            } else {
                setErr("You have to be logged in to perform this action.");
                setShowErr(true);
                setTimeout(() => {
                    setErr("");
                    setShowErr(false);
                }, 3000)

            }
        })
    }

    function searchByWordOrLetters(v) {
        setDocs([])
        setPageNext(null)
        setPagePrev(null)

        fetch(API_ENDPOINT + `/search/docs?wol=${v}`).then(res => res.json()).then((response) => {
            console.log(v);
            console.log(response);

            setDocs(response.message);
            setPageNext(null);
            setPagePrev(null);

        });
    }
    const handleChange = (event) => {
        const input = event.target.value;
        if (event.target.value === "") {
            setDocs([])
            setPageNext(null)
            setPagePrev(null)

            return setInitPage(localStorage.getItem("initPage"))
        }
        inputRef.current(input);
    };
    const newUI =
        <>
            {showErr ? <InfoBar
                color="red"
                text={err}
            /> : ""}

            <p className={theme === "light" ? "big2_light" : "big2"}>PUBLIC GISTS.</p>
            <div className={theme === "light" ? "search_wrapper_light" : "search_wrapper"}>
                <button> <img className="search-icon" src={Search} alt="search" /> </button>
                <input className="search" type="search" name="search" placeholder="Search by name" onChange={handleChange} ref={inputRef} />
            </div>
            <div className="public_editors">
                {(docs && docs.length > 0) ? docs.map((doc, index, _) =>
                    <div key={index}>
                        <div className="public_editor" >
                            <div className={theme === "light" ? "mac1_light" : "mac1"}>
                                <img src={Code} alt="mac_buttons" />
                                <p>{moment(doc.createdAt).startOf('hour').fromNow()}</p>
                                <p>{doc.name.toUpperCase()} / <span className="language_button" style={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "2px", paddingBottom: "2px" }} id={doc.language[0].toUpperCase() + doc.language.slice(1, doc.language.length)}>{doc.language[0].toUpperCase() + doc.language.slice(1, doc.language.length)} </span>   </p>

                            </div>
                            <CodeMirror
                                ref={codeEditorRef}
                                className="home-code-editor1"
                                value={doc.data}
                                options={{
                                    lineWrapping: true,
                                    lint: true,
                                    mode: doc.language === "html" ? "xml" : doc.language,
                                    theme: doc.theme ?? "mdn-like",
                                    lineNumbers: false,
                                    scrollbarStyle: "null"
                                }}
                            />

                            <div className={theme === "light" ? "mac2_light" : "mac2"}>

                                <p className="user_info"><img className="profile_pic" src={doc.user?.profileImageUrl ?? defaultImage} alt="profile ." /><Link to={`/@/${doc.user.username}`}>{doc.user.username}</Link></p>

                                <div className="like_comment">
                                    <div id="likes"><img src={doc?.likes?.findIndex(e => e.user === userID) === -1 ? notLike : like} alt="like button" onClick={() => handleLikeClick(doc.publicLink)} /> <span>{doc?.likes?.length ?? 0}</span></div>

                                    <div id="comments"><img src={comment} alt="comment button" onClick={() => handleCommentClick(doc.publicLink)} /> <span>{doc?.comments?.length ?? 0}</span></div>
                                </div>
                            </div>
                        </div>

                    </div>


                ) : <>
                    <Shimmer>
                        <div className={props.classes.publicEditor} />
                    </Shimmer>
                    <Shimmer>
                        <div className={props.classes.publicEditor} />
                    </Shimmer><Shimmer>
                        <div className={props.classes.publicEditor} />
                    </Shimmer><Shimmer>
                        <div className={props.classes.publicEditor} />
                    </Shimmer><Shimmer>
                        <div className={props.classes.publicEditor} />
                    </Shimmer><Shimmer>
                        <div className={props.classes.publicEditor} />
                    </Shimmer><Shimmer>
                        <div className={props.classes.publicEditor} />
                    </Shimmer>
                </>}


            </div>
            {pagePrev ? <button className={theme === "light" ? "prev_next_light" : "prev_next"} onClick={previous}>Previous</button> : ""} {pageNext ? <button className={theme === "light" ? "prev_next_light" : "prev_next"} onClick={next}>Next</button> : ""}
            {/* {showComment ? <Comment
                code_id={codeID}
            /> : <div></div>} */}
        </>


    return newUI;
}

export default withRouter(injectSheet(StyleSheet)(PublicGists));

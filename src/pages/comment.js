/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useEffect, useState } from "react"
import { API_ENDPOINT } from "./url"
import { useParams, withRouter, Link } from "react-router-dom"
import { Controlled as CodeMirror } from 'react-codemirror2';
import moment from "moment"
import { v4 as uuidV4 } from "uuid";
import "../css/comments.css";
import React from "react";
import LiveLogo from "../images/livegists_logo.png"
import { useRef } from "react";
import InfoBar from "../components/info";
import Picker from 'emoji-picker-react';
import { themeContext } from "../App";
import { useContext } from "react";
import injectSheet from "react-jss";
import { StyleSheet } from "../utils/shimmer";
import CustomShimmer from "../components/shimmerComp";
import { useScroll } from "../utils/scroll";
const CommentPage = (props) => {
    useScroll();
    const { theme } = useContext(themeContext);
    const [err, setErr] = useState();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showErr, setShowErr] = useState(false);
    const { id } = useParams();
    const [comments, setComments] = useState(null);
    const [userDeets, setUserdeets] = useState(null);
    const [code, setCode] = useState(null);
    const [commentBody, setCommentBody] = useState('');
    const commentContainerRef = useRef();

    useEffect(() => {
        fetch(API_ENDPOINT + `/get/code?id=${id}`).then(res => res.json()).then((response) => {
            if (response.success === false) return props.history.push("/not_found")
            setCode(response.message);
            console.log(response);
            fetch(API_ENDPOINT + `/get/comments?id=${id}`).then(res => res.json()).then((response) => {
                setComments(response.message);
                console.log(response);
            });
            fetch(`${API_ENDPOINT}/user/name`, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    "Authorization": `Bearer ${localStorage.getItem("user_token")}`
                },
                method: "GET",
            }).then(res => res.json()
            ).then(jsonRes => {
                if (jsonRes.success) {
                    setUserdeets(jsonRes.message);
                    console.log(jsonRes)
                }
            })
        });


    }, [id, props.history]);

    const onEmojiClick = (event, emojiObject) => {
        setCommentBody(commentBody + emojiObject?.emoji)
    };
    function handleComment() {

        fetch(`${API_ENDPOINT}/create/comment`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            },
            method: "POST",
            body: JSON.stringify({ publicLink: code !== null ? code.publicLink : '', body: commentBody })
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes)
            if (jsonRes.success) {
                setCommentBody('');
                setComments([...comments, { user: { username: userDeets?.username, profileImageUrl: userDeets?.profileImageUrl, _id: uuidV4() }, publicLink: code !== null ? code.publicLink : '', body: commentBody, }])
                commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight

            } else {
                setErr("You have to be logged into comment.");
                setShowErr(true);
                setTimeout(() => {
                    setErr("");
                    setShowErr(false);
                }, 3000)
            }
        })
    }
    function handleChange(e) {
        setCommentBody(e.target.value);

    }
    function handleEmojiClick() {
        setShowEmojiPicker(!showEmojiPicker);
    }
    return (
        <>
            {showErr ? <InfoBar
                color="red"
                text={err}
            /> : ""}
            <div className="topp">

                {
                    code ? <h3><span className="language_button" style={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "2px", paddingBottom: "2px" }} id={code.language[0].toUpperCase() + code.language.slice(1, code.language.length)}>{code.language[0].toUpperCase() + code.language.slice(1, code.language.length)} </span></h3> : <h3><CustomShimmer>
                        <div className={props.classes.line} > </div>
                    </CustomShimmer></h3>
                }

                <h3>{code ? code.name.toUpperCase() : ''}</h3>
                <Link to="/gists" className={theme === "light" ? "back" : "back_dark"}>BACK TO GISTS</Link>
            </div>
            <div className="poster">
                {code ? <div className="image_cropper pp"><img className="poster profile_pic" alt="profile pic" src={code !== null ? code?.user?.profileImageUrl : ''} /></div> : <>
                    <div className="image_cropper pp">
                        <CustomShimmer>
                            <div className={props.classes.circle}></div>
                        </CustomShimmer>
                    </div>

                </>}
                <div id="active_block" style={{ marginLeft: "15px" }}><span className={theme === "light" ? "line1" : "line1_dark"}> <Link to={`/@/${code ? code?.user?.username : ''}`}>{code !== null ? code?.user?.username : <>

                    <CustomShimmer>
                        <div className={props.classes.line}></div>
                    </CustomShimmer>
                </>}</Link></span> <br /> <span
                    className={theme === "light" ? "line2" : "line2_dark"}>{code !== null ? moment(code.createdAt).startOf('hour').fromNow() : ""}</span></div>
            </div>
            {
                code ? <CodeMirror
                    className="code"
                    value={code?.data}
                    options={{
                        lineWrapping: true,
                        lint: true,
                        mode: code?.language,
                        theme: code?.theme ?? "elegant",
                        lineNumbers: false,
                        scrollbarStyle: "null"
                    }}
                /> : <>

                        <CustomShimmer>
                        <div className="code"></div>
                        </CustomShimmer>


                </>
            }            <div>



                <div className="big_container" >
                    <div className="comment_block" ref={commentContainerRef}>


                        {comments ? comments.map((c, index) => {
                            return (
                                <div key={index}>
                                    <div className={theme === "light" ? "comment1" : "comment1_dark"}>
                                        <div className="comment_wrapper">
                                            <img className="commenter_pic" alt="commenter pic" src={c?.user?.profileImageUrl} />
                                            <div className="textt">
                                                <div className={theme === "light" ? "user_header" : "user_header_dark"}> <Link to={`/@/${c?.user?.username}`}>{c?.user?.username} </Link> </div>
                                                <div className={theme === "light" ? "user_comment" : "user_comment_dark"}>
                                                    <div>
                                                        {c.body}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <>

                            <div>
                                    <CustomShimmer>
                                    <div className={props.classes.comment}></div>
                                    </CustomShimmer>
                                    <CustomShimmer>
                                        <div className={props.classes.comment}></div>
                                    </CustomShimmer> <CustomShimmer>
                                        <div className={props.classes.comment}></div>
                                    </CustomShimmer> <CustomShimmer>
                                        <div className={props.classes.comment}></div>
                                    </CustomShimmer> <CustomShimmer>
                                        <div className={props.classes.comment}></div>
                                    </CustomShimmer> <CustomShimmer>
                                        <div className={props.classes.comment}></div>
                                    </CustomShimmer> <CustomShimmer>
                                        <div className={props.classes.comment}></div>
                                    </CustomShimmer> <CustomShimmer>
                                        <div className={props.classes.comment}></div>
                                    </CustomShimmer> <CustomShimmer>
                                        <div className={props.classes.comment}></div>
                                    </CustomShimmer> <CustomShimmer>
                                        <div className={props.classes.comment}></div>
                                    </CustomShimmer>
                            </div>


                        </>}
                    </div>
                    {comments ? <div id={theme === "light" ? "new_comment" : "new_comment_dark"}>
                        <div className="comment_wrapper">

                            <div className="textt">
                                {userDeets !== null ?
                                    <img className="commenter_pic" alt="commenter pic" src={userDeets !== null ? userDeets?.profileImageUrl : LiveLogo} />
                                    : ''}

                                {showEmojiPicker ? <div style={{ position: "absolute", top: "-236px", left: "159px", zIndex: "10" }}> <Picker onEmojiClick={onEmojiClick} /></div> : ''}

                                <div className={theme === "light" ? "user_header" : "user_header_dark"}> <button onClick={handleEmojiClick} > 🐱‍🏍</button> </div>
                                <div className={theme === "light" ? "user_comment" : "user_comment_dark"}>

                                    <textarea name={theme === "light" ? "comment" : "comment_dark"} cols="100" rows="5" placeholder="Leave a comment" onChange={handleChange} value={commentBody}></textarea>

                                    <div><input type="submit" value="Comment" onClick={handleComment} /></div>

                                </div>
                            </div>
                        </div>
                    </div> : ''}
                </div>

            </div>
        </>
    )
};
export default withRouter(injectSheet(StyleSheet)(CommentPage));
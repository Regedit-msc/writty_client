import { useEffect, useState } from "react"
import { API_ENDPOINT } from "./url"
import { useParams, withRouter, Link } from "react-router-dom"
import { Controlled as CodeMirror } from 'react-codemirror2';
import moment from "moment"
import { v4 as uuidV4 } from "uuid";
import "../css/comments.css";
import LiveLogo from "../images/livegists_logo.png"
import { useRef } from "react";
import InfoBar from "../components/info";
const CommentPage = (props) => {

    const [err, setErr] = useState();
    const [showErr, setShowErr] = useState(false);
    const { id } = useParams();
    const [comments, setComments] = useState([]);
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
                } else {

                }
            })
        });


    }, [id, props.history]);

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
                setComments([...comments, { user: { username: userDeets.username, profileImageUrl: userDeets.profileImageUrl, _id: uuidV4() }, publicLink: code !== null ? code.publicLink : '', body: commentBody, }])
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
    return (
        <>
            {showErr ? <InfoBar
                color="red"
                text={err}
            /> : ""}
            <div className="topp">
                {
                    code ? <h3><span className="language_button" style={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "2px", paddingBottom: "2px" }} id={code.language[0].toUpperCase() + code.language.slice(1, code.language.length)}>{code.language[0].toUpperCase() + code.language.slice(1, code.language.length)} </span></h3> : <h3>Loading...</h3>
                }
                <Link to="/gists" class="back">BACK TO GISTS</Link>
            </div>
            <div className="poster">
                <div className="image_cropper pp"><img className="poster profile_pic" alt="profile pic" src={code !== null ? code.user.profileImageUrl : ''} /></div>
                <div id="active_block" style={{ marginLeft: "15px" }}><span className="line1">{code !== null ? code.name.toUpperCase() : ''}</span> <br /> <span
                    className="line2">{code !== null ? moment(code.createdAt).startOf('hour').fromNow() : ""}</span></div>
            </div>
            <CodeMirror
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
            />
            <div>



                <div class="big_container" >
                    <div class="comment_block" style={{ display: comments && comments.length > 0 ? "block" : "none" }} ref={commentContainerRef}>


                        {comments && comments.map((c, index) => {
                            return (
                                <div key={index}>
                                    <div className="comment1" >
                                        <div className="comment_wrapper">
                                            <img className="commenter_pic" alt="commenter pic" src={c.user.profileImageUrl} />
                                            <div className="textt">
                                                <div className="user_header">  {c.user.username}</div>
                                                <div className="user_comment">
                                                    <div>
                                                        {c.body}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {comments ? <div id="new_comment">
                        <div className="comment_wrapper">

                            <div className="textt">

                                {userDeets !== null ?
                                    <img className="commenter_pic" alt="commenter pic" src={userDeets !== null ? userDeets.profileImageUrl : LiveLogo} />
                                    : ''}
                                <div className="user_header"></div>
                                <div className="user_comment">
                                    <textarea name="comment" cols="112" rows="5" placeholder="Leave a comment" onChange={handleChange} value={commentBody}></textarea>
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
export default withRouter(CommentPage);
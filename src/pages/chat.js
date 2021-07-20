import { IO } from "../utils/socket_stuff"
import { useEffect, useState } from "react";
import "../css/chat.css"
import { useParams, withRouter } from "react-router-dom"
import { API_ENDPOINT } from "./url";
import { v4 as uuidV4 } from "uuid";
import { useRef } from "react";
import MenuLight from "../images/menu_light.png";
import ImageUploadLight from "../images/image-upload_light.png"
import SendMessageLight from "../images/send-message_light.png"
import EmojiLight from "../images/emoji_light.png"
import VoiceLight from "../images/voice_light.png"
import BackLight from "../images/back_light.png"
import InfoBar from "../components/info";
import injectSheet from "react-jss";
import { StyleSheet } from "../utils/shimmer";
import ProfilePlaceholder from "../images/profile_placeholder.jpg"
// import { themeContext } from "../App";
import { useTitle } from "../utils/title";
import CustomShimmer from "../components/shimmerComp";
const Chat = (props) => {
    const messagesRef = useRef();
    const { name } = useParams();
    useTitle(`${name.toUpperCase()}'s dm.`)
    const [room, setRoom] = useState();
    const [messages, setMessages] = useState();
    const [userID, setUserID] = useState();
    const [info, setInfo] = useState();
    const [showInfo, setShowInfo] = useState(false);
    const [typing, setTyping] = useState("")
    const [nameUserProfileImage, setNameUserProfileImage] = useState();
    const [idUserProfileImage, setIdUserProfileImage] = useState();
    const [lastSeen, setLastSeen] = useState();
    const [socket, setSocket] = useState();
    const [sent, setSent] = useState();
    const [youOnline, setYouOnline] = useState(false);
    const [inputVal, setInputVal] = useState('');

    useEffect(() => {
        const s = IO(`${API_ENDPOINT}/chat`, { auth: { token: localStorage.getItem("user_token") } })
        setSocket(s)
        return () => {
            s.disconnect()
        }
    }, []);

    useEffect(() => {
        const me = [];
        const you = [];
        if (!messages) return;
        messages.forEach(message => {
            if (message.user._id === userID) {
                me.push(message);
            } else {
                you.push(message);
            }
        });
        const lastSeen = you[you.length - 1].createdAt
        setLastSeen(lastSeen);
        console.log(lastSeen);
    }, [messages, userID])
    useEffect(() => {
        if (socket == null) return;
        socket.emit("join-chat", { name });
        socket.once("load-messages", (data) => {
            // "load-messages", { messages, success: true, roomID }
            if (data.success) {
                setRoom(data.roomID);
                setMessages(data.messages);
                setUserID(data.userID);
                setNameUserProfileImage(data.profileImage);
                setIdUserProfileImage(data.profileImageYou)
                console.log(data);
            } else {
                // TODO: Handle no messages.
                setRoom(data.roomID);
            }

        });
        socket.on("error_happened", (e) => {
            console.log(e);
            if (e === "Your session has expired please login.") {
                setInfo("Session timeout. Yoursession has timed out please login.");
                setShowInfo(true);
                setTimeout(() => {
                    setInfo("");
                    setShowInfo(false);
                }, 3000)
            } else {
                props.history.push("/" + e.split(" ").join("_"))
            }
        })
        socket.on("message", data => {
            console.log(data);
            setTyping("");
        });

        socket.on("onlineUsers", data => {
            if (data.users.length > 1) {
                setYouOnline(true);
            } else {
                setYouOnline(false);
            }
        });
        socket.on("typing", data => {
            setTyping(data);
        });
    }, [socket, name]);


    function handleChange(e) {
        e.preventDefault();
        setInputVal(e.target.value);
    }
    function sendMessage() {
        socket.emit("message", { msg: inputVal });
        setMessages([...messages, {
            room: room,
            body: inputVal,
            user: { _id: userID },
            type: "message",
            _id: uuidV4()
        }]);
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight + 300;
        setInputVal('');
    }

    function toRender(message) {
        // console.log(message.user._id);
        // console.log(userID);
        switch (message.type) {

            case "message":
                return (
                    <>
                        {message.user._id === userID ? <div className="message_box mine">
                            {message.body}
                        </div> : <div className="message_box yours">
                            {message.body}
                        </div>}
                    </>
                )
            case "vn":
                break;
            case "image":
                break;
            default:
                break;

        }
    }

    return (
        <>
            {showInfo ? <InfoBar
                color="blue"
                text={info}
            /> : ""}
            <div className="messages_head">
                <img alt="" src={BackLight} className="back_button" />
                <div className="your_info">
                    {messages ? <img alt="" src={nameUserProfileImage} className="your_profile_image" /> : <>
                        <CustomShimmer>
                            <div className={props.classes.circle} />
                        </CustomShimmer>

                    </>}
                    <div>
                        <span id="your_name">  Dev {name}</span><br />
                        <span id="active_status">  {youOnline ? "Active Now" : "Offline"}</span>
                    </div>
                </div>
                <img alt="" src={MenuLight} className="menu_button" />
            </div>
            <div className="messages_body" ref={messagesRef}>



                {
                    messages ? messages.map((message, index) => {
                        return (
                            <div key={index}>
                                {
                                    toRender(message)

                                }
                            </div>
                        )

                    }) : <>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", flexDirection: "column" }}>

                                <CustomShimmer>
                                    <div className={props.classes.messageMine} ></div>
                                </CustomShimmer>
                                <CustomShimmer>
                                    <div className={props.classes.messageYours} ></div>
                                </CustomShimmer><CustomShimmer>
                                    <div className={`${props.classes.messageMine}`} ></div>
                                </CustomShimmer><CustomShimmer>
                                    <div className={props.classes.messageYours} ></div>
                                </CustomShimmer>
                                <CustomShimmer>
                                    <div className={props.classes.messageYours} ></div>
                                </CustomShimmer><CustomShimmer>
                                    <div className={props.classes.messageMine} ></div>
                                </CustomShimmer><CustomShimmer>
                                    <div className={props.classes.messageMine} ></div>
                                </CustomShimmer><CustomShimmer>
                                    <div className={props.classes.messageMine} ></div>
                                </CustomShimmer><CustomShimmer>
                                    <div className={props.classes.messageMine} ></div>
                                </CustomShimmer>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", marginTop: "100px" }}>

                                <CustomShimmer>
                                    <div className={props.classes.messageMine} ></div>
                                </CustomShimmer>
                                <CustomShimmer>
                                    <div className={props.classes.messageYours} ></div>
                                </CustomShimmer><CustomShimmer>
                                    <div className={`${props.classes.messageMine}`} ></div>
                                </CustomShimmer><CustomShimmer>
                                    <div className={props.classes.messageYours} ></div>
                                </CustomShimmer>
                                <CustomShimmer>
                                    <div className={props.classes.messageYours} ></div>
                                </CustomShimmer><CustomShimmer>
                                    <div className={props.classes.messageMine} ></div>
                                </CustomShimmer><CustomShimmer>
                                    <div className={props.classes.messageMine} ></div>
                                </CustomShimmer><CustomShimmer>
                                    <div className={props.classes.messageMine} ></div>
                                </CustomShimmer><CustomShimmer>
                                    <div className={props.classes.messageMine} ></div>
                                </CustomShimmer>
                            </div>
                        </div>

                    </>


                }
            </div>
            <div className="messages_tools">
                <div>
                    <img alt="" src={EmojiLight} />
                    <img alt="" src={ImageUploadLight} />
                    <img alt="" src={VoiceLight} />
                </div>
                <input type="text" id="new_message" name="new_message" onChange={handleChange} value={inputVal} />
                <img alt="" src={SendMessageLight} onClick={sendMessage} />
            </div>
        </>
    )
}
export default withRouter(injectSheet(StyleSheet)(Chat));
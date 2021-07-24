import { IO } from "../utils/socket_stuff"
import { useEffect, useState } from "react";
import "../css/chat.css"
import { useParams, withRouter } from "react-router-dom"
import { API_ENDPOINT } from "./url";
import { v4 as uuidV4 } from "uuid";
import { useRef } from "react";
import MenuLight from "../images/menu_light.png";
import ImageUploadLight from "../images/image-upload.png"
import SendMessageLight from "../images/send-message.png"
import EmojiLight from "../images/emoji.png"
import VoiceLight from "../images/voice.png"
import BackLight from "../images/back.png"
import Delete from "../images/icon-delete.png";
import InfoBar from "../components/info";
import DoubleTicks from "../images/double-tick-blue.png"
import injectSheet from "react-jss";
import PlayBlue from "../images/play-blue.png";
import PauseBlue from "../images/pause-blue.png";
import { StyleSheet } from "../utils/shimmer";
// import ProfilePlaceholder from "../images/profile_placeholder.jpg"
// import { themeContext } from "../App";
import { useTitle } from "../utils/title";
import CustomShimmer from "../components/shimmerComp";
import moment from "moment";
import useRecorder from "../utils/recorder";
import CustomAudio from "../components/customAudio";
import ChatSideBar from "../components/chatSidebar";
import ImagePreview from "../components/imagePreview";
import CustomImage from "../components/customImage";
const Chat = (props) => {
    const imageFieldRef = useRef();
    const messagesRef = useRef();
    let [audioURL, isRecording, startRecording, stopRecording, setAudioURLEmpty, audioBlob] = useRecorder()
    const [inv, setInv] = useState(null);
    let [noOfRecording, setNoOfRecording] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const { name } = useParams();
    useTitle(`${name.toUpperCase()}'s dm.`)
    const [room, setRoom] = useState();
    const [messages, setMessages] = useState();
    let [userID, setUserID] = useState();
    const [info, setInfo] = useState();
    const [showInfo, setShowInfo] = useState(false);
    const [imageShow, setImageShow] = useState(false);
    const [imageType, setImageType] = useState('');
    const [imageb64, setImageB64] = useState('');
    const [nameUserProfileImage, setNameUserProfileImage] = useState();
    const [idUserProfileImage, setIdUserProfileImage] = useState();
    const [notYouID, setNotYouID] = useState('')
    // const [setLastSeen] = useState();
    const [socket, setSocket] = useState();
    const [audiob64, setAudioB64] = useState();
    const [youOnline, setYouOnline] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [currentAudio, setCurrentAudio] = useState();



    useEffect(() => {
        if (!audioBlob) return;
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onload = () => {
            const base64AudioMessage = reader.result.split(',')[1];
            setAudioB64(base64AudioMessage);
        };
    }, [audioBlob])

    useEffect(() => {
        const s = IO(`${API_ENDPOINT}/chat`, { auth: { token: localStorage.getItem("user_token") } })
        setSocket(s)
        return () => {
            s.disconnect()
        }
    }, [name]);
    useEffect(() => {
        document.body.classList.add("chat");
        document.querySelector("#root").style.display = "grid";
        document.querySelector("#root").style.gridTemplateColumns = "166fr 517fr"
        return () => {
            document.body.classList.remove("chat")
            document.querySelector("#root").style.display = "block";
            document.querySelector("#root").style.gridTemplateColumns = ""
        }
    }, [])
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
                setNotYouID(data.notYouID);
                socket.emit("onlineUsers");
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



    }, [socket, name, props.history]);

    useEffect(() => {
        if (!socket) return;
        socket.on("message", data => {
            console.log(data);
            if (data.username === name) {
                setMessages(messages => [...messages, {
                    createdAt: moment(data.timeISO).fromNow(),
                    body: data.text,
                    user: { _id: data.id },
                    type: "message",
                    _id: uuidV4()
                }]);
            }
            // setTyping("");
        });

    }, [socket, name])

    useEffect(() => {
        if (!socket) return;
        socket.on("onlineUsers", data => {
            console.log(data);
            if (data.users.findIndex(u => u.id === notYouID) !== -1) {
                setYouOnline(true);
            } else {
                setYouOnline(false);
            }

        });
    }, [socket, notYouID])

    useEffect(() => {
        if (!socket) return;
        socket.on("typing", data => {
            console.log("Typing")
            // setTyping(data);
        });
    }, [socket]);

    useEffect(() => {
        if (!socket || !userID) return;
        socket.on("vn", vnData => {
            console.log(vnData.user._id, userID)
            if (vnData.user._id === userID || !vnData.user) return;
            setMessages(messages => [...messages, {
                createdAt: moment().format('LT'),
                //room: room,
                body: vnData.body,
                user: { _id: vnData.user._id, profileImageUrl: vnData.user.profileImageUrl },
                type: "vn",
            }])
        })
    }, [socket, userID]);



    useEffect(() => {
        if (!socket || !userID) return;
        socket.on("image", imageData => {
            console.log(imageData.user._id, userID)
            if (imageData.user._id === userID || !imageData.user) return;
            setMessages(messages => [...messages, {
                createdAt: moment().format('LT'),
                // room: room,
                caption: imageData.caption,
                body: imageData.body,
                user: { _id: imageData.user._id },
                type: "image",
            }])
        })
    }, [socket, userID])

    function handleChange(e) {
        e.preventDefault();
        setInputVal(e.target.value);
        socket.emit("typing");
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
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        console.log(messagesRef.current.scrollHeight);
        setInputVal('');
    }



    function toRender(message, idx) {
        switch (message.type) {

            case "message":
                return (
                    <>
                        {message.user._id === userID ? <div className="message_box mine"  >
                            {message.body}
                            <div className="time_stamp">
                                {message.time || moment(message.createdAt).fromNow()}
                                <img src={DoubleTicks} alt="" className="double_tick" />
                            </div>
                        </div> : <div className="message_box yours">
                            {message.body}
                                <div className="time_stamp_yours" >
                                    {moment(message.createdAt).fromNow()}
                                    <img src={DoubleTicks} alt="" className="double_tick" />
                                </div>
                        </div>}
                    </>
                )
            case "vn":
                return <>
                    <CustomAudio
                        image={message.user.profileImageUrl}
                        src={message.body}
                        createdAt={moment(message.createdAt).fromNow()}
                        mineOrYours={message.user._id === userID ? "mine" : "yours"}

                    />

                </>

            case "image":
                return <>


                    {message.user._id === userID ? <CustomImage
                        imageUrl={message.body}
                        time={moment(message.createdAt).fromNow()

                        }
                        caption={message.caption}
                        mineOrYours="mine"
                    /> : <CustomImage
                        imageUrl={message.body}
                        time={moment(message.createdAt).fromNow()

                        }
                        mineOrYours="yours"
                        caption={message.caption}
                    />}
                </>

            case "imagefornow":

                return <>
                    <CustomImage
                        imageUrl={message.body}
                        time={message.createdAt}
                        caption={message.caption}
                        mineOrYours="mine"
                    />
                </>
            case "vnfornow":
                return <>


                    <CustomAudio
                        image={message.image}
                        mineOrYours="mine"
                        createdAt={message.createdAt}
                        src={`data:audio/webm;codecs=opus;base64,${message.b64}`}
                    />

                </>

            default:
                break;

        }
    }
    function handleRecord() {
        if (!isRecording) {
            setAudioURLEmpty();
            setIsPlaying(false);
            setCurrentAudio(null);
            startRecording();
            setNoOfRecording(0);
            const theInterval = setInterval(function () { setNoOfRecording(noOfRecording += 1) }, 1000)
            setInv(theInterval);

        } else {
            clearInterval(inv);
            setInv(null);
            stopRecording();
            console.log(noOfRecording, "No of recording seconds");
            setNoOfRecording(0);
        }

    }
    function handleUploadClick() {
        imageFieldRef.current.click();
    }
    function handleImageFieldChange(e) {
        handleFiles(e.target.files)
    }
    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const proceed = checkFileSize(file);
            if (proceed !== false) {
                if (!file.type.startsWith('image/')) { continue }
                const reader = new FileReader();
                reader.onload = function () {
                    const base64 = this.result.replace(/.*base64,/, '');
                    setImageB64(base64);
                    setImageType(file.type.toString().split("/")[1]);
                    setImageShow(true);

                    // profileRef.current.src = `data:image/${file.type.toString().split("/")[1]};base64,${base64}`
                    //  socket.emit('image', { user: username, b64: base64, type: file.type.toString().split("/")[1], room: room });
                }
                reader.readAsDataURL(file);
            }

        }
    }





    function checkFileSize(file) {
        let nBytes = file.size;
        let sOutput = nBytes + " bytes";
        const aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
        for (let nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            sOutput = nApprox.toFixed(3) + "," + aMultiples[nMultiple];
        }
        if (parseFloat(sOutput.split(',')[0]) > 3.5
            && sOutput.split(',')[1].toString() !== aMultiples[0]) {
            console.log("Toolarge", sOutput);
            alert('The image is too large upload an image under or equal to 3.5 MB.');
            return false;
        }
    }
    function toShow() {
        if (audioURL === "") {
            return <>  <img alt="" src={EmojiLight} />
                <img alt="" src={ImageUploadLight} onClick={handleUploadClick} />

                <input ref={imageFieldRef} type="file" class="image" accept="image/*" style={{ display: "none" }} onChange={handleImageFieldChange} />
            </>
        } else {
            return <>
                <img alt="" src={Delete} onClick={handleClear} />
                {isPlaying ? <img alt="" src={PauseBlue} onClick={handlePlayORPause} /> : <img alt="" src={PlayBlue} onClick={handlePlayORPause} />}

            </>
        }
    }
    function handleClear() {
        setCurrentAudio(null);
        setAudioURLEmpty();
    }

    function handlePlayORPause() {
        const audio = new Audio(audioURL);
        if (!currentAudio) {
            setCurrentAudio(audio);
        };
        if (!isPlaying && currentAudio) {
            currentAudio.play();
            setIsPlaying(true);
        } else {
            currentAudio?.pause();
            setIsPlaying(false);
        }


    }

    function sendAudioMessage() {
        if (!socket) return;
        setCurrentAudio(null);
        let id = uuidV4();
        socket.emit("vn", { audiob64, room, idUserProfileImage, id, userID });
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        console.log("ran send audio");
        setMessages(messages => [...messages, {
            createdAt: moment().format('LT'),
            room: room,
            image: idUserProfileImage,
            b64: audiob64,
            user: { _id: userID },
            type: "vnfornow",
            isPlaying: false,
            _id: id
        }]);

    }

    function handleBackClick() {
        props.history.replace(`${window.location.href.split(`${window.location.origin}`)[1].split("/chat")[0]}`)
    }
    return (
        <>
            {showInfo ? <InfoBar
                color="blue"
                text={info}
            /> : ""}
            {imageShow ?

                <ImagePreview
                    imageb64={imageb64}
                    imageType={imageType}
                    socket={socket}
                    setImageShow={setImageShow}
                    setMessages={setMessages}
                    userID={userID}
                    room={room}
                />

                : ""}
            <ChatSideBar
                name={name}
                messages={messages}
                profileImage={idUserProfileImage ?? ''}
            />

            <div class="main">
                <div className="messages_head">
                    <img alt="" src={BackLight} className="back_button" onClick={handleBackClick} />
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
                                        toRender(message, index)

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
                        {isRecording ? <><p style={{ color: "black" }}>{noOfRecording} secs</p> </> : toShow()}
                        <img alt="" src={VoiceLight} onClick={handleRecord} />

                    </div>
                    <input type="text" id="new_message" name="new_message" onChange={handleChange} value={inputVal} size="80" />
                    {audioURL === "" ? <>   <img alt="" src={SendMessageLight} onClick={sendMessage} /></> : <> <img alt="" src={SendMessageLight} onClick={sendAudioMessage} /></>}

                </div>
            </div>

        </>
    )
}
export default withRouter(injectSheet(StyleSheet)(Chat));
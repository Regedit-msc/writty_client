import moment from "moment";
import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { API_ENDPOINT } from "../pages/url";
import "../css/chat.css";
import Search from "../images/search-button.svg"
import CustomShimmer from "./shimmerComp";
import injectSheet from "react-jss";
import { StyleSheet } from "../utils/shimmer";
import { themeContext } from "../App"
import { useContext } from "react";
const ChatSideBar = ({ profileImage, name, messages, history, ...props }) => {
    const { theme } = useContext(themeContext);
    const [rooms, setRooms] = useState();
    const [first, setFirst] = useState(true);
    function updateSideBar() {
        console.log("uddateran")
        fetch(`${API_ENDPOINT}/rooms`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            },
            method: "GET",
        }).then(res => res.json()
        ).then(jsonRes => {
            if (jsonRes.success) {
                setRooms(jsonRes.message);
                console.log(jsonRes)
            } else {

            }
        })
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
        const d = debounce(updateSideBar, 1000);
        if (first) {
            updateSideBar();
            setFirst(first => !first);
        } else {
            d();
        }
    }, [name, messages, profileImage, history, first]);







    // function handleClick(p) {
    //     history.replace("/@/" + p);
    // }
    function toRender(messageType, messageBody) {
        switch (messageType) {
            case "vn":
                return "🎤"
            case "image":
                return "📷"
            case "vnfornow":
                return "🎤";
            case "imagefornow":
                return "🎤";
            default:
                return messageBody?.length > 0 ? messageBody : "Start a conversation."

        }

    }
    return (

        <div className={theme === "light" ? "side_popup_light" : "side_popup"}>
            <div className="clear_top">
                <div className="circle_crop">
                    <img alt="" src={profileImage} className="my_profile_pic" />
                </div>
                <div className={theme === "light" ? "messages_light" : "messages"}>Messages</div>
            </div>
            <div className="search_messages">
                <div className={theme === "light" ? "messages_search_wrapper_light" : "messages_search_wrapper"}>
                    <button> <img alt="" className="messages-search-icon" src={Search} /> </button>
                    <input className="messages-search" type="search" placeholder="Search or start a new chat" />
                </div>
            </div>
            <div className="my_messages">
                {
                    rooms ? rooms.map((room, index) => {
                        return (
                            <div key={index}>
                                <Link to={`/@/${room?.userTOChat?.user?.username}/chat`} replace className="link--message-one">
                                    <div className="message-one">
                                        <div className="circle_crop">
                                            <img alt="" src={room?.userTOChat?.user?.profileImageUrl} className="" />
                                        </div>
                                        <div className="message_text">
                                            <span className={theme === "light" ? "their_name_light" : "their_name"}>{room?.userTOChat?.user?.username}</span>
                                            <span className={theme === "light" ? "their_display_text_light" : "their_display_text"}>{room?.lastMessage?.user?.username}: {toRender(room?.lastMessage?.type, room?.lastMessage?.body)}</span>
                                        </div>
                                        <div className={theme === "light" ? "unread_data_light" : "unread_data"}>
                                            <div className="their_time_stamp">{moment(room?.lastMessage?.createdAt).format("LT")}</div>
                                            <div className={theme === "light" ? "unread_count_light" : "unread_count"}> </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }) : <>
                        <br />
                        <div className={props.classes.container}>
                            <CustomShimmer>
                                <div className={props.classes.circle} ></div>

                            </CustomShimmer>
                            <CustomShimmer>
                                <div className={props.classes.line} ></div>
                            </CustomShimmer>
                        </div>
                        <br />
                        <div className={props.classes.container}>
                            <CustomShimmer>
                                <div className={props.classes.circle} ></div>

                            </CustomShimmer>
                            <CustomShimmer>
                                <div className={props.classes.line} ></div>
                            </CustomShimmer>
                        </div>
                        <br />
                        <div className={props.classes.container}>
                            <CustomShimmer>
                                <div className={props.classes.circle} ></div>

                            </CustomShimmer>
                            <CustomShimmer>
                                <div className={props.classes.line} ></div>
                            </CustomShimmer>
                        </div>
                        <br />
                        <div className={props.classes.container}>
                            <CustomShimmer>
                                <div className={props.classes.circle} ></div>

                            </CustomShimmer>
                            <CustomShimmer>
                                <div className={props.classes.line} ></div>
                            </CustomShimmer>
                        </div>


                    </>
                }
            </div>
        </div>

    )
}

export default withRouter(injectSheet(StyleSheet)(ChatSideBar));
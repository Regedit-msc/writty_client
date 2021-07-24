import moment from "moment";
import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { API_ENDPOINT } from "../pages/url";
import "../css/chat.css";
import Search from "../images/search-button.svg"
const ChatSideBar = ({ profileImage, name, messages, history }) => {
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
                return messageBody

        }

    }
    return (

        <div className="side_popup">
            <div className="clear_top">
                <div className="circle_crop">
                    <img alt="" src={profileImage} className="my_profile_pic" />
                </div>
                <div className="messages">Messages</div>
            </div>
            <div className="search_messages">
                <div className="messages_search_wrapper">
                    <button> <img alt="" className="messages-search-icon" src={Search} /> </button>
                    <input className="messages-search" type="search" placeholder="Search or start a new chat" />
                </div>
            </div>
            <div className="my_messages">
                {
                    rooms ? rooms.map((room, index) => {
                        return (
                            <div key={index}>
                                <Link to={`/@/${room?.userTOChat?.user?.username}/chat`} className="link--message-one">
                                    <div className="message-one">
                                        <div className="circle_crop">
                                            <img alt="" src={room?.userTOChat?.user?.profileImageUrl} className="" />
                                        </div>
                                        <div className="message_text">
                                            <span className="their_name">{room?.userTOChat?.user?.username}</span>
                                            <span className="their_display_text">{room?.lastMessage?.user?.username}: {toRender(room?.lastMessage?.type, room?.lastMessage?.body)}</span>
                                        </div>
                                        <div className="unread_data">
                                            <div className="their_time_stamp">{moment(room?.lastMessage?.createdAt).format("LT")}</div>
                                            <div className="unread_count"> </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }) : ''
                }
            </div>
        </div>

    )
}

export default withRouter(ChatSideBar);
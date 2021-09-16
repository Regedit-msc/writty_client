import "../css/chat.css";
import ChatSideBar from "../components/chatSidebar";
import { useEffect } from "react";
import { useState } from "react";
import { API_ENDPOINT } from "./url";
import { useSnackbar } from "notistack";
import { makePriv } from "../auth_hoc/checkAuth";
const ChatWaitingRoom = () => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (localStorage.getItem("profile_user_pic")) {
            setImage(localStorage.getItem("profile_user_pic"));
            setName(localStorage.getItem("profile_user_name"));
        } else {
            fetch(`${API_ENDPOINT}/user/name`, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.getItem('user_token')}`
                },
                method: "GET",
            }).then(res => {
                if (res.ok) return res.json();
                return res.json().then(json => Promise.reject(json));
            }
            ).then(jsonRes => {
                setImage(jsonRes.message.profileImageUrl);
                setName(jsonRes.message.username);
                localStorage.setItem("profile_user_pic", jsonRes.message.profileImageUrl);
                localStorage.setItem("profile_user_name", jsonRes.message.username);
            }).catch(() => {
                enqueueSnackbar("Unable to sync.", {
                    variant: "error"
                });
            });
        }
    }, [enqueueSnackbar])

    useEffect(() => {
        document.body.classList.add("chat_waiting");
        document.querySelector("#root").style.display = "grid";
        document.querySelector("#root").style.gridTemplateColumns = "166fr 517fr"
        return () => {
            document.body.classList.remove("chat_waiting")
            document.querySelector("#root").style.display = "block";
            document.querySelector("#root").style.gridTemplateColumns = ""
        }
    }, [])
    return <>
        <ChatSideBar
            profileImage={image}
            name={name}
        />
    </>
}
export default makePriv(ChatWaitingRoom);
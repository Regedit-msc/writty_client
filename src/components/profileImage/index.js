/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import "./profileImage.css";
import "../../css/main.css";
import React from "react";
import { forwardRef } from "react";

const ProfileImage = forwardRef((props, ref) => {
    return <>
        <div className="profile-card" ref={ref} onMouseLeave={() => {
            ref.current?.classList?.add("fade_out_c");
            // eslint-disable-next-line no-undef
            setTimeout(() => {
                ref.current?.classList?.remove("fade_out_c");
                ref.current.style.display = "none";
            }, 500)
        }}>
            <img src={props.image} className="profile-card-image" alt="profile" />
            <div className="profile-card-crux">
                <p className="card-name">{props.name}</p>
                <p className="card-user-title">{props.title}</p>
                <p className="card-about">{props.about}</p>
            </div>
        </div>

    </>
})

export default ProfileImage;
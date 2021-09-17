import "./profileImage.css";
import "../../css/main.css";
import React from "react";

const ProfileImage = React.forwardRef(({ image, name, about, title, size = { width: "100px", height: "100px" } }, ref) => {
    return <>
        <div className="profile-card" ref={ref} onMouseLeave = {() => {
        // ref.current.style.display = "none";
        }}>
            <img src={image} className="profile-card-image" alt="profile" />
            <div className="profile-card-crux">
                <p className="card-name">{name}</p>
                <p className="card-user-title">{title}</p>
                <p className="card-about">{about}</p>
            </div>
        </div>

    </>
})

export default ProfileImage;
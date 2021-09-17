import "./profileImage.css";
import "../../css/main.css";

const ProfileImage = ({ image, name, about, title, size = { width: "100px", height: "100px" } }) => {
    return <>
        <div className="profile-card">
            <img src={image} className="profile-card-image" alt="profile"  />
            <div class="profile-card-crux">
                <p className="card-name">{name}</p>
                <p className="card-user-title">{title}</p>
                <p className="card-about">{about}</p>
            </div>
        </div>
    </>
}

export default ProfileImage;
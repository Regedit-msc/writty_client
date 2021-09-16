const ProfileImage = ({ image, name, about, size = { width: "100px", height: "100px" } }) => {
    return <>
        <img alt="profile" src={image} style={{ height: size?.height, width: size?.width }} />
        <div>


        </div>
    </>
}
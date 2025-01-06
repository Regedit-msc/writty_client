import { useState } from "react";
import CustomImagePreview from "./customImagePreview";
import { themeContext } from "../App"
import { useContext } from "react";

const CustomImage = ({ imageUrl, time, mineOrYours, caption, type }) => {
    const { theme } = useContext(themeContext);
    const [showImagePrev, setShowImagePrev] = useState(false);
    return <>
        {showImagePrev ? <CustomImagePreview
            imageUrl={imageUrl}
            type={type}
            setShowImagePrev={setShowImagePrev}
        /> : ""}
        <div class={`message_box ${mineOrYours}`}>
            <div class={theme === "light" ? "uploaded-image-parent_light" : "uploaded-image-parent"}>
                <img alt="" loading="lazy" src={imageUrl} class="uploaded-image" onClick={() => setShowImagePrev(true)} />
            </div>
        <div> {caption} </div>
        <div class="time_stamp">
            {time}
        </div>
    </div>
    </>
}
export default CustomImage;
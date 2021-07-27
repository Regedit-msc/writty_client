import CancelDark from "../images/cancel-white.png";
import CancelLight from "../images/cancel-black.png";
import DownloadDark from "../images/download-white.png";
import DownloadLight from "../images/download-black.png";
import { themeContext } from "../App"
import { useContext } from "react";

const CustomImagePreview = ({ imageUrl, type, setShowImagePrev }) => {
    const { theme } = useContext(themeContext);
    function handleDownload() {
        var link = document.createElement('a');
        link.setAttribute("download", "")
        link.style.visibility = "hidden"
        link.href = imageUrl;
        link.download = `live_gists_image.${type}`;
        document.body.appendChild(link);
        setShowImagePrev(false);
        link.click();
        document.body.removeChild(link);

    }
    return <div className={theme === "light" ? "image-expand-overlay" : "image-expand-overlay"}>
        <div className={theme === "light" ? "image-expand-buttons_light" : "image-expand-buttons"}>
            <img alt="" src={theme === "light" ? DownloadLight : DownloadDark} onClick={handleDownload} />
            <img alt="" src={theme === "light" ? CancelLight : CancelDark} onClick={() => setShowImagePrev(false)} />
        </div>
        <div className="image-expand-body">
            <img alt="" src={imageUrl} />
        </div>
        <div className={theme === "light" ? "image-expand-foot_light" : "image-expand-foot"}>
        </div>
    </div>
}

export default CustomImagePreview;
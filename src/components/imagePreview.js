
import moment from "moment";
import { useState } from "react";
import CancelWhite from "../images/cancel-black.png";
import SendMessage from "../images/send-message.png";
const ImagePreview = ({ imageb64: b64, imageType: type, setImageShow, socket, setMessages, userID, room }) => {
    const [captionVal, setCaptionValue] = useState('');
    function sendImage() {
        if (!socket) return;
        setMessages(messages => [...messages, {
            createdAt: moment().format('LT'),
            caption: captionVal,
            body: `data:image/${type};base64,${b64}`,
            user: { _id: userID },
            type: "imagefornow",
            _id: userID
        }]);
        setImageShow(false);
        socket.emit("image", { b64, type, userID, room, caption: captionVal })
    }

    function handleChange(e) {
        setCaptionValue(e.target.value);
    }
    return <>
        <div className="image_overlay">
            <div id="preview_image">
                <img alt="" src={CancelWhite} onClick={() => setImageShow(false)} id="cancel-image" />
                Preview
            </div>
            <div className="img-with-caption">
                <img alt="" src={`data:image/${type};base64,${b64}`} className="preview_uploaded_image" />
                <div>
                    <input type="text" name="caption" className="caption_text" size="58" placeholder="Add a caption..." onChange={handleChange} />
                    <img alt="" src={SendMessage} className="send-message" onClick={sendImage} />
                </div>
            </div>
            <div className="add_file">
                <div><img alt="" src={`data:image/${type};base64,${b64}`} /></div>
            </div>
        </div>

    </>
}

export default ImagePreview;
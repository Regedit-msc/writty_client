
import moment from "moment";
import React from "react";
import PropTypes from "prop-types"
import { useState } from "react";
import { themeContext } from "../App"
import { useContext } from "react";
import CancelDark from "../images/cancel-white.png";
import CancelLight from "../images/cancel-black.png";
import SendMessageDark from "../images/send-message.png";
import SendMessageLight from "../images/send-message_light.png";
import { forwardRef } from "react";
import { convertTextLinksToHyperLinks } from "../utils/hyperlinkify";
// eslint-disable-next-line react/display-name
const ImagePreview = forwardRef(
  (
    {
      imageb64: b64,
      imageType: type,
      setImageShow,
      socket,
      setMessages,
      userID,
      room,
    },
    ref
  ) => {
    const { theme } = useContext(themeContext);
    const [captionVal, setCaptionValue] = useState("");
    function sendImage() {
      if (!socket) return;
      setMessages((messages) => [
        ...messages,
        {
          createdAt: moment().format("LT"),
          caption: captionVal,
          body: `data:image/${type};base64,${b64}`,
          user: { _id: userID },
          format: type,
          type: "imagefornow",
          _id: userID,
        },
      ]);
      convertTextLinksToHyperLinks(".message_box");
      setImageShow(false);
      ref.current.scrollTo(0, ref?.current?.scrollHeight);
      socket.emit("image", {
        b64,
        type,
        userID,
        room,
        caption: captionVal,
      });
    }

    function handleChange(e) {
      setCaptionValue(e.target.value);
    }
    return (
      <>
        <div
          className={
            theme === "light" ? "image_overlay_light" : "image_overlay"
          }
        >
          <div id={theme === "light" ? "preview_image_light" : "preview_image"}>
            <img
              alt=""
              src={theme === "light" ? CancelLight : CancelDark}
              onClick={() => setImageShow(false)}
              id="cancel-image"
            />
            Preview
          </div>
          <div className="img-with-caption">
            <img
              alt=""
              src={`data:image/${type};base64,${b64}`}
              className="preview_uploaded_image"
            />
            <div>
              <input
                type="text"
                name="caption"
                className={
                  theme === "light" ? "caption_text_light" : "caption_text"
                }
                size="58"
                placeholder="Add a caption..."
                onChange={handleChange}
              />
              <img
                alt=""
                src={theme === "light" ? SendMessageLight : SendMessageDark}
                className="send-message"
                onClick={sendImage}
              />
            </div>
          </div>
          <div className={theme === "light" ? "add_file_light" : "add_file"}>
            <div>
              <img alt="" src={`data:image/${type};base64,${b64}`} />
            </div>
          </div>
        </div>
      </>
    );
  }
);

ImagePreview.propTypes = { imageb64: PropTypes.string, imageType: PropTypes.string, setImageShow: PropTypes.func, socket: PropTypes.any, setMessages: PropTypes.func, userID: PropTypes.string, room: PropTypes.string }
export default ImagePreview;
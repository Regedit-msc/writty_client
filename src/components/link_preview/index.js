import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";
import { useEffect } from "react";
import getUrls from "get-urls";
import { useState } from "react";
const LinkPreview = ({ text, classP }) => {
  const [linkData, setLinkData] = useState(null);
  const [dominantColor, setDominantColor] = useState("white");
  useEffect(() => {
    const urls = Array.from(getUrls(text));
    if (urls.length > 0) {
      fetch(`${process.env.REACT_APP_SCRAPER_ENDPOINT_DEV}scrape`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "POST",
        body: JSON.stringify({ text }),
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          console.log(jsonRes);
          if (jsonRes.success) {
            setLinkData(jsonRes.message);
            // console.log(linkData[0]?.image);
            imageColor(jsonRes.message[0].image);
          }
        });
    }
  }, [text]);

  const imageColor = (imageUrl) => {
    var img = new Image();
    function getDominantColor(imageObject) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imageObject, 0, 0, 1, 1);
      const i = ctx.getImageData(0, 0, 1, 1).data;
      console.log(`rgba(${i[0]},${i[1]},${i[2]},${i[3]})`);
      setDominantColor(
        "#" +
          ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1)
      );
    }

    img.addEventListener(
      "load",
      function () {
        getDominantColor(img);
      },
      false
    );
    img.src = imageUrl;
    img.crossOrigin = "Anonymous";
  };

  return (
    <>
      {linkData && Array.isArray(linkData) ? (
        <div
          className={
            styles.link_preview_container + " " + styles[`${classP}_preview`]
          }
          style={{
            backgroundColor: dominantColor,
            backgroundImage: `url(${linkData[0]?.image})`,
            objectFit: "contain",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className={styles.link_preview_img}>
            {" "}
            <img alt="preview" src={linkData[0]?.favicon} />
          </div>{" "}
          <div
            className={styles.link_preview_heading}
            style={{ border: `2px solid ${dominantColor}` }}
          >
            {" "}
            <p> {linkData[0]?.title}</p>
          </div>
          <div className={styles.link_preview_p}>
            {" "}
            <p> {linkData[0]?.description}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
LinkPreview.propTypes = {
  text: PropTypes.string,
  classP: PropTypes.string,
};
export default LinkPreview;

/* eslint-disable react/display-name */
import { forwardRef } from "react";
import PropTypes from 'prop-types';
import React from "react";
import "./info_box.css"
const InfoBox = forwardRef(({ color, header, about, image, width, height, imageWidth = "100%" }, ref) => {
    return <>
        <div className="info_box_container" style={{ background: color, width, height }} ref={ref} >
            <p>{header}</p>
            <hr />
            <img src={image} alt="info_box" className="info_box_image" style={{ width: imageWidth }} />
            <p className="info_box_about">{about}</p>
            <div className="info_box_dismiss" style={{ color }} onClick={() => {
                ref.current.style.display = "none"
            }} > Dismiss</div>
        </div>
    </>
});
InfoBox.propTypes =
{
    color: PropTypes.string, header: PropTypes.string, about: PropTypes.string, image: PropTypes.string, width: PropTypes.string, height: PropTypes.string, imageWidth: PropTypes.string
}

export default InfoBox;
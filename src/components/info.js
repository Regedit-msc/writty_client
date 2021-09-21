import "../css/main.css";
import React from "react";
import PropTypes from "prop-types"
const InfoBar = ({ color, text }) => {
    return <div className={`info_${color} info1`}><span>{text}</span></div>
}
InfoBar.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string
}
export default InfoBar;
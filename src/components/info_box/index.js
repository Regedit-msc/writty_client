import { forwardRef } from "react";
import "./info_box.css"
const InfoBox = forwardRef(({ color, header, about, image, width, height }, ref) => {
    return <>
        <div className="info_box_container" style={{ background: color, width, height }} ref={ref} >
            <p>{header}</p>
            <hr />
            <img src={image} alt="info_box" className="info_box_image" />
            <p className="info_box_about">{about}</p>
            <div className="info_box_dismiss" style={{ color }} onClick={() => {
                ref.current.style.display = "none"
            }} > Dismiss</div>
        </div>
    </>
})
export default InfoBox;
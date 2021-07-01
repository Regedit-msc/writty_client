import "../css/main.css"
const InfoBar = ({ color, text }) => {
    return <div className={`info_${color} info1`}><span>{text}</span></div>
}
export default InfoBar;
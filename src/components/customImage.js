const CustomImage = ({ imageUrl, time, mineOrYours, caption }) => {
    return <div class={`message_box ${mineOrYours}`}>
        <img alt="" src={imageUrl} class="uploaded-image" />
        <div> {caption} </div>
        <div class="time_stamp">
            {time}
        </div>
    </div>

}
export default CustomImage;
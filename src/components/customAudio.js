import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react"
import DoubleTicks from "../images/double-tick-blue.png"
import PlayBlue from "../images/play-blue.png";
import PauseBlue from "../images/pause-blue.png";
import PlayWhite from "../images/play-white.png";
import PauseWhite from "../images/pause-white.png"
const CustomAudio = ({ image, src, createdAt, mineOrYours }) => {
    const progressRef = useRef();
    const [currentAudio, setCurrentAudio] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const progressConRef = useRef();
    const [seeking, setSeeking] = useState();
    useEffect(() => {
        let audio = new Audio(src);
        setCurrentAudio(audio);
    }, [src]);

    useEffect(() => {
        if (!currentAudio) return;
        function updateProgress(e) {
            if (!currentAudio) return;
            const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressRef.current.style.width = `${progressPercent}%`;
        }
        currentAudio.addEventListener("timeupdate", updateProgress);
        return () => {
            currentAudio.removeEventListener("timeupdate", updateProgress)
        }
    }, [currentAudio]);


    function setProgress(event) {
        if (!currentAudio) return;
        if (seeking) {
            const width = progressConRef.current.clientWidth;
            const clickX = event.nativeEvent.offsetX;
            const duration = currentAudio.duration;
            currentAudio.currentTime = (clickX / width) * duration;
            console.log(width);
            console.log(clickX);
            console.log(duration);
        }
    }
    function handlePlayORPause() {
        if (!isPlaying) {
            currentAudio.play();
            setIsPlaying(true);
        } else {
            currentAudio.pause();
            setIsPlaying(false);
        }
    }

    function handleMouseDown(e) {
        setSeeking(true);
        setProgress(e);
    }
    function handleMouseUp() {
        setSeeking(false);
    }

    function handleMouseMove(e) {
        setProgress(e);

    }
    return <>

        <div className={`message_box ${mineOrYours}`}>
            <div className="audio_container">
                <img alt="" src={image} className="your_profile_image" />
                <button onClick={() => handlePlayORPause()} id="play_pause_button">
                    <img alt="" src={isPlaying ? mineOrYours === "yours" ? PauseWhite : PauseBlue : mineOrYours === "yours" ? PlayWhite : PlayBlue} className="play_or_pause" />
                </button>
                <div className="progress_container" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} ref={progressConRef} >
                    <div className={`progress ${mineOrYours === "mine" ? "me" : "you"}`} ref={progressRef}></div>
                </div>

            </div>

            <div className="time_stamp">
                {createdAt}
                <img alt="" src={DoubleTicks} className="double_tick" />
            </div>
        </div>
    </>

}

export default CustomAudio;
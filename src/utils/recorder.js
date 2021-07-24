import { useEffect, useState } from "react";

const useRecorder = () => {
    const [audioURL, setAudioURL] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState();
    const [recorder, setRecorder] = useState(null);


    useEffect(() => {
        if (recorder === null) {
            if (isRecording) {
                requestRecorder().then(setRecorder, console.error);
            }
            return;
        }
        if (isRecording) {
            recorder.start();

        } else {
            recorder.stop();

        }

        // Obtain the audio when ready.
        const handleData = e => {
            setAudioURL(URL.createObjectURL(e.data));
            setAudioBlob(e.data);
        };

        recorder.addEventListener("dataavailable", handleData);
        return () => recorder.removeEventListener("dataavailable", handleData);
    }, [recorder, isRecording]);

    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };
    const setAudioURLEmpty = () => {
        setAudioURL("")
    }
    return [audioURL, isRecording, startRecording, stopRecording, setAudioURLEmpty, audioBlob];
};

async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
}
export default useRecorder;
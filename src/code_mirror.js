import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import { API_ENDPOINT } from "./pages/url"
import { useParams } from "react-router-dom"
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
const SAVE_INTERVAL_MS = 2000;



export default function Editor() {
    const codeEditorRef = useRef();
    const [code, setCode] = useState('');
    const { id: editorId, lang } = useParams()
    const [language] = useState(lang);
    const [socket, setSocket] = useState();
    // const [codeSaved, setCodeSaved] = useState();
    const [theEditor, setTheEditor] = useState();
    const [isLoadingEditor, setIsLoadingEditor] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoadingEditor(false);
        }, 1000);
    }, [])

    useEffect(() => {

        if (socket == null || theEditor == null) return
        socket.emit("join-editor", { editorId, lang });
        socket.once("load-code", code => {
            setCode(code);
            // setCodeSaved(code);
            console.log(code);
        })
        console.log(language);
    }, [socket, theEditor, editorId, lang, language]);



    useEffect(() => {
        if (socket == null || theEditor == null) return
       
        const interval = setInterval(() => {


            socket.emit("save-code", code);

        }, SAVE_INTERVAL_MS)

        return () => {
            clearInterval(interval)
        }
    }, [socket, code, theEditor])



    useEffect(() => {
        const s = io(`${API_ENDPOINT}/editor`)
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, []);


    useEffect(() => {
        if (!theEditor) return;
        codeEditorRef.current.editor.display.wrapper.style.height = "1000px";
        codeEditorRef.current.editor.display.wrapper.style.minHeight = "100%";
        codeEditorRef.current.editor.display.wrapper.style.fontSize = "25px";
    }, [theEditor])

    useEffect(() => {
        if (socket == null || theEditor == null) return

        socket.on("receive-changes", ({ data, value }) => {
            console.log(data, value);



            theEditor.replaceRange(data.text.length > 0 ? data.text : data.origin !== "+delete" && data.origin !== "undo" && data.origin !== "redo" ? "\n" : "", data.from, data.to, "api")
        })
    }, [socket, theEditor])




    function handleMount(editor, _) {
        setIsLoadingEditor(false);
        setTheEditor(editor);
    }

    function handleChange(editor, data, value) {
        console.log(data, value);
        setCode(value);

        if (data.origin !== "api") {
            socket.emit("send-changes", { data, value });
        }
    }

    if (isLoadingEditor) {
        return <div className="m-4 font-bold text-lg flex justify-center items-center w-full h-screen">
            Loading your gist... 👩🏻‍🦯
        </div >
    } else {
        return <ControlledEditor
            ref={codeEditorRef}
            editorDidMount={handleMount}
            onBeforeChange={handleChange}
            value={code}
            options={{

                lineWrapping: true,
                lint: true,
                mode: language,
                theme: 'material',
                lineNumbers: true,

            }}
        />
    }
}
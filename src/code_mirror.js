import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { API_ENDPOINT } from "./pages/url"
import { useParams } from "react-router-dom"
import { v4 as uuidV4 } from "uuid";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'

export default function Editor() {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState("javascript");
    const { id: editorId } = useParams()
    const [socket, setSocket] = useState()
    const [theEditor, setTheEditor] = useState();
    const [user, setUser] = useState("");



    useEffect(() => {
        const randID = uuidV4();
        if (socket == null || theEditor == null) return

        socket.once("load-document", document => {
            console.log(document);
        })

        socket.emit("join-editor", editorId);

        setUser(randID);
    }, [socket, theEditor, editorId])


    useEffect(() => {
        const s = io(`${API_ENDPOINT}/doc`)
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, []);




    useEffect(() => {
        if (socket == null || theEditor == null) return

        socket.on("receive-changes", ({ data, value }) => {
            console.log(data, value);
            theEditor.replaceRange(data.text[0].length > 0 ? data.text[0] : data.origin !== "+delete" && data.origin !== "undo" && data.origin !== "redo" ? "\n" : "", data.from, data.to, "api")
        })
    }, [socket, theEditor])




    function handleMount(editor, _) {
        setTheEditor(editor);
    }

    function handleChange(editor, data, value) {
        console.log(data, value);
        setCode(value);

        if (data.origin !== "api") {
            socket.emit("send-changes", { data, value });
        }
    }

    return (

        <ControlledEditor
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

    )
}
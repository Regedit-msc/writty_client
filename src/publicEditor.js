import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react"

import { API_ENDPOINT } from "./pages/url"
import { useParams } from "react-router-dom"
import { IO } from "./utils/socket_stuff";

const PublicEditor = (props) => {
    const { id } = useParams()
    const [socket, setSocket] = useState()
    const [theEditor, setTheEditor] = useState();
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [loading, setLoading] = useState(true);
    const [monaco, setMonaco] = useState()

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, [])

    useEffect(() => {
        if (socket == null || theEditor == null) return
        socket.on("receive-changes", ({ data, value, sender_id }) => {
            setCode(value);
        })
    }, [socket, theEditor])

    useEffect(() => {

        if (socket == null || theEditor == null || monaco == null) return
        console.log(id);
        socket.emit("join-editor", { id, pubID: id, type: "public" });
        theEditor.updateOptions({ readOnly: true });
        socket.once("load-code", code => {
            setCode(code.data);
            setLanguage(code.language);
            monaco.editor.setModelLanguage(theEditor.getModel(), code.language);
            setLoading(false);

        });
        socket.once("code_does_not_exist", () => {
            props.history.push("/code_not_found");
        })
    }, [socket, theEditor, id, props.history, monaco]);

    useEffect(() => {
        const s = IO(`${API_ENDPOINT}/editor1`)
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, []);
    function handleEditorDidMount(editor, monaco) {
        setTheEditor(editor);
        setMonaco(monaco);

    }
    if (loading) {
        return <div className="loading">
            <span>Loading a public gist ... 👩🏻‍🦯</span>
        </div >
    } else {
        return (
            <>
                <Editor
                    value={code}
                    height="100vh"
                    options={{
                        minimap: {
                            enabled: true
                        },
                        fontSize: 18,
                        wordWrap: "on",
                    }}
                    defaultLanguage={language}
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
                    loading="Preparing your code... 🥳"
                />
            </>

        );
    }


}

export default PublicEditor;
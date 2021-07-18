
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { API_ENDPOINT } from "./pages/url"
import { useParams } from "react-router-dom"
import InfoBar from "./components/info";

const CollabEditor = (props) => {
    const { id } = useParams()
    const [socket, setSocket] = useState()
    const [theEditor, setTheEditor] = useState();
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(true);
    const [monaco, setMonaco] = useState();
    const [info, setInfo] = useState();
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, [])
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         socket.emit("save-code", { code, userID });

    //     }, SAVE_INTERVAL_MS)

    //     return () => {
    //         clearInterval(interval)

    //     }
    // }, [code, socket])

    useEffect(() => {
        if (socket == null || theEditor == null || username == null) return
        socket.on("receive-changes", ({ data, value, sender_id }) => {
            if (sender_id !== username) {
                setCode(value);
            }
        })
        socket.on('userLeft', (name) => {
            console.log(name);
            const textToShow = name === "Admin" ? "The admin has left. Subsequent changes will not be saved." : `${name} has left.`
            setInfo(textToShow);
            setShowInfo(true);
            setTimeout(() => {
                setInfo("");
                setShowInfo(false);
            }, 5000)
        })
    }, [socket, theEditor, username])


    useEffect(() => {

        const userToken = localStorage.getItem("user_token");
        fetch(`${API_ENDPOINT}/details`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${userToken}`
            },
            method: "GET",
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes, "jsonRes");
            if (jsonRes.success) {
                setUsername(jsonRes.username);
                // setUserID(jsonRes.uid)
            } else {
                props.history.push("/not_allowed_register_to_collab");
            }
        })

    }, [props.history])

    useEffect(() => {

        if (socket == null || theEditor == null || username == null || monaco == null) return
        console.log(id);
        socket.emit("join-editor", { id, pubID: id, type: "collab" });
        theEditor.updateOptions({ readOnly: true });
        socket.once("load-code", code => {
            if (username !== code.username) {
                setCode(code.data);
                theEditor.updateOptions({ readOnly: false });
                setLanguage(code.language);
                monaco.editor.setModelLanguage(theEditor.getModel(), code.language);
                setLoading(false);

            } else {
                props.history.push("/not_allowed_to_collab_on_your_code_go_to_edit");
            }

        });
        socket.once("code_does_not_exist", () => {
            props.history.push("/code_not_found");
        })
    }, [socket, theEditor, id, username, props.history, monaco]);

    useEffect(() => {
        const s = io(`${API_ENDPOINT}/editor1`)
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, []);


    function handleEditorDidMount(editor, monaco) {
        setTheEditor(editor);
        setMonaco(monaco);
    }
    function handleChange(value, event) {
        setCode(value);
        socket.emit("send-changes", { data: event, value: value, randID: username });
    }
    if (loading) {
        return <div className="loading">
            <span>Loading your collab gist ... 👩🏻‍🦯</span>
        </div >
    } else {
        return (
            <>
                {showInfo ? <InfoBar
                    color="blue"
                    text={info}
                /> : ""}
                <Editor
                    value={code}
                    height="100vh"
                    defaultLanguage={language}
                    options={{
                        minimap: {
                            enabled: true
                        },
                        fontSize: 18,
                        cursorStyle: "block",
                        wordWrap: "on",
                    }}
                    onChange={handleChange}
                    onMount={handleEditorDidMount}
                    loading="Preparing your code... 🥳"
                />
            </>

        );
    }
}
export default CollabEditor
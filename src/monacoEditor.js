
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react"

import { API_ENDPOINT } from "./pages/url"
import { useParams } from "react-router-dom"
import { IO } from "./utils/socket_stuff";
import Renderer from "./components/renderer";
import { debounce } from "@material-ui/core";
import { useRef } from "react";
import EditorPreloader from "./components/editor_preloader";

function TextEditor(props) {
  const { id } = useParams();
  const [socket, setSocket] = useState();
  const [theEditor, setTheEditor] = useState();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);
  const [monaco, setMonaco] = useState();
  const codeRef = useRef();
  const SAVE_INTERVAL_MS = 2000;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("save-code", code);
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [code, socket]);

  useEffect(() => {
    if (socket == null || theEditor == null) return;
    socket.on("receive-changes", ({ data, value, sender_id }) => {
      if (sender_id !== username) {
        setCode(value);
      }
    });
  }, [socket, theEditor, username]);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    fetch(`${API_ENDPOINT}/details`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${userToken}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes, "jsonRes");
        if (jsonRes.success) {
          setUsername(jsonRes.username);
        } else {
          props.history.push("/not_allowed");
        }
      });
  }, [props.history]);

  useEffect(() => {
    codeRef.current = debounce(sendCode, 700);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (
      socket == null ||
      theEditor == null ||
      username == null ||
      monaco == null
    )
      return;
    console.log(id);
    socket.emit("join-editor", { id, pubID: "none", type: "normal" });
    theEditor.updateOptions({ readOnly: true });
    socket.once("load-code", (code) => {
      if (username === code.username) {
        setCode(code.data);
        theEditor.updateOptions({ readOnly: false });
        setLanguage(code.language);
        monaco.editor.setModelLanguage(theEditor.getModel(), code.language);
        setLoading(false);
      } else {
        props.history.push("/not_allowed");
      }
    });
    socket.once("code_does_not_exist", () => {
      props.history.push("/code_not_found");
    });
  }, [socket, theEditor, id, username, props.history, monaco]);

  useEffect(() => {
    const s = IO(`${API_ENDPOINT}/editor1`);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);
  function handleEditorDidMount(editor, monaco) {
    setTheEditor(editor);
    setMonaco(monaco);
  }
  function handleChange(value, event) {
    codeRef.current(value, event, socket);
  }

  function sendCode(value, event, socket) {
    setCode(value);
    socket.emit("send-changes", {
      data: event,
      value: value,
      randID: username,
    });
  }
  if (loading) {
    return (
      <div className="loading">
        <EditorPreloader />
      </div>
    );
  } else {
    return (
      <>
        <div
          style={{
            marginTop: "1rem",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              marginTop: "1rem",
              width: language === "xml" || language === "html" ? "50%" : "100%",
            }}
          >
            <Editor
              value={code}
              height="100vh"
              defaultLanguage={language}
              options={{
                minimap: {
                  enabled: true,
                },
                fontSize: 18,
                wordWrap: "on",
              }}
              onChange={handleChange}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              loading={<></>}
            />
          </div>
          {language === "xml" || language === "html" ? (
            <Renderer code={code} />
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}


export default TextEditor;
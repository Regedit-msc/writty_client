import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { API_ENDPOINT } from "./pages/url"
import { useParams } from "react-router-dom"
import { v4 as uuidV4 } from "uuid";
function TextEditor() {
  const { id: editorId } = useParams()
  const [socket, setSocket] = useState()
  const [theEditor, setTheEditor] = useState();
  const [user, setUser] = useState("");
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState("script.js");
  const files = {
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: "////"
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: "css"
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: "html"
    }
  };



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

    socket.on("receive-changes", ({ event, theUser }) => {
      console.log(theUser);
      if (user === theUser) {
        console.log("some changes", event);

      } else {
        theEditor.executeEdits("notuser", event.changes);
        console.log("me", user);
        console.log("you", theUser);
      }
    })
  }, [socket, theEditor])


  function handleEditorDidMount(editor, monaco) {
    setTheEditor(editor);
  }
  function handleChange(value, event) {
    // Since event source cannot be determined this will fire every time
    // Causing an unending loop
    // I'm trying code mirror next 
    setCode(value);
    console.log(event);
    console.log(theEditor.getValue());
    // socket.emit("send-changes", { event, user });
    console.log("reran change")
    //
  }

  function showValue() {
    if (!theEditor) return;
    // theEditor.setValue("Hello there");
    // alert(theEditor.getValue());
    alert(theEditor.getValue());
  }
  return (
    <>
      <button onClick={showValue}>Show value</button>
      <Editor
        value={code}
        height="90vh"
        defaultLanguage={files[fileName].language}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        
      />
    </>

  );
}


export default TextEditor;
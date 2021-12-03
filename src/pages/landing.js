/* eslint-disable no-undef */
import { useContext, useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom";
import React from "react";
// import PropTypes from "prop-types"
import { API_ENDPOINT } from "./url";
import { Controlled as CodeMirror } from "react-codemirror2";
import Code from "../images/code.svg";
import "../css/main.css";
import "../css/landing.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/elegant.css";
import { v4 as uuidV4 } from "uuid";
import { pythonCode } from "../utils/jsCode";
import { themeContext } from "../App";
import { IO } from "../utils/socket_stuff";
// import Pyodide from "../components/pydiode";
// import { PyodideContext } from "../contexts/pyDiodeContext";

// import Pyodide from "../components/pydiode";
const Landing = () => {
  const history = useHistory();
  const checkBox = useRef();
  const { setTheTheme, theme } = useContext(themeContext);
  const codeEditorRef = useRef();
  const [theEditor, setTheEditor] = useState();
  const randID = uuidV4();
  const [socket, setSocket] = useState();
  const [code, setCode] = useState(pythonCode);
  const [image, setImage] = useState(null);
  //   const [output, setOutput] = useState("");
  //   const { hasRan, setHasRan } = useContext(PyodideContext);

  useEffect(() => {
    checkBox.current.checked = theme === "light" ? true : false;
  }, [theme]);

  useEffect(() => {
    if (!localStorage.getItem("new_user")) {
      localStorage.setItem("new_user", "notreg");
    }
    fetch(`${API_ENDPOINT}/user/name`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        if (jsonRes.success) {
          setImage(jsonRes.message.profileImageUrl);
        }
      });
  }, []);
  function handleTheme(e) {
    if (e.target.checked) {
      setTheTheme("light");
      document.body.classList.replace("dark", "light");
      localStorage.setItem("theme_app", "light");
    } else {
      document.body.classList.replace("light", "dark");
      setTheTheme("dark");
      localStorage.setItem("theme_app", "dark");
    }
  }

  useEffect(() => {
    const s = IO(`${API_ENDPOINT}/public`);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || theEditor == null) return;
    socket.on("receive-changes", ({ data }) => {
      theEditor.replaceRange(
        data.text.length > 0
          ? data.text
          : data.origin !== "+delete" &&
            data.origin !== "undo" &&
            data.origin !== "redo"
          ? "\n"
          : "",
        data.from,
        data.to,
        "api"
      );
    });
  }, [socket, theEditor]);

  useEffect(() => {
    if (socket == null || theEditor == null) return;
    socket.emit("join-editor");
  }, [socket, theEditor]);

  function handleEditorChange(editor, data, value) {
    setCode(value);

    if (data.origin !== "api") {
      socket.emit("send-changes", { data, value, randID });
    }
  }
  function handleMount(editor) {
    setTheEditor(editor);
  }
  return (
    <>
      <Link to="/gists">
        <p className={theme === "light" ? "view_light" : "view"}>
          View public gists{" "}
          <span style={{ color: theme === "light" ? "red" : "#3137DC" }}>
            BETA
          </span>
        </p>
      </Link>

      <h1 id={theme === "light" ? "big_light" : "big"}>
        Live
        <span style={{ color: theme === "light" ? "black" : "#3137DC" }}>
          -
        </span>
        Gists{" "}
      </h1>
      <div className="theme_switch">
        <div style={{ display: "flex", alignItems: "center" }}>
          {image ? <img alt="" className="round_p_img" src={image} /> : ""}
          <input
            id="toggle1"
            onChange={handleTheme}
            className={theme === "light" ? "toggle-round1" : "toggle-round"}
            name="toggle"
            type="checkbox"
            ref={checkBox}
          />
          <label htmlFor="toggle1"></label>
        </div>
      </div>
      <div className="code-img">
        {/* <Pyodide pythonCode={output} />
        <button
          onClick={() => {
            setHasRan();
            if (code !== output) {
              setOutput(code);
            } else {
              setOutput(code + " ");
            }
          }}
        >
          Run
        </button> */}

        <div className={theme === "light" ? "mac_light" : "mac"}>
          <img src={Code} alt="mac_buttons" />
        </div>

        <CodeMirror
          ref={codeEditorRef}
          editorDidMount={handleMount}
          className="home-code-editor"
          value={code}
          onBeforeChange={handleEditorChange}
          options={{
            lineWrapping: true,
            lint: true,
            mode: "python",
            theme: theme === "light" ? "elegant" : "material-ocean",
            lineNumbers: false,
            scrollbarStyle: "null",
          }}
        />
      </div>
      <div>
        <Link
          to={``}
          onClick={() => {
            history.push("/login");
            // if (hasRan) {
            //   history.push("/login");
            // } else {
            //   alert("Please run the code first boss!");
            // }
          }}
          className={theme === "light" ? "get_started_light" : "get_started"}
        >
          Get Started
        </Link>
      </div>
    </>
  );
};
export default Landing;
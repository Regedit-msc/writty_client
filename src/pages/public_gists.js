import { useState, useEffect, useRef, useContext } from "react";
import { Controlled as CodeMirror } from 'react-codemirror2';
import { themeContext } from "../App";
import Code from "../images/code.svg";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-ocean.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/colorforth.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/erlang-dark.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/abcdef.css';
import 'codemirror/theme/hopscotch.css';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/mbo.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/liquibyte.css';
import { CODEMIRROR_THEMES } from "../utils/codeMirror_themes";
import "../css/not_auth_public_gists.css"

const { API_ENDPOINT } = require("./url");
function generateTheme() {
    return CODEMIRROR_THEMES[Math.floor(Math.random() * CODEMIRROR_THEMES.length)];
}

const PublicGists = () => {
    const { theme } = useContext(themeContext);
    const codeEditorRef = useRef();
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        fetch(API_ENDPOINT + "/public/docs").then(res => res.json()).then((response) => {
            setDocs(response.message);
        });
    }, []);

    const newUI =
        <>
            <p className={theme === "light" ? "big2_light" : "big2"}>PUBLIC GISTS.</p>
            <div className="public_editors">
                {(docs && docs.length > 0) ? docs.map((doc, index, _) => <>
                    <div key={doc._id}>
                        <div className="public_editor" >
                            <div className={theme === "light" ? "mac1_light" : "mac1"}>
                                <img src={Code} alt="mac_buttons" />
                                <p>{doc.name} by {doc.user.username} / {doc.language[0].toUpperCase() + doc.language.slice(1, doc.language.length)}</p>

                            </div>
                            <CodeMirror
                                ref={codeEditorRef}
                                className="home-code-editor1"
                                value={doc.data}
                                options={{
                                    lineWrapping: true,
                                    lint: true,
                                    mode: doc.language === "html" ? "xml" : doc.language,
                                    theme: generateTheme(),
                                    lineNumbers: false,
                                    scrollbarStyle: "null"


                                }}
                            />
                        </div>



                    </div>

                </>) : <h1 className={theme === "light" ? "loading1_light" : "loading1"}> Loading...</h1>}
            </div>
        </>


    return newUI;
}

export default PublicGists;

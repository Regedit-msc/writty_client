import { useState, useEffect, useRef, useContext } from "react";
import { Controlled as CodeMirror } from 'react-codemirror2';
import { themeContext } from "../App";
import Code from "../images/code.svg";
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import "codemirror/mode/dart/dart"
import "codemirror/mode/python/python"
import "codemirror/mode/cmake/cmake"
import "codemirror/mode/dockerfile/dockerfile"
import "codemirror/mode/django/django"
import "codemirror/mode/vb/vb"
import "codemirror/mode/julia/julia"
import "codemirror/mode/go/go"
import "codemirror/mode/haml/haml"
import "codemirror/mode/jsx/jsx"
import "codemirror/mode/pug/pug"
import "codemirror/mode/yaml/yaml"
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
import { useTitle } from "../utils/title";

const { API_ENDPOINT } = require("./url");
function generateTheme() {
    return CODEMIRROR_THEMES[Math.floor(Math.random() * CODEMIRROR_THEMES.length)];
}

const PublicGists = () => {
    const { theme } = useContext(themeContext);
    let init = localStorage.getItem("initPage") ?? 1;
    useTitle(`Public gists page ${init}.`)
    const [initialPage, setInitPage] = useState(1);
    const [pagePrev, setPagePrev] = useState();
    const [pageNext, setPageNext] = useState()
    const [limit] = useState(6);
    const codeEditorRef = useRef();
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        let init = localStorage.getItem("initPage") ?? 1;
        setInitPage(parseInt(init));
        fetch(API_ENDPOINT + `/public/docs/paginated?page=${initialPage}&limit=${limit}`).then(res => res.json()).then((response) => {
            setPageNext(response.message.next?.page);
            setPagePrev(response.message.previous?.page);
            setDocs(response.message.results);
        });
    }, [initialPage, limit]);


    function previous() {
        localStorage.setItem("initPage", pagePrev);
        setInitPage(pagePrev);
    }

    function next() {
        localStorage.setItem("initPage", pageNext);
        setInitPage(pageNext);
    }
    const newUI =
        <>
            <p className={theme === "light" ? "big2_light" : "big2"}>PUBLIC GISTS.</p>
            <div className="public_editors">
                {(docs && docs.length > 0) ? docs.map((doc, index, _) =>
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

                ) : <h1 className={theme === "light" ? "loading1_light" : "loading1"}> Loading...</h1>}


            </div>
            {pagePrev ? <button onClick={previous}>Previous</button> : ""} {pageNext ? <button onClick={next}>Next</button> : ""}
        </>


    return newUI;
}

export default PublicGists;

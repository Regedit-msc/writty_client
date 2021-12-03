import { useSnackbar } from "notistack";
import { useState, useContext } from "react";
import { useRef } from "react";
import { withRouter } from "react-router";
import { makePriv } from "../auth_hoc/checkAuth";
import InfoBox from "../components/info_box";
import CreateGistInfo from "../images/create_gist.svg";
import { v4 as uuidV4 } from "uuid";
import { themeContext } from "../App";
import React from "react";
import styles from "../css/create_gist.module.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import { API_ENDPOINT } from "./url";
import withPageTransition from "../components/page_transition/page_transition";
const CreateGist = ({ history }) => {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar } = useSnackbar();
  const { theme } = useContext(themeContext);
  const infoBoxRef = useRef();
  const codeEditorRef = useRef();
  const [gist, setGist] = useState({
    name: "",
    _id: "",
    language: "javascript",
    private: true,
    publicLink: uuidV4(),
    data: "// Paste your code here 😎",
  });

  function handleChange(e) {
    switch (e.target.name) {
      case "name":
        setGist({
          ...gist,
          name: e.target.value,
          _id: uuidV4(),
        });
        break;
      case "language":
        setGist({
          ...gist,
          language: e.target.value,
        });
        break;
      case "private":
        setGist({
          ...gist,
          private: e.target.value === "true" ? true : false,
        });
        break;
      default:
        break;
    }
  }

  function handleEditorChange(editor, data, value) {
    setGist({
      ...gist,
      data: value,
    });
  }
  function handleSubmit() {
    if (gist.name.length < 5) {
      return enqueueSnackbar("Gist name must be up to 5 characters.");
    } else if (gist.data === "") {
      return enqueueSnackbar("Gist cannot be empty.");
    }
    fetch(`${API_ENDPOINT}/create/doc`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      method: "POST",
      body: JSON.stringify(gist),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        if (jsonRes.success) {
          enqueueSnackbar("Successfully created gist.", {
            variant: "success",
          });
          history.replace("/dash");
        } else {
          enqueueSnackbar("There was an error creating your gist.", {
            variant: "error",
          });
        }
      });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <InfoBox
          color="rgb(17, 107, 75)"
          header="CREATE GIST"
          about="You can quickly create a gist and make it private or public from the get go here. Public gists will appear on the public gists and can be seen by anyone. You can always change the visibility later."
          image={CreateGistInfo}
          ref={infoBoxRef}
          width="50%"
          height="500px"
          imageWidth="50%"
        />
      </div>
      <div className={styles.create_gist_container}>
        <h1>Create a gist</h1>
        <div
          className={
            theme === "light"
              ? styles.create_gist_form_container_light
              : styles.create_gist_form_container
          }
        >
          <input
            name="name"
            type="text"
            onChange={handleChange}
            placeholder="Gist name. e.g Sorting an array by numbers."
          />
          <CodeMirror
            ref={codeEditorRef}
            className={styles.create_gist_editor}
            value={gist?.data}
            onBeforeChange={handleEditorChange}
            options={{
              lineWrapping: true,
              lint: true,
              mode: gist?.language,
              theme: theme === "light" ? "elegant" : "material-ocean",
              lineNumbers: false,
              scrollbarStyle: "null",
            }}
          />
          <div className="create_gist_form_bottom">
            <div className={styles.create_gists_button_container}>
              <div
                className={
                  gist.private
                    ? styles.active_create_gists_button
                    : styles.create_gists_button
                }
                onClick={() => {
                  if (gist.private) return;
                  setGist({
                    ...gist,
                    private: true,
                  });
                  enqueueSnackbar("Gist has been deafulted private.");
                }}
              >
                {" "}
                Private
              </div>
              <div
                className={
                  !gist.private
                    ? styles.active_create_gists_button
                    : styles.create_gists_button
                }
                onClick={() => {
                  if (!gist.private) return;
                  setGist({
                    ...gist,
                    private: false,
                  });
                  enqueueSnackbar("Gist has been made public.");
                }}
              >
                Public
              </div>
              <select
                className={
                  theme === "light"
                    ? "create_doc_dropdown_light"
                    : "create_doc_dropdown"
                }
                name="language"
                placeholder="Language"
                onChange={handleChange}
              >
                <option value="javascript">JavaScript</option>
                <option value="css">CSS</option>
                <option value="python">Python</option>
                <option value="xml">HTML</option>
                <option value="dart">Dart</option>
                <option value="java">JAVA</option>
                <option value="javascript">JSON</option>
                <option value="javascript">JSX</option>
              </select>
            </div>
          </div>

          <div className={styles.create_gists_submit} onClick={handleSubmit}>
            {" "}
            Done{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default makePriv(withRouter(withPageTransition(CreateGist)));

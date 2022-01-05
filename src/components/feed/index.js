/* eslint-disable */
import "./feed.css";
import "../../css/user_profile.css";
import React, { useState, useContext, useRef, useCallback } from "react";
// import PropTypes from "prop-types";
import BannerImage from "../../images/banner-img.png";
import Klaus from "../../images/klaus.png";
import CarProfile from "../../images/car-profile.png";
import TreeProfile from "../../images/tree-profile.png";
import { themeContext } from "../../App";
import VerifiedTag from "../../images/verified-tag.png";
import like from "../../images/like.png";
import Send from "../../images/send-message2.png";
import Upload from "../../images/upload-image2.png";
import Question from "../../images/question.png";
import CodeSnippet from "../../images/code-snippet.png";
import AddWhite from "../../images/add-white2.png";
import PostImage from "../../images/post-image.png";
import moment from "moment";
import styles from "./feed.module.css";
import comment from "../../images/comments.png";
import { Link, withRouter } from "react-router-dom";
import injectSheet from "react-jss";
import { StyleSheet } from "../../utils/shimmer";
import { useEffect } from "react";
import { API_ENDPOINT } from "../../pages/url";
import styled from "styled-components";
import { Controlled as CodeMirror } from "react-codemirror2";
import { feedMenusContext } from "../../contexts/feedMenusContext";
import { useSnackbar } from "notistack";
import ImageCollage from "../image_collage";
import LanguageButton from "../language_button/language_button";
import InfoBox from "../info_box";
import ToFollowFromFollowers from "../tofollow_followers";
import ProfileImageWrapper from "../profile_image_wrapper";
const ManiMenuContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;
const OverlayMain = styled.div`
  position: fixed;
  display: ${(props) => (props.show ? "block" : "none")};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
  cursor: pointer;
`;
const ManiMenuCloseButton = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;

  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const QuestionTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
`;
const MenusComponent = ({ show: showMenu, menuName, setShowMenu }) => {
  const handleMenu = () => setShowMenu(!showMenu);
  return (
    <>
      {" "}
      <OverlayMain show={showMenu}>
        <ManiMenuCloseButton onClick={handleMenu}> Close </ManiMenuCloseButton>
        <MenuSubComponent menuName={menuName} handleMenu={handleMenu} />
      </OverlayMain>
    </>
  );
};

function readFile(file) {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}
const MenuSubComponent = ({ menuName, handleMenu }) => {
  const { enqueueSnackbar: snack } = useSnackbar();
  const [question, setQuestion] = useState("");
  const { theme } = useContext(themeContext);
  const imageRef = useRef();
  const postImageRef = useRef();
  const image2Ref = useRef();
  const [postBody, setPostBody] = useState("");
  const [imagePostPreview, setImagePostPreview] = useState(null);
  const [imagePost, setImagePost] = useState(null);
  const [questionPreviewImages, setQuestionPreviewImages] = useState([]);
  const [questionImages, setQuestionImages] = useState([]);
  const { snippet, changeLanguage, changeCode, changeName } =
    useContext(feedMenusContext);
  const editorRef = useRef();

  async function handleChange(e) {
    switch (e.target.name) {
      case "name":
        changeName(e.target.value);
        break;
      case "language":
        changeLanguage(e.target.value);
        break;
      case "question":
        setQuestion(e.target.value);
        break;
      case "image":
        if (e.target.files.length > 0) {
          const files = e.target.files;
          if (files > 4) {
            snack("You can only upload up to 4 images");
            return;
          }
          const images = [];
          const b64Images = [];
          for (let i = 0; i < files.length; i++) {
            if (files[i].size > 3000000) {
              snack("All images should be lesser than 3MB.");
              return;
            }
            images.push(URL.createObjectURL(files[i]));
          }
          setQuestionPreviewImages(images);
          for (let i = 0; i < files.length; i++) {
            const result = await readFile(files[i]);
            b64Images.push({
              b64: result.split(",")[1],
              type: files[i].type.split("/")[1],
            });
          }

          setQuestionImages(b64Images);
        }

        break;
      case "code_image":
        if (e.target.files.length > 0) {
          const file = e.target.files[0];
          if (file.size > 3000000) {
            snack("Image should be lesser than 3MB.");
            return;
          }
          setImagePostPreview(URL.createObjectURL(file));
          const result = await readFile(file);
          setImagePost({
            b64: result.split(",")[1],
            type: file.type.split("/")[1],
          });
        }
        break;
      case "body":
        setPostBody(e.target.value);
        break;
      default:
        break;
    }
  }

  function handleEditorChange(editor, data, value) {
    changeCode(value);
  }

  const handleCreateQuestion = () => {
    alert(question);
    fetch(`${API_ENDPOINT}/create/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      body: JSON.stringify({
        question: question,
        referenceImages: questionImages,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          snack("Question created successfully");
          setQuestion("");
          handleMenu();
        }
        console.log(data);
      });
  };

  const handleCreateImagePost = () => {
    fetch(`${API_ENDPOINT}/create/image_post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      body: JSON.stringify({
        image: imagePost,
        tags: [],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          snack("Image post created successfully.");
          setQuestion("");
          handleMenu();
        }
        console.log(data);
      });
  };

  const handleCreatePost = () => {
    fetch(`${API_ENDPOINT}/create/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      body: JSON.stringify({
        body: postBody,
        image: imagePost,
        tags: [],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          snack("Post created successfully.");
          setQuestion("");
          handleMenu();
        }
        console.log(data);
      });
  };

  const handleSubmit = () => {
    console.log(
      JSON.stringify({
        code: snippet.code,
        language: snippet.language,
        name: snippet.name,
      })
    );
    fetch(`${API_ENDPOINT}/create/snippet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      body: JSON.stringify({
        code: snippet.code,
        language: snippet.language,
        name: snippet.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Successfully created snippet");
          handleMenu();
        }
        console.log(data);
      });
  };

  const returnMenuBasedOffName = (name) => {
    switch (name) {
      case "snippet":
        return (
          <>
            <div className={styles.create_gist_container}>
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
                  placeholder="Snippet name. e.g Sorting an array by numbers."
                />
                <CodeMirror
                  ref={editorRef}
                  className={styles.create_gist_editor}
                  value={snippet?.code}
                  onBeforeChange={handleEditorChange}
                  options={{
                    lineWrapping: true,
                    lint: true,
                    mode: snippet?.language,
                    theme: theme === "light" ? "elegant" : "material-ocean",
                    lineNumbers: false,
                    scrollbarStyle: "null",
                  }}
                />
                <div className="create_gist_form_bottom">
                  <div className={styles.create_gists_button_container}>
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

                <div
                  className={styles.create_gists_submit}
                  onClick={handleSubmit}
                >
                  {" "}
                  Done{" "}
                </div>
              </div>
            </div>
          </>
        );
      case "question":
        return (
          <>
            <div className={styles.create_gist_container}>
              <div
                style={{
                  width: "600px",
                  height: "400px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    height: "200px",
                    marginBottom: "10px",
                  }}
                  onClick={() => imageRef.current.click()}
                >
                  {questionPreviewImages.length > 0 ? (
                    <>
                      {questionPreviewImages.map((image, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              width: "100px",
                              height: "100px",
                              backgroundImage: `url(${image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              margin: "10px",
                              objectFit: "cover",
                            }}
                          ></div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <p> Tap to upload images related to your question. 📸</p>
                    </>
                  )}
                  <input
                    ref={imageRef}
                    type="file"
                    multiple
                    accept="image/*"
                    name="image"
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </div>

                <div>
                  <QuestionTextArea
                    name="question"
                    type="text"
                    onChange={handleChange}
                    placeholder="Write your question here."
                  />
                </div>
              </div>
              <div
                className={styles.create_gists_submit}
                onClick={handleCreateQuestion}
              >
                {" "}
                Done{" "}
              </div>
            </div>
          </>
        );

      case "image":
        return (
          <>
            <div className={styles.create_gist_container}>
              <div
                style={{
                  width: "600px",
                  height: "400px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    height: "200px",
                    marginBottom: "10px",
                  }}
                  onClick={() => image2Ref.current.click()}
                >
                  {imagePostPreview ? (
                    <>
                      <img
                        src={imagePostPreview}
                        alt="preview"
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          height: "100%",
                        }}
                      />
                    </>
                  ) : (
                    <p> Tap to upload a code image. 📸</p>
                  )}

                  <input
                    ref={image2Ref}
                    type="file"
                    accept="image/*"
                    name="code_image"
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div
                className={styles.create_gists_submit}
                onClick={handleCreateImagePost}
              >
                {" "}
                Done{" "}
              </div>
            </div>
          </>
        );

      case "post":
        return (
          <>
            <div className={styles.create_gist_container}>
              <div
                style={{
                  width: "600px",
                  height: "400px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    height: "200px",
                    marginBottom: "10px",
                  }}
                  onClick={() => postImageRef.current.click()}
                >
                  {imagePostPreview ? (
                    <>
                      <img
                        src={imagePostPreview}
                        alt="preview"
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          height: "100%",
                        }}
                      />
                    </>
                  ) : (
                    <p> Tap to upload an image related to your post. 📸</p>
                  )}
                  <input
                    ref={postImageRef}
                    type="file"
                    accept="image/*"
                    name="code_image"
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </div>

                <div>
                  <QuestionTextArea
                    name="body"
                    type="text"
                    onChange={handleChange}
                    placeholder="Write your gossip here."
                  />
                </div>
              </div>
              <div
                className={styles.create_gists_submit}
                onClick={handleCreatePost}
              >
                {" "}
                Done{" "}
              </div>
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <ManiMenuContainer>{returnMenuBasedOffName(menuName)}</ManiMenuContainer>
  );
};

const FollowedComponent = ({ result }) => {
  return (
    <>
      <section className="post image">
        <div className="post-head">
          <ProfileImageWrapper
            profileImageUrl={result?.whoFollowedId?.profileImageUrl}
            username={result?.whoFollowedId?.username}
          />
          <div className="post-user-info">
            <div>
              <span className="post-username">
                {result?.whoFollowedId?.username}
              </span>
              <img src={VerifiedTag} alt="verifiedtag" />
              <span className="post-email">{""}</span>
            </div>
            <div className="post-timestamp">
              {moment(result.createdAt).format("LLL")}
            </div>
          </div>
        </div>
        <span className="post-desc">
          Followed{" "}
          {localStorage.getItem("profile_user_id") === result.followedId._id
            ? "you"
            : result.followedId.username}
        </span>
        <div className="post-main">
          <ProfileImageWrapper
            profileImageUrl={result.followedId.profileImageUrl}
            username={result.followedId.username}
          />
        </div>
      </section>
    </>
  );
};

const SnippetPostComponent = ({ result }) => {
  const { theme } = useContext(themeContext);
  return (
    <>
      <section className="post code-snippet">
        <div className="post-head">
          <ProfileImageWrapper
            profileImageUrl={result?.snippetId?.user?.profileImageUrl}
            username={result?.snippetId?.user?.username}
          />
          <div className="post-user-info">
            <div>
              <span className="post-username">
                {result?.snippetId?.user?.username}
              </span>
              <img src={VerifiedTag} alt="verifiedtag" />
              <span className="post-email">{""}</span>
            </div>
            <div className="post-timestamp">
              {moment(result.createdAt).format("LLL")}
            </div>
          </div>
        </div>
        <span className="post-desc">
          {localStorage.getItem("profile_user_id") ===
          result?.snippetId?.user?._id
            ? "you "
            : result?.snippetId?.user?.username + " "}
          shared a code snippet.
        </span>
        <div className="post-main">
          <h3 className="post-title">{result?.snippetId?.name}</h3>
          <div className="snippet_container">
            <div
              style={{
                display: "flex",
                padding: "10px",
                justifyContent: "flex-end",
              }}
            >
              {" "}
              <LanguageButton language={result?.snippetId?.language} />
            </div>
            <CodeMirror
              className={styles.snippet_editor}
              value={result?.snippetId?.code}
              options={{
                lineWrapping: true,
                lint: false,
                mode: result?.snippetId?.language,
                theme: theme === "light" ? "cobalt" : "material-ocean",
                scrollbarStyle: "null",
              }}
            />
          </div>
          <div className="post-actions">
            <div>
              <img src={like} alt="like" /> 21
            </div>
            <div>
              <img src={comment} alt="comment" /> 15
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const QuestionPostComponent = ({ result }) => {
  return (
    <>
      <section className="post code-snippet">
        <div className="post-head">
          <ProfileImageWrapper
            profileImageUrl={result?.questionId?.user?.profileImageUrl}
            username={result?.questionId?.user?.profileImageUrl}
          />
          <div className="post-user-info">
            <div>
              <span className="post-username">
                {result?.questionId?.user?.username}
              </span>
              <img src={VerifiedTag} alt="verifiedtag" />
              <span className="post-email">{""}</span>
            </div>
            <div className="post-timestamp">
              {moment(result.createdAt).format("LLL")}
            </div>
          </div>
        </div>
        <span className="post-desc">
          {localStorage.getItem("profile_user_id") ===
          result?.questionId?.user?._id
            ? "you "
            : result?.questionId?.user?.username + " "}
          asked a question.
        </span>
        <div className="post-main">
          <p className="post-description">
            <b>
              <i>{result?.questionId?.question}</i>
            </b>
          </p>
          <ImageCollage images={result?.questionId?.imageUrls} />
          <div className="post-actions">
            <div>
              <img src={like} /> 21
            </div>
            <div>
              <img src={comment} /> 15
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const PostComponent = ({ result }) => {
  return (
    <>
      <section className="post code-snippet">
        <div className="post-head">
          <ProfileImageWrapper
            profileImageUrl={result?.postId?.user?.profileImageUrl}
            username={result?.postId?.user?.username}
          />
          <div className="post-user-info">
            <div>
              <span className="post-username">
                {result?.postId?.user?.username}
              </span>
              <img src={VerifiedTag} alt="verifiedtag" />
              <span className="post-email">{""}</span>
            </div>
            <div className="post-timestamp">
              {moment(result.createdAt).format("LLL")}
            </div>
          </div>
        </div>
        <span className="post-desc">
          {localStorage.getItem("profile_user_id") === result?.postId?.user?._id
            ? "You "
            : result?.postId?.user?.username + " "}
          made a post.
        </span>
        <div className="post-main">
          <ImageCollage images={[result?.postId?.imageUrl]} />
          <p className="post-description">
            <b>{result?.postId?.body}</b>
          </p>
          <div className="post-actions">
            <div>
              <img src={like} /> 21
            </div>
            <div>
              <img src={comment} /> 15
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ImagePostComponent = ({ result }) => {
  return (
    <>
      <section className="post code-snippet">
        <div className="post-head">
          <ProfileImageWrapper
            profileImageUrl={result?.imagePostId?.user?.profileImageUrl}
            username={result?.imagePostId?.user?.username}
          />
          <div className="post-user-info">
            <div>
              <span className="post-username">
                {result?.imagePostId?.user?.username}
              </span>
              <img src={VerifiedTag} alt="verifiedtag" />
              <span className="post-email">{""}</span>
            </div>
            <div className="post-timestamp">
              {moment(result.createdAt).format("LLL")}
            </div>
          </div>
        </div>
        <span className="post-desc">
          {localStorage.getItem("profile_user_id") ===
          result?.imagePostId?.user?._id
            ? "you "
            : result?.imagePostId?.user?.username + " "}
          posted an image.
        </span>
        <div className="post-main">
          <ImageCollage images={[result?.imagePostId?.imageUrl]} />
          <div className="post-actions">
            <div>
              <img src={like} /> 21
            </div>
            <div>
              <img src={comment} /> 15
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
const LikeComponent = ({ result }) => {
  const { theme } = useContext(themeContext);
  return (
    <>
      <section className="post code-snippet">
        <div className="post-head">
          <ProfileImageWrapper
            profileImageUrl={result?.whoLikedId?.profileImageUrl}
            username={result?.whoLikedId?.username}
          />
          <div className="post-user-info">
            <div>
              <span className="post-username">
                {result?.whoLikedId?.username}
              </span>
              <img src={VerifiedTag} alt="verifiedtag" />
              <span className="post-email">{""}</span>
            </div>
            <div className="post-timestamp">
              {moment(result.createdAt).format("LLL")}
            </div>
          </div>
        </div>
        <span className="post-desc">
          {localStorage.getItem("profile_user_id") === result?.whoLikedId?._id
            ? "you "
            : result?.whoLikedId?.username + " "}
          liked a gist.
        </span>
        <div className="post-main">
          <h3 className="post-title">{result?.docId?.name}</h3>
          <div className="snippet_container">
            <div
              style={{
                display: "flex",
                padding: "10px",
                justifyContent: "flex-end",
              }}
            >
              {" "}
              <LanguageButton language={result?.docId?.language} />
            </div>
            <CodeMirror
              className={styles.snippet_editor}
              value={result?.docId?.data}
              options={{
                lineWrapping: true,
                lint: false,
                mode: result?.docId?.language,
                theme: result?.docId?.theme,
                scrollbarStyle: "null",
              }}
            />
          </div>
          <div className="post-actions">
            <div>
              <img src={like} alt="like" /> 21
            </div>
            <div>
              <img src={comment} alt="comment" /> 15
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const FeedComponent = () => {
  const [menuName, setMenuName] = useState("snippet");
  const [showMenu, setShowMenu] = useState(false);
  const [initialPage, setInitPage] = useState(1);
  const [pagePrev, setPagePrev] = useState();
  const [pageNext, setPageNext] = useState();
  const [results, setResults] = useState([]);
  const infoBoxRef = useRef();
  const code = String.raw`body {
    background - color: #FFFFFF;
    color: #000000;
    grid-template-columns: 270px 1fr;
    max-width: 100vw;
    ...
};
    `;

  useEffect(() => {
    fetch(`${API_ENDPOINT}/feed?page=1&limit=10`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        if (jsonRes.success) {
          setResults(jsonRes.message.results);
        }
      });
  }, []);

  const feedByType = (result) => {
    switch (result.type) {
      case "likeddoc":
        return <LikeComponent result={result} />;
      case "follow":
        return <FollowedComponent result={result} />;
      case "snippet":
        return <SnippetPostComponent result={result} />;
      case "question":
        return <QuestionPostComponent result={result} />;
      case "image_post":
        return <ImagePostComponent result={result} />;
      case "post":
        return <PostComponent result={result} />;
      default:
        return "";
    }
  };

  const handleCodeSnippetClick = () => {
    setMenuName("snippet");
    setShowMenu(true);
  };
  const handleQuestionClick = () => {
    setMenuName("question");
    setShowMenu(true);
  };
  const handlePostClick = () => {
    setMenuName("post");
    setShowMenu(true);
  };
  const handleImageClick = () => {
    setMenuName("image");
    setShowMenu(true);
  };
  return (
    <>
      <MenusComponent
        show={showMenu}
        menuName={menuName}
        setShowMenu={setShowMenu}
      />
      {results.length > 0 ? (
        <>
          <main className="feed-main">
            <section className="feed-body">
              <InfoBox
                color="#052562"
                header="Welcome to Feed!"
                image={BannerImage}
                about="Here you can see what people you follow are up to and meet other people."
                ref={infoBoxRef}
                width="462px"
                height="520px"
                imageWidth="50%"
              />
              <section className="create-post">
                <ProfileImageWrapper
                  profileImageUrl={localStorage.getItem("profile_user_pic")}
                  username={localStorage.getItem("profile_user_name")}
                />
                <div className="text-editor">
                  <div id="insert-object">
                    <span
                      style={{
                        backgroundColor: "#478E0E",
                        cursor: "pointer",
                      }}
                      onClick={handleImageClick}
                    >
                      <img src={Upload} alt="upload" />
                      Image
                    </span>
                    <span
                      style={{
                        backgroundColor: "#B70A0A",
                        cursor: "pointer",
                      }}
                      onClick={handleCodeSnippetClick}
                    >
                      <img src={CodeSnippet} alt="code_snippet" />
                      Code Snippet
                    </span>
                    <span
                      style={{
                        backgroundColor: "#0B6287",
                        cursor: "pointer",
                      }}
                      onClick={handleQuestionClick}
                    >
                      <img src={Question} alt="question" />
                      Question
                    </span>
                    <span
                      style={{
                        backgroundColor: "#000000",
                        cursor: "pointer",
                      }}
                      onClick={handlePostClick}
                    >
                      <img src={AddWhite} alt="addwhite" />
                      Create Gossip
                    </span>
                  </div>
                </div>
              </section>

              {results.map((result, idx) => {
                return <div key={idx}>{feedByType(result)}</div>;
              })}
            </section>
            <aside className="feed-aside">
              <ToFollowFromFollowers type="tofollow" />
            </aside>
          </main>
        </>
      ) : (
        <>
          <main className="feed-main">
            <section className="feed-body">
              <div>Follow more people to get feed.</div>

              <section className="create-post">
                <ProfileImageWrapper
                  profileImageUrl={localStorage.getItem("profile_user_pic")}
                  username={localStorage.getItem("profile_user_name")}
                />
                <div className="text-editor">
                  <div id="insert-object">
                    <span
                      style={{ backgroundColor: "#478E0E", cursor: "pointer" }}
                      onClick={handleImageClick}
                    >
                      <img src={Upload} alt="upload" />
                      Image
                    </span>
                    <span
                      style={{
                        backgroundColor: "#B70A0A",
                        cursor: "pointer",
                      }}
                      onClick={handleCodeSnippetClick}
                    >
                      <img src={CodeSnippet} alt="code_snippet" />
                      Code Snippet
                    </span>
                    <span
                      style={{
                        backgroundColor: "#0B6287",
                        cursor: "pointer",
                      }}
                      onClick={handleQuestionClick}
                    >
                      <img src={Question} alt="question" />
                      Question
                    </span>
                    <span
                      style={{ backgroundColor: "#000000", cursor: "pointer" }}
                      onClick={handlePostClick}
                    >
                      <img src={AddWhite} alt="addwhite" />
                      Create Post
                    </span>
                  </div>
                </div>
              </section>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default withRouter(injectSheet(StyleSheet)(FeedComponent));

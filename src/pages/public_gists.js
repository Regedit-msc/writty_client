/* eslint-disable no-undef */
import { useState, useEffect, useRef, useContext } from "react";
import { Controlled as CodeMirror } from 'react-codemirror2';
import { themeContext } from "../App";
import Code from "../images/code.svg";
import like from "../images/like.png";
import notLike from "../images/not_like.png"
import comment from "../images/comments.png";
import React from "react";
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
import "../css/not_auth_public_gists.css"
import { useTitle } from "../utils/title";
import Search from "../images/search-button.svg";
import { Link, useNavigate } from "react-router-dom";
import InfoBar from "../components/info";
import moment from "moment";
import injectSheet from "react-jss";
import { StyleSheet } from "../utils/shimmer";
import CustomShimmer from "../components/shimmerComp";
import { useScroll } from "../utils/scroll";
import ProfileImage from "../components/profileImage/index";
import { createRef } from "react";
import InfoBox from "../components/info_box";
// import NavBar from "../components/navbar";
import PublicGistsInfo from "../images/public_gists.svg";
import LanguageButton from "../components/language_button/language_button";
import {
  SearchWrapper,
  ManinPublicGistsContainer,
  ManinPublicGists,
  MacDiv,
  EditorDiv,
  Mac2Div,
  MainEditorDiv,
} from "./styles/public_gists";

const { API_ENDPOINT } = require("./url");

const PublicGists = (props) => {
  useScroll();
  const navigate = useNavigate();
  const defaultImage =
    "https://cdn3.vectorstock.com/i/thumb-large/76/57/portrait-young-bearded-man-in-eyeglasses-vector-34397657.jpg";
  const { theme } = useContext(themeContext);
  let init = localStorage.getItem("initPage") ?? 1;
  const [err, setErr] = useState();
  const [showErr, setShowErr] = useState(false);
  useTitle(`Public gists page ${init}.`);
  const inputRef = useRef();
  const [initialPage, setInitPage] = useState(1);
  const [pagePrev, setPagePrev] = useState();
  const [pageNext, setPageNext] = useState();
  const [userID, setUserID] = useState(null);
  const [limit] = useState(6);
  const codeEditorRef = useRef();
  const [docs, setDocs] = useState([]);
  const infoBoxRef = useRef();
  const ref = useRef([1, 2, 3, 4, 5, 6].map(() => createRef()));
  useEffect(() => {
    // eslint-disable-next-line no-undef
    console.log(ref, "ref");
    let init = localStorage.getItem("initPage") ?? 1;
    setInitPage(parseInt(init));

    fetch(
      API_ENDPOINT +
        `/public/docs/paginated?page=${init ?? initialPage}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((response) => {
        setPageNext(response.message.next?.page);
        setPagePrev(response.message.previous?.page);
        setDocs(response.message.results);
      });
    console.log(initialPage);
  }, [initialPage, limit]);
  useEffect(() => {
    if (localStorage.getItem("user_token") !== null) {
      fetch(`${API_ENDPOINT}/user/name`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          console.log(jsonRes);
          if (jsonRes.success) {
            setUserID(jsonRes.message._id);
            console.log(jsonRes.message._id);
          }
          // else {

          // }
        });
    }
  }, []);

  function previous() {
    setDocs([]);
    setPageNext(null);
    setPagePrev(null);
    localStorage.setItem("initPage", pagePrev);
    setInitPage(pagePrev);
  }

  function next() {
    setDocs([]);
    setPageNext(null);
    setPagePrev(null);
    localStorage.setItem("initPage", pageNext);
    setInitPage(pageNext);
  }

  function handleCommentClick(id) {
    navigate(`/comments/editor/${id}`);
  }
  const debounce = function (fn, d) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, d);
    };
  };

  useEffect(() => {
    inputRef.current = debounce(searchByWordOrLetters, 500);
  }, []);
  function handleLikeClick(id) {
    fetch(`${API_ENDPOINT}/like`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      method: "POST",
      body: JSON.stringify({ publicLink: id }),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        if (jsonRes.success) {
          let newArr = [];
          for (let i = 0; i < docs.length; i++) {
            if (docs[i].publicLink === id) {
              newArr.push({
                ...docs[i],
                likes:
                  docs[i]?.likes.findIndex((e) => e.user === userID) === -1
                    ? [...docs[i]?.likes, { user: userID }]
                    : [...docs[i]?.likes.filter((e) => e.user !== userID)],
              });
            } else {
              newArr.push(docs[i]);
            }
          }
          console.log(newArr);
          setDocs(newArr);
        } else {
          setErr("You have to be logged in to perform this action.");
          setShowErr(true);
          setTimeout(() => {
            setErr("");
            setShowErr(false);
          }, 3000);
        }
      });
  }

  function searchByWordOrLetters(v) {
    setDocs([]);
    setPageNext(null);
    setPagePrev(null);

    fetch(API_ENDPOINT + `/search/docs?wol=${v}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(v);
        console.log(response);

        setDocs(response.message);
        setPageNext(null);
        setPagePrev(null);
      });
  }
  const handleChange = (event) => {
    const input = event.target.value;
    if (event.target.value === "") {
      setDocs([]);
      setPageNext(null);
      setPagePrev(null);

      return setInitPage(localStorage.getItem("initPage"));
    }
    inputRef.current(input);
  };

  const newUI = (
    <>
      {showErr ? <InfoBar color="red" text={err} /> : ""}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <InfoBox
          color="rgb(67 17 107)"
          header="WELCOME TO PUBLIC GISTS"
          about="See code other programmers have made public. Search quickly for solutions and find variety of answers in one place."
          image={PublicGistsInfo}
          ref={infoBoxRef}
          width="50%"
          height="450px"
        />
      </div>
      {/* <p className={theme === "light" ? "big2_light" : "big2"}>PUBLIC GISTS.</p> */}
      <SearchWrapper dark={theme !== "light"}>
        <button>
          {" "}
          <img className="search-icon" src={Search} alt="search" />{" "}
        </button>
        <input
          className="search"
          type="search"
          name="search"
          placeholder="Search gists by name"
          onChange={handleChange}
          ref={inputRef}
        />
      </SearchWrapper>
      <ManinPublicGistsContainer>
        <ManinPublicGists>
          {docs && docs.length > 0 ? (
            docs.map((doc, index) => (
              <div key={index}>
                <MainEditorDiv>
                  <MacDiv light={theme === "light"}>
                    <img src={Code} alt="mac_buttons" />
                    <p>{moment(doc.createdAt).startOf("hour").fromNow()}</p>
                    <p>
                      {doc.name.toUpperCase()} /{" "}
                      <LanguageButton language={doc.language} />{" "}
                    </p>
                  </MacDiv>
                  <EditorDiv>
                    <CodeMirror
                      ref={codeEditorRef}
                      value={doc.data}
                      options={{
                        lineWrapping: true,
                        lint: true,
                        mode: doc.language === "html" ? "xml" : doc.language,
                        theme: doc.theme ?? "mdn-like",
                        lineNumbers: false,
                        scrollbarStyle: "null",
                      }}
                    />
                  </EditorDiv>

                  <Mac2Div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "8rem",
                      }}
                    >
                      <Link to={`/${doc?.user?.username}`}>
                        <img
                          style={{
                            width: "2.5rem",
                            height: "auto",
                            borderRadius: "50%",
                          }}
                          src={doc.user?.profileImageUrl ?? defaultImage}
                          alt="profile ."
                          onMouseOver={() => {
                            ref.current[index].current.style.display = "flex";
                            ref.current[index].current?.classList?.add(
                              "fade_in_c"
                            );
                            setTimeout(() => {
                              ref.current[index].current?.classList?.remove(
                                "fade_in_c"
                              );
                            }, 500);
                            console.log("Event fired");
                          }}
                          onMouseLeave={() => {
                            ref.current[index].current?.classList.add(
                              "fade_out_c"
                            );
                            setTimeout(() => {
                              ref.current[index].current?.classList.remove(
                                "fade_out_c"
                              );
                              ref.current[index].current.style.display = "none";
                            }, 500);
                          }}
                        />
                      </Link>
                      <p>
                        {" "}
                        <span>{doc?.user?.username}</span>{" "}
                      </p>
                      <ProfileImage
                        image={doc?.user?.profileImageUrl ?? defaultImage}
                        name={doc?.user?.username}
                        title={
                          doc?.user?.userSkills?.length > 0
                            ? doc.user.userSkills[0]
                            : ""
                        }
                        about={doc?.user?.about}
                        ref={ref.current[index]}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "7rem",
                      }}
                    >
                      <div>
                        <img
                          src={
                            doc?.likes?.findIndex((e) => e.user === userID) ===
                            -1
                              ? notLike
                              : like
                          }
                          alt="like button"
                          onClick={() => handleLikeClick(doc.publicLink)}
                          style={{ width: "2rem" }}
                        />{" "}
                        <span>{doc?.likes?.length ?? 0}</span>
                      </div>

                      <div>
                        <img
                          src={comment}
                          alt="comment button"
                          onClick={() => handleCommentClick(doc.publicLink)}
                          style={{ width: "2rem" }}
                        />{" "}
                        <span>{doc?.comments?.length ?? 0}</span>
                      </div>
                    </div>
                  </Mac2Div>
                </MainEditorDiv>
              </div>
            ))
          ) : (
            <>
              <CustomShimmer>
                <div className={props.classes.publicEditor} />
              </CustomShimmer>
              <CustomShimmer>
                <div className={props.classes.publicEditor} />
              </CustomShimmer>{" "}
              <CustomShimmer>
                <div className={props.classes.publicEditor} />
              </CustomShimmer>{" "}
              <CustomShimmer>
                <div className={props.classes.publicEditor} />
              </CustomShimmer>{" "}
              <CustomShimmer>
                <div className={props.classes.publicEditor} />
              </CustomShimmer>{" "}
              <CustomShimmer>
                <div className={props.classes.publicEditor} />
              </CustomShimmer>
            </>
          )}
        </ManinPublicGists>
      </ManinPublicGistsContainer>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {pagePrev ? (
          <button
            className={theme === "light" ? "prev_next_light" : "prev_next"}
            onClick={previous}
          >
            Previous
          </button>
        ) : (
          ""
        )}{" "}
        {pageNext ? (
          <button
            className={theme === "light" ? "prev_next_light" : "prev_next"}
            onClick={next}
          >
            Next
          </button>
        ) : (
          ""
        )}
      </div>
      {/* {showComment ? <Comment
                code_id={codeID}
            /> : <div></div>} */}
    </>
  );

  return newUI;
};

export default injectSheet(StyleSheet)(PublicGists);
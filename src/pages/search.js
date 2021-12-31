/* eslint-disable no-undef */
import { useQuery } from "../utils/search_query"
import "../css/search.css"
import { useState } from "react";
import { useEffect } from "react";
import { API_ENDPOINT } from "./url";
import React from "react";
import { useMemo } from "react";
import PlaceholderProfileImage from "../images/placeholder-profile-image.png"
import { useRef } from "react";
import { useHistory } from "react-router";
import { makePriv } from "../auth_hoc/checkAuth";
// import { createRef } from "react";
// import ProfileImage from "../components/profileImage";
// import { useCallback } from "react";
// import { createRef } from "react";
// import ProfileImage from "../components/profileImage";
// import { useCallback } from "react";

// import { useCallback } from "react";
const Search = () => {
  const history = useHistory();
  const query = useQuery();
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("user");
  const location = useMemo(() => window.location, []);
  const searchTerm = location.href.split("search")[1].slice(1);
  const dochecks2 = () => {
    if (searchTerm.startsWith("user")) {
      return "user";
    } else if (searchTerm.startsWith("code")) {
      return "code";
    } else {
      return "post";
    }
  };
  const searchString = query.get(dochecks2());
  const [searchData, setSearchData] = useState([]);
  // const [refs, setRefs] = useState([]);
  // const refs = useCallback(() => {
  //     return searchData.map(() => createRef())
  // }, [searchData]);

  useEffect(() => {
    const dochecks = () => {
      if (searchTerm.startsWith("user")) {
        return "users";
      } else if (searchTerm.startsWith("code")) {
        return "code";
      } else {
        return "post";
      }
    };
    console.log(dochecks(), searchString);
    fetch(API_ENDPOINT + `/search/` + dochecks() + `?wol=` + searchString, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        // eslint-disable-next-line no-undef
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        // refs.current = response.message.fill(1).map((_, i) => refs?.current[i] || createRef())

        setSearchData(response.message);
      })
      .catch((e) => console.error(e));
  }, [searchString, location.href, setSearchData, searchTerm]);

  function handleSearchInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      const inputValueToUrl = new URLSearchParams({
        [searchQuery]: inputValue,
      }).toString();
      window.location.href = window.location.href + "?" + inputValueToUrl;
    } else if (e.key === "f") {
      inputRef.current.focus();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress1);
    function handleKeyPress1(e) {
      if (e.key === "Enter") {
        const inputValueToUrl = new URLSearchParams({
          [searchQuery]: inputValue,
        }).toString();
        window.location.href = window.location.href + "?" + inputValueToUrl;
      } else if (e.key === "f") {
        inputRef.current.focus();
      }
    }
    return () => document.removeEventListener("keydown", handleKeyPress1);
  }, [inputValue, searchQuery]);

  if (searchTerm.startsWith("user")) {
    return (
      <>
        <div className="search_heading">
          {" "}
          Search results for{" "}
          <span style={{ marginRight: "0.7rem", marginLeft: "0.7rem" }}>
            {searchString}
          </span>
          .
        </div>
        <div className="search_results">
          {searchData?.length > 0 ? (
            searchData.map((result, index) => {
              // console.log(refs);
              return (
                <div className="fade_in_results " key={index}>
                  <div className="search_result_user">
                    {/* <ProfileImage
                                    image={result?.profileImageUrl ?? PlaceholderProfileImage}
                                    name={result?.username}
                                    title="React JS Developer"
                                    about="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
                                    ref={refs?.current[index]}
                                /> */}
                    <img
                      onClick={() => {
                        history.replace(`/@/${result?.username}`);
                      }}
                      alt="search_restult"
                      src={result?.profileImageUrl ?? PlaceholderProfileImage}
                    />
                    <span>{result?.username}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="search_notfound">
                <code className="prettyprint" style={{ fontSize: "2rem" }}>
                  No results found for {searchString} .
                </code>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
  if (searchTerm.startsWith("code")) {
    return (
      <>
        <div></div>
      </>
    );
  }

  return (
    <>
      <div className="search_search_container">
        <input
          type="search"
          name="search"
          className="search_search"
          placeholder="Search anything e.g John Doe, binary search python..."
          autoComplete="off"
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
          ref={inputRef}
        />
      </div>
      <div className="search_query_btns_container">
        <div
          className={`search_query_button ${
            searchQuery === "user" ? "active_search_query_btn" : ""
          }`}
          onClick={() => {
            setSearchQuery("user");
          }}
        >
          {" "}
          User
        </div>
        <div
          className={`search_query_button ${
            searchQuery === "code" ? "active_search_query_btn" : ""
          }`}
          onClick={() => {
            setSearchQuery("code");
          }}
        >
          {" "}
          Code
        </div>
        <div
          className={`search_query_button ${
            searchQuery === "post" ? "active_search_query_btn" : ""
          }`}
          onClick={() => {
            setSearchQuery("post");
          }}
        >
          {" "}
          Post
        </div>
      </div>
      <div className="search_info">
        <span>
          Press{" "}
          <code>
            <i>Enter</i>
          </code>{" "}
          to <h1>search</h1>{" "}
        </span>
        <span>
          Press{" "}
          <code>
            <i>F</i>
          </code>{" "}
          to <h1>focus</h1>{" "}
        </span>
      </div>
    </>
  );
};

export default makePriv(Search);
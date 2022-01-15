import React from "react";
import { useNavigate } from "react-router-dom";
function LanguageButton({ language }) {
  const navigate = useNavigate();
  return (
    <>
      <span
        className="language_button"
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "2px",
          paddingBottom: "2px",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/languages/${language}`);
        }}
        id={language[0].toUpperCase() + language.slice(1, language.length)}
      >
        {language[0].toUpperCase() + language.slice(1, language.length)}{" "}
      </span>
    </>
  );
}

export default LanguageButton;

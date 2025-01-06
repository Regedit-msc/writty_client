import { createContext, useState } from "react";
export const feedMenusContext = createContext();
const FeedMenuContextProvider = (props) => {
  const [snippet, setSnippet] = useState({
    code: "",
    name: "",
    language: "javascript",
  });
  const changeLanguage = (language) => setSnippet({ ...snippet, language });

  const changeCode = (code) => setSnippet({ ...snippet, code });

  const changeName = (name) => setSnippet({ ...snippet, name });
  return (
    <feedMenusContext.Provider
      value={{ snippet, changeLanguage, changeCode, changeName }}
    >
      {props.children}
    </feedMenusContext.Provider>
  );
};

export default FeedMenuContextProvider;

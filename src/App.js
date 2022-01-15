/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-undef */

import { Route, Routes, Outlet } from "react-router-dom";
import MainErrorBoundary from "./components/main_error_boundary/main_boundary";
import React from "react";
import UserContextProvider from "./contexts/userContext";
import ImageContextProvider from "./contexts/imageContext";
import Dash from "./pages/dash";
import PublicGists from "./pages/public_gists";
import TextEditor from "./monacoEditor";
import PublicEditor from "./publicEditor";
import CollabEditor from "./collabEditor";
import PropTypes from "prop-types";
import NotFound from "./pages/404";
// import Home from "./pages/home"
import Settings from "./pages/settings";
import { useEffect, createContext, useState } from "react";
import Login from "./pages/login";
import Signup from "./pages/signup";
// import { withGetScreen } from "react-getscreen";
// import Mobile from "./pages/mobile";
import CommentPage from "./pages/comment";
// import UserProfile from "./pages/user_profile";
import Chat from "./pages/chat";
import { SnackbarProvider } from "notistack";
import OTP from "./pages/otp";
import NavBar from "./components/navbar";
import Setup_01 from "./pages/setup_01";
// import Setup_02 from "./pages/setup_02"
// import Setup_03 from "./pages/setup_03";
// import Setup_04 from "./pages/setup_04";
// import Setup_05 from "./pages/setup_05";
// import Setup_06 from "./pages/setup_06";
import ChatWaitingRoom from "./pages/chat_waiting_room";
// import Forgot_01 from "./pages/forgot_01";
// import Forgot_02 from "./pages/forgot_02";
// import Forgot_03 from "./pages/forgot_03";
// import Forgot_04 from "./pages/forgot_04";
import Languages from "./pages/languages";
import Search from "./pages/search";
import CreateGist from "./pages/create_gist";
import Feed from "./pages/feed";
import { AnimatePresence } from "framer-motion";
import PyodideProvider from "./contexts/pyDiodeContext";
import Notification from "./pages/notification";
import Tags from "./pages/tags";
import NewProfilePage from "./pages/new_profile_page";
import NewLanding from "./pages/new_landing";

export const themeContext = createContext();
function App(props) {
  // const [windowSize, setWindowSize] = useState({
  //   width: undefined,
  //   height: undefined,
  // });
  const [theme, setTheme] = useState("");
  // const [mobile] = useState(false);
  function setTheTheme(value) {
    setTheme(value);
  }

  useEffect(() => {
    const theme1 = localStorage.getItem("theme_app");
    switch (theme1) {
      case "light":
        setTheTheme("light");
        document.body.classList.replace("dark", "light");
        localStorage.setItem("theme_app", "light");
        break;
      case "dark":
        setTheTheme("dark");
        document.body.classList.replace("light", "dark");
        localStorage.setItem("theme_app", "dark");
        break;
      default:
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setTheTheme("dark");
          document.body.classList.replace("light", "dark");
          localStorage.setItem("theme_app", "dark");
        } else {
          setTheTheme("light");
          document.body.classList.replace("dark", "light");
          localStorage.setItem("theme_app", "light");
        }
        break;
    }
  }, []);
  // useEffect(() => {
  //   if (props.isMobile()) {
  //     setMobile(true);
  //   } else {
  //     setMobile(false);
  //   }
  // }, [props, windowSize]);

  // window.addEventListener("resize", handleResize);
  // function handleResize() {
  //   setWindowSize({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   });
  // }

  // useEffect(() => {
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  // const notAllowedR = ["/", "/register", "/auth/login", "/signup", "/otp"];

  return (
    <>
      <MainErrorBoundary>
        <PyodideProvider>
          <themeContext.Provider value={{ setTheTheme, theme }}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <ImageContextProvider>
                <UserContextProvider>
                  <AnimatePresence exitBeforeEnter>
                    <Routes>
                      {/* {notAllowedR.includes(window.location.pathname) ||
                    window.location.pathname.includes("chat") ? (
                      ""
                    ) : (
                      <NavBar />
                    )} */}

                      <Route
                        path="/"
                        element={
                          <>
                            <NavBar />
                            <Outlet />
                          </>
                        }
                      >
                        <Route index element={<NewLanding />} />
                        <Route path="dash" element={<Dash />} />
                        <Route path="gists" element={<PublicGists />} />
                        <Route path="search" element={<Search />} />
                        <Route
                          path="notifications"
                          element={<Notification />}
                        />
                        <Route path="feed" element={<Feed />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="new/gist" element={<CreateGist />} />
                        <Route path="languages" element={<Languages />} />

                        <Route
                          path="languages/:language"
                          element={<Languages />}
                        />
                        <Route path="tag/:tag" element={<Tags />} />

                        <Route
                          path="public/editor/:id"
                          element={<PublicEditor />}
                        />
                        <Route path="edit/:id" element={<TextEditor />} />
                        <Route path=":name" element={<NewProfilePage />} />
                        <Route
                          path="comments/editor/:id"
                          element={<CommentPage />}
                        />

                        <Route
                          path="editor/collab/:id"
                          element={<CollabEditor />}
                        />

                        <Route path="*" element={<NotFound />} />
                      </Route>
                      <Route path="chat" element={<ChatWaitingRoom />} />
                      <Route path=":name/chat" element={<Chat />} />
                      <Route path="auth" element={<Login />}>
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="otp" element={<OTP />} />
                        <Route path="onboard" element={<Setup_01 />} />
                        <Route path="*" element={<NotFound />} />
                      </Route>
                    </Routes>
                  </AnimatePresence>
                </UserContextProvider>
              </ImageContextProvider>
            </SnackbarProvider>
          </themeContext.Provider>
        </PyodideProvider>
      </MainErrorBoundary>
    </>
  );
}
App.propTypes = {
  isMobile: PropTypes.func,
};

export default App;

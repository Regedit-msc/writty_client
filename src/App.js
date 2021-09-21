/* eslint-disable no-undef */

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React from "react";
import Landing from "./pages/landing"
import UserContextProvider from "./contexts/userContext"
import ImageContextProvider from "./contexts/imageContext"
import dash from "./pages/dash"
import PublicGists from "./pages/public_gists"
import TextEditor from "./monacoEditor"
import PublicEditor from "./publicEditor"
import CollabEditor from "./collabEditor";
import PropTypes from "prop-types"
import NotFound from "./pages/404"
// import Home from "./pages/home"
import Settings from "./pages/settings"
import { useEffect, createContext, useState } from "react"
import Login from "./pages/login"
import Signup from "./pages/signup"
import { withGetScreen } from 'react-getscreen'
import Mobile from "./pages/mobile"
import CommentPage from "./pages/comment"
import UserProfile from "./pages/user_profile"
import Chat from "./pages/chat"
import { SnackbarProvider } from 'notistack';
import OTP from "./pages/otp"
import NavBar from "./components/navbar"
import Setup_01 from "./pages/setup_01"
// import Setup_02 from "./pages/setup_02"
import Setup_03 from "./pages/setup_03"
import Setup_04 from "./pages/setup_04"
import Setup_05 from "./pages/setup_05"
import Setup_06 from "./pages/setup_06"
import ChatWaitingRoom from "./pages/chat_waiting_room"
import Forgot_01 from "./pages/forgot_01"
import Forgot_02 from "./pages/forgot_02"
import Forgot_03 from "./pages/forgot_03"
import Forgot_04 from "./pages/forgot_04"
import Languages from "./pages/languages"
import Search from "./pages/search"
import CreateGist from "./pages/create_gist"





export const themeContext = createContext();
function App(props) {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [theme, setTheme] = useState('');
  const [mobile, setMobile] = useState();
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
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
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
  }, [])
  useEffect(() => {
    if (props.isMobile()) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [props, windowSize])


  window.addEventListener("resize", handleResize);
  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const notAllowedR = ["/", "/register", "/login", "/signup", "/otp"];
  return (

    <>

      <themeContext.Provider value={{ setTheTheme, theme }}  >
        <SnackbarProvider anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        >
          <ImageContextProvider>
            <UserContextProvider>
              <Router>
                {
                  notAllowedR.includes(window.location.pathname) || window.location.pathname.includes("chat") ? '' : <NavBar />
                }

                <Switch>
                  <Route exact path="/" component={mobile ? Mobile : Landing} />
                  {/* <Route exact path="/home" component={mobile ? Mobile : Home} /> */}
                  {/* <Route path="/editor/:lang/:id" component={Editor} /> */}
                  <Route exact path="/dash" component={mobile ? Mobile : dash} />
                  <Route exact path="/gists" component={mobile ? Mobile : PublicGists} />
                  <Route exact path="/login" component={mobile ? Mobile : Login} />
                  <Route exact path="/search" component={mobile ? Mobile : Search} />
                  <Route exact path="/signup" component={mobile ? Mobile : Signup} />
                  <Route exact path="/otp" component={mobile ? Mobile : OTP} />
                  <Route exact path="/onboard" component={mobile ? Mobile : Setup_01} />

                  <Route exact path="/new/gist" component={mobile ? Mobile : CreateGist} />
                  <Route exact path="/Setup_03" component={mobile ? Mobile : Setup_03} />
                  <Route exact path="/Setup_04" component={mobile ? Mobile : Setup_04} />
                  <Route exact path="/Setup_05" component={mobile ? Mobile : Setup_05} />
                  <Route exact path="/Setup_06" component={mobile ? Mobile : Setup_06} />
                  <Route exact path="/chat" component={mobile ? Mobile : ChatWaitingRoom} />
                  <Route exact path="/Forgot_01" component={mobile ? Mobile : Forgot_01} />
                  <Route exact path="/Forgot_02" component={mobile ? Mobile : Forgot_02} />
                  <Route exact path="/Forgot_03" component={mobile ? Mobile : Forgot_03} />
                  <Route exact path="/Forgot_04" component={mobile ? Mobile : Forgot_04} />
                  <Route exact path="/languages" component={mobile ? Mobile : Languages} />
                  <Route exact path="/languages/:language" component={mobile ? Mobile : Languages} />
                  {/* <Route path="/public/editor/:lang/:id" component={NoEditEditor} /> */}
                  <Route exact path="/public/editor/:id" component={mobile ? Mobile : PublicEditor} />
                  <Route exact path="/edit/:id" component={mobile ? Mobile : TextEditor} />
                  <Route exact path="/comments/editor/:id" component={mobile ? Mobile : CommentPage} />
                  <Route exact path="/settings" component={mobile ? Mobile : Settings} />
                  <Route exact path="/editor/collab/:id" component={mobile ? Mobile : CollabEditor} />
                  <Route exact path="/@/:name" component={mobile ? Mobile : UserProfile} />
                  <Route exact path="/@/:name/chat" component={mobile ? Mobile : Chat} />
                  <Route exact path="/mobile" component={Mobile} />
                  <Route exact component={mobile ? Mobile : NotFound} />

                </Switch>
              </Router>

            </UserContextProvider>
          </ImageContextProvider>

        </SnackbarProvider>
      </themeContext.Provider>


    </>
  )
}
App.propTypes = {
  isMobile: PropTypes.func
}

export default withGetScreen(App)
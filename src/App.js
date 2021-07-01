
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Landing from "./pages/landing"
import UserContextProvider from "./contexts/userContext"
import dash from "./pages/dash"
import Register from "./pages/register"
import PublicGists from "./pages/public_gists"
import TextEditor from "./monacoEditor"
import PublicEditor from "./publicEditor"
import CollabEditor from "./collabEditor"
import NotFound from "./pages/404"
import Home from "./pages/home"
import Settings from "./pages/settings"
import { useEffect, createContext, useState } from "react"
import Login from "./pages/login"
import Signup from "./pages/signup"
import { withGetScreen } from 'react-getscreen'
import Mobile from "./pages/mobile"



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
        setTheTheme("dark");
        document.body.classList.replace("light", "dark");
        localStorage.setItem("theme_app", "dark");
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
  return (
    <themeContext.Provider value={{ setTheTheme, theme }}  >
      <UserContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={mobile ? Mobile : Landing} />
            <Route exact path="/home" component={mobile ? Mobile : Home} />
            <Route exact path="/register" component={mobile ? Mobile : Register} />
            {/* <Route path="/editor/:lang/:id" component={Editor} /> */}
            <Route exact path="/dash" component={mobile ? Mobile : dash} />
            <Route exact path="/gists" component={mobile ? Mobile : PublicGists} />
            <Route exact path="/login" component={mobile ? Mobile : Login} />
            <Route exact path="/signup" component={mobile ? Mobile : Signup} />

            {/* <Route path="/public/editor/:lang/:id" component={NoEditEditor} /> */}
            <Route exact path="/public/editor/:id" component={mobile ? Mobile : PublicEditor} />
            <Route exact path="/edit/:id" component={mobile ? Mobile : TextEditor} />
            <Route exact path="/settings" component={mobile ? Mobile : Settings} />
            <Route exact path="/editor/collab/:id" component={mobile ? Mobile : CollabEditor} />
            <Route exact component={mobile ? Mobile : NotFound} />

          </Switch>
        </Router>

      </UserContextProvider>
    </themeContext.Provider>


  )
}

export default withGetScreen(App)

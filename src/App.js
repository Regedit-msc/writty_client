
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
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

  const [theme, setTheme] = useState('');

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
    console.log(props.isMobile());
  }, [])


  return (
    <themeContext.Provider value={{ setTheTheme, theme }}  >
      <UserContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={props.isMobile() === false ? Landing : Mobile} />
            <Route exact path="/home" component={props.isMobile() === false ? Home : Mobile} />
            <Route exact path="/register" component={props.isMobile() === false ? Register : Mobile} />
            {/* <Route path="/editor/:lang/:id" component={Editor} /> */}
            <Route exact path="/dash" component={props.isMobile() === false ? dash : Mobile} />
            <Route exact path="/gists" component={props.isMobile() === false ? PublicGists : Mobile} />
            <Route exact path="/login" component={props.isMobile() === false ? Login : Mobile} />
            <Route exact path="/signup" component={props.isMobile() === false ? Signup : Mobile} />

            {/* <Route path="/public/editor/:lang/:id" component={NoEditEditor} /> */}
            <Route exact path="/public/editor/:id" component={props.isMobile() === false ? PublicEditor : Mobile} />
            <Route exact path="/edit/:id" component={props.isMobile() === false ? TextEditor : Mobile} />
            <Route exact path="/settings" component={props.isMobile() === false ? Settings : Mobile} />
            <Route exact path="/editor/collab/:id" component={props.isMobile() === false ? CollabEditor : Mobile} />
            <Route exact component={props.isMobile() === false ? NotFound : Mobile} />

          </Switch>
        </Router>

      </UserContextProvider>
    </themeContext.Provider>


  )
}

export default withGetScreen(App)

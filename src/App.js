
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import login from "./pages/landing"
import UserContextProvider from "./contexts/userContext"
import dash from "./pages/dash"
import Register from "./pages/register"
import Editor from "./code_mirror"
import PublicGists from "./pages/public_gists"
import NoEditEditor from "./no_edit_editor"
import TextEditor from "./monacoEditor"
import PublicEditor from "./publicEditor"
import CollabEditor from "./collabEditor"
import Home from "./pages/home"
import Settings from "./pages/settings"
import { useEffect, createContext, useState } from "react"
import NotFound from "./pages/404"
import Login from "./pages/login"
import Landing from "./pages/landing"
import Signup from "./pages/signup"



export const themeContext = createContext();
function App() {

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



  return (
    <themeContext.Provider value={{ setTheTheme, theme }}  >
      <UserContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" exact component={Landing} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/register" exact component={Register} />
            {/* <Route path="/editor/:lang/:id" component={Editor} /> */}
            <Route exact path="/dash" component={dash} />
            <Route exact path="/gists" component={PublicGists} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {/* <Route component={NotFound} /> */}
            {/* <Route path="/public/editor/:lang/:id" component={NoEditEditor} /> */}
            <Route exact path="/public/editor/:id" component={PublicEditor} />
            <Route exact path="/edit/:id" component={TextEditor} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/editor/collab/:id" component={CollabEditor} />
          </Switch>
        </Router>
      </UserContextProvider>
    </themeContext.Provider>


  )
}

export default App

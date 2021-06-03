
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import login from "./pages/login"
import UserContextProvider from "./contexts/userContext"
import dash from "./pages/dash"
import Register from "./pages/register"
import Editor from "./code_mirror"
import PublicGists from "./pages/public_gists"
import NoEditEditor from "./no_edit_editor"

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={login} />
          <Route path="/register" exact component={Register} />
          <Route path="/editor/:lang/:id" component={Editor} />
          <Route path="/dash" component={dash} />
          <Route path="/gists" component={PublicGists} />
          <Route path="/public/editor/:lang/:id" component={NoEditEditor} />
        </Switch>
      </Router>
    </UserContextProvider>

  )
}

export default App

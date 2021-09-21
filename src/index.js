import React from "react"
import ReactDOM from "react-dom"
import App from "./App";
import "./css/main.css";
import { subscribeUser } from "./doSub";
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById("root")
)
serviceWorker.register();
subscribeUser();
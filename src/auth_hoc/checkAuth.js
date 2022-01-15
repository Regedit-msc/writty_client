/* eslint-disable no-undef */
import React from 'react'
import { Navigate } from "react-router-dom";

function makePriv(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return class extends React.Component {
    constructor() {
      super();
      this.state = { isAuth: false };
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
      const token = localStorage.getItem("user_token");
      console.log("The token is " + token);
      if (token) {
        this.setState({ isAuth: true });
      }
    }
    render() {
      return !this.state.isAuth ? (
        <Navigate to="/" replace />
      ) : (
        <WrappedComponent />
      );
    }
  };
}


export { makePriv }
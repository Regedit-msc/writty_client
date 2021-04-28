import React from 'react'
import { Redirect } from 'react-router-dom'


function makePriv(WrappedComponent) {
    return class extends React.Component {
        state = { isAuth: false }
        componentWillMount() {
            const token = localStorage.getItem("user_token");
            console.log('The token is ' + token);
            if (token) {
                this.setState({ isAuth: true })
            }
        }
        render() {
            return !this.state.isAuth ? <Redirect to="/" /> : <WrappedComponent />
        }
    };
}


export { makePriv }
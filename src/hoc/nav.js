import { Component } from "react";
import NavBar from "../components/navbar"
import React from "react";
const withNav = (WrapedComp) => {
    return class MyComp extends Component {

        render() {
            return <>
                <NavBar />
                <WrapedComp />
            </>
        }
    };
}


export { withNav };
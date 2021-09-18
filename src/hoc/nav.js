import { Component } from "react";
import NavBar from "../components/navbar"

const withNav = (WrapedComp) => {
    return class extends Component {

        render() {
            return <>
                <NavBar />
                <WrapedComp />
            </>
        }
    };
}


export { withNav };
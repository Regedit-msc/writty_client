
import FeedComponent from "../components/feed/index";
import { useScroll } from "../utils/scroll";
import React from "react";
const Feed = () => {
    useScroll();
    return (
        <>

            <FeedComponent />

        </>
    )
}
export default Feed;
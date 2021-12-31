/* eslint-disable */
import FeedComponent from "../components/feed/index";
import { useScroll } from "../utils/scroll";
import React from "react";
import withPageTransition from "../components/page_transition/page_transition";
import FeedMenuContextProvider from "../contexts/feedMenusContext";
const Feed = () => {
  useScroll();
  return (
    <>
      <FeedMenuContextProvider>
        <FeedComponent />
      </FeedMenuContextProvider>
    </>
  );
};
export default Feed;

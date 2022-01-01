/* eslint-disable */
import FeedComponent from "../components/feed/index";
import { useScroll } from "../utils/scroll";
import React from "react";
import withPageTransition from "../components/page_transition/page_transition";
import FeedMenuContextProvider from "../contexts/feedMenusContext";
import { makePriv } from "../auth_hoc/checkAuth";
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
export default makePriv(Feed);

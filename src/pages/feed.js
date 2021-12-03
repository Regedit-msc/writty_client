/* eslint-disable */
import FeedComponent from "../components/feed/index";
import { useScroll } from "../utils/scroll";
import React from "react";
import withPageTransition from "../components/page_transition/page_transition";
const Feed = () => {
  useScroll();
  return (
    <>
      <FeedComponent />
    </>
  );
};
export default withPageTransition(Feed);
